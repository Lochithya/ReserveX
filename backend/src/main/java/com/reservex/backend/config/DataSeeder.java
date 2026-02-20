// Inserts sample data at startup (e.g., admin user / sample stalls) if you coded it that way


package com.reservex.backend.config;

import com.reservex.backend.entity.Stall;
import com.reservex.backend.entity.User;
import com.reservex.backend.repositories.StallRepository;
import com.reservex.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        // if admin already exists, don't insert again
        if (userRepository.existsByUsername("admin")) {
            return;
        }

        User admin = User.builder()
                .businessName("Book Fair Organizer")
                .email("admin@bookfair.lk")
                .username("admin") // login username
                .password(passwordEncoder.encode("admin123")) // BCrypt hash
                .noOfCurrentBookings(0)
                ..role(User.Role.EMPLOYEE)
                .build();

        userRepository.save(admin);
    }
}
