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
    private boolean reserved;
    private Double price;

    public static StallDto fromEntity(Stall stall, boolean reserved) {
        return StallDto.builder()
                .id(stall.getId())
                .name(stall.getName())
                .size(stall.getSize().name())
                .gridCol(stall.getGridCol())
                .gridRow(stall.getGridRow())
                .reserved(reserved)
                .price(stall.getPrice())
                .build();
    }
}
