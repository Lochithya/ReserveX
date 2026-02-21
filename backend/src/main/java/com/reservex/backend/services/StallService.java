// get stalls for UI
// admin add/remove stalls

package com.reservex.backend.services;

import com.reservex.backend.dto.CreateStallRequest;
import com.reservex.backend.dto.StallDto;
import com.reservex.backend.dto.UpdateStallRequest;
import com.reservex.backend.entity.Reservation;
import com.reservex.backend.entity.Stall;
import com.reservex.backend.entity.User;
import com.reservex.backend.repositories.ReservationRepository;
import com.reservex.backend.repositories.StallRepository;
import com.reservex.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class StallService {

    private final StallRepository stallRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Transactional(readOnly = true)
    public List<StallDto> getAllStallsWithAvailability() {
        return stallRepository.findAllByOrderByNameAsc()
                .stream()
                .map(StallDto::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public boolean isNameTaken(String name) {
        return stallRepository.existsByNameIgnoreCase(name != null ? name.trim() : "");
    }

    @Transactional(readOnly = true)
    public boolean isNameTakenExcluding(String name, Integer excludeId) {
        if (name == null || name.isBlank()) return false;
        return stallRepository.existsByNameIgnoreCaseAndIdNot(name.trim(), excludeId);
    }

    @Transactional
    public StallDto createStall(CreateStallRequest request) {
        String name = request.getName().trim();
        if (stallRepository.existsByNameIgnoreCase(name)) {
            throw new IllegalArgumentException("Stall name already exists: " + name);
        }
        Stall stall = Stall.builder()
                .name(name)
                .size(request.getSize())
                .price(request.getPrice() != null ? request.getPrice() : 0.0)
                .gridCol(request.getGridCol())
                .gridRow(request.getGridRow())
                .isConfirmed(false)
                .build();
        stall = stallRepository.save(stall);
        return StallDto.fromEntity(stall);
    }

    @Transactional
    public StallDto updateStall(Integer id, UpdateStallRequest request) {
        Stall stall = stallRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Stall not found: " + id));
        String name = request.getName().trim();
        if (stallRepository.existsByNameIgnoreCaseAndIdNot(name, id)) {
            throw new IllegalArgumentException("Stall name already exists: " + name);
        }
        stall.setName(name);
        stall.setSize(request.getSize());
        stall.setPrice(request.getPrice() != null ? request.getPrice() : 0.0);
        stall.setGridCol(request.getGridCol());
        stall.setGridRow(request.getGridRow());
        stall = stallRepository.save(stall);
        return StallDto.fromEntity(stall);
    }

    @Transactional
    public void deleteStall(Integer stallId) {
        Stall stall = stallRepository.findById(stallId)
                .orElseThrow(() -> new IllegalArgumentException("Stall not found: " + stallId));
        String stallName = stall.getName();

        List<Reservation> reservationsWithStall = reservationRepository.findByStalls_Id(stallId);
        Set<User> affectedUsers = new HashSet<>();

        for (Reservation res : reservationsWithStall) {
            User user = res.getUser();
            affectedUsers.add(user);

            int stallCount = res.getStalls().size();
            boolean wasOnlyStall = stallCount == 1;

            res.getStalls().remove(stall);
            user.setNoOfCurrentBookings(Math.max(0, user.getNoOfCurrentBookings() - 1));
            userRepository.save(user);

            if (wasOnlyStall) {
                reservationRepository.delete(res);
            } else {
                reservationRepository.save(res);
            }
        }

        stallRepository.delete(stall);

        for (User user : affectedUsers) {
            int currentBookings = user.getNoOfCurrentBookings();
            boolean reservationCancelled = currentBookings == 0;
            emailService.sendStallDeletionNotification(user, stallName, currentBookings, reservationCancelled);
        }
    }
}
