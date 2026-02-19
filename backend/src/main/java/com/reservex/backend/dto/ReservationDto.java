package com.reservex.backend.dto;

import com.reservex.backend.entity.Reservation;
import com.reservex.backend.entity.Stall;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class ReservationDto {

    private Long id;
    private String qrCodeToken;
    private Instant reservationDate;
    private String status;
    private List<ReservationStallDto> stalls;

    public static ReservationDto fromEntity(Reservation r) {
        List<ReservationStallDto> stallDtos = r.getStalls().stream()
                .map(ReservationDto::toStallDto)
                .collect(Collectors.toList());

        return ReservationDto.builder()
                .id(r.getId())
                .qrCodeToken(r.getQrCodeToken())
                .reservationDate(r.getReservationDate())
                .status(r.getStatus().name())
                .stalls(stallDtos)
                .build();
    }

    private static ReservationStallDto toStallDto(Stall s) {
        return ReservationStallDto.builder()
                .id(s.getId())
                .name(s.getName())
                .size(s.getSize().name())
                .build();
    }
}
