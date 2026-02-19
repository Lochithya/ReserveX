package com.reservex.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Email is required")
    @Email
    private String email;

    // Optional separate username; if not provided we fall back to the email.
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 6)
    private String password;

    @NotBlank(message = "Business name is required")
    private String businessName;


}
