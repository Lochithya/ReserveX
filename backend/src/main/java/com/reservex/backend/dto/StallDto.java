package com.reservex.backend.dto;

import com.reservex.backend.entity.Stall;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StallDto {

    private Long id;
    private String name;
    private String size;
    private String dimensions;
    private boolean reserved;

    public static StallDto fromEntity(Stall stall, boolean reserved) {
        return StallDto.builder()
                .id(stall.getId())
                .name(stall.getName())
                .size(stall.getSize().name())
                .dimensions(stall.getDimensions())
                .reserved(reserved)
                .build();
    }
}
