// get stalls for UI
// admin add/remove stalls


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
    return stallRepository.findAllByOrderByNameAsc()
            .stream()
            .map(stall -> StallDto.fromEntity(stall))
            .toList();
}
}
