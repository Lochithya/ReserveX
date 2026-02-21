package com.reservex.backend.dto;

import com.reservex.backend.entity.Stall;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class UpdateStallRequest {

    @NotBlank(message = "Stall name is required")
    private String name;

    @NotNull(message = "Size is required")
    private Stall.StallSize size;

    @NotNull(message = "Price is required")
    @PositiveOrZero(message = "Price must be zero or positive")
    private Double price;

    private int gridCol = 0;
    private int gridRow = 0;
}
