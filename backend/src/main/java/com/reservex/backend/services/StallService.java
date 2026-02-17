package com.reservex.backend.services;

import com.reservex.backend.dto.StallDto;
import com.reservex.backend.entity.Stall;
import com.reservex.backend.repositories.ReservationRepository;
import com.reservex.backend.repositories.StallRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StallService {

    private final StallRepository stallRepository;
    private final ReservationRepository reservationRepository;

    @Transactional(readOnly = true)
    public List<StallDto> getAllStallsWithAvailability() {
        List<Stall> stalls = stallRepository.findAllByOrderByNameAsc();
        return stalls.stream()
                .map(s -> StallDto.fromEntity(s, reservationRepository.existsByStalls_Id(s.getId())))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<Stall> findAllByOrderByName() {
        return stallRepository.findAllByOrderByNameAsc();
    }
}
