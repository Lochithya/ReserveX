package com.reservex.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

    @NotBlank
    private String username; // email for vendors

    @NotBlank
    private String password;
}
