package com.reservex.backend.services;

import com.reservex.backend.dto.ReservationDto;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private static final int MAX_STALLS_PER_USER = 3;

    private final ReservationRepository reservationRepository;
    private final StallRepository stallRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    /**
     * Convenience method for reserving a single stall.
     */
    @Transactional
    public ReservationDto createReservation(Long userId, Long stallId) {
        List<ReservationDto> reservations = createReservations(userId, List.of(stallId));
        return reservations.isEmpty() ? null : reservations.get(0);
    }

    /**
     * Create one reservation that may contain multiple stalls, using the
     * {@code reservation_stalls} join table. Enforces the business rule of
     * at most three stalls per business via the {@code noOfCurrentBookings}
     * field on {@link User}.
     */
    @Transactional
    public List<ReservationDto> createReservations(Long userId, List<Long> stallIds) {
        if (stallIds == null || stallIds.isEmpty()) {
            throw new IllegalArgumentException("At least one stall is required");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Filter and load stalls that are not already reserved
        var stallsToBook = new HashSet<Stall>();
        for (Long stallId : stallIds) {
            if (stallId == null) continue;
            if (reservationRepository.existsByStalls_Id(stallId)) {
                continue; // already reserved, skip
            }
            stallRepository.findById(stallId).ifPresent(stallsToBook::add);
        }

        if (stallsToBook.isEmpty()) {
            throw new IllegalArgumentException("All selected stalls are already reserved or invalid");
        }

        int currentBookings = user.getNoOfCurrentBookings();
        int newBookings = stallsToBook.size();
        if (currentBookings + newBookings > MAX_STALLS_PER_USER) {
            throw new IllegalArgumentException("Maximum 3 stalls per business allowed. " +
                    "You already have " + currentBookings + " booked.");
        }

        Reservation reservation = Reservation.builder()
                .user(user)
                .build();
        reservation.getStalls().addAll(stallsToBook);

        reservation = reservationRepository.save(reservation);

        // Update cached count on user
        user.setNoOfCurrentBookings(currentBookings + newBookings);
        userRepository.save(user);

        emailService.sendReservationConfirmation(user, reservation);

        List<ReservationDto> result = new ArrayList<>();
        result.add(ReservationDto.fromEntity(reservation));
        return result;
    }

    @Transactional(readOnly = true)
    public List<ReservationDto> getMyReservations(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return reservationRepository.findByUserOrderByCreatedAtDesc(user).stream()
                .map(ReservationDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ReservationDto> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(ReservationDto::fromEntity)
                .collect(Collectors.toList());
    }
}
