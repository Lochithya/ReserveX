package com.reservex.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReservationStallDto {

    private Integer id;
    private String name;
    private String size;
}

