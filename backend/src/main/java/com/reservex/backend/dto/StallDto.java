package com.reservex.backend.dto;

import com.reservex.backend.entity.Stall;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StallDto {

    private Integer id;
    private String name;
    private String size;
    private int gridCol;
    private int gridRow;
    private boolean isConfirmed;
    private Double price;

    public static StallDto fromEntity(Stall stall) {
        return StallDto.builder()
                .id(stall.getId())
                .name(stall.getName())
                .size(stall.getSize().name())
                .gridCol(stall.getGridCol())
                .gridRow(stall.getGridRow())
                .isConfirmed(Boolean.TRUE.equals(stall.getIsConfirmed()))
                .price(stall.getPrice())
                .build();
    }
}
