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

    private final StallRepository stallRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (stallRepository.count() == 0) {
            seedStalls();
        }
        if (!userRepository.existsByEmail("admin@bookfair.lk")) {
            seedAdminUser();
        }
    }

    private void seedStalls() {
        List<Stall> stalls = List.of(
                stall("A", Stall.StallSize.SMALL, "3m x 2m"),
                stall("B", Stall.StallSize.SMALL, "3m x 2m"),
                stall("C", Stall.StallSize.MEDIUM, "4m x 3m"),
                stall("D", Stall.StallSize.MEDIUM, "4m x 3m"),
                stall("E", Stall.StallSize.LARGE, "5m x 4m"),
                stall("F", Stall.StallSize.LARGE, "5m x 4m"),
                stall("G", Stall.StallSize.SMALL, "3m x 2m"),
                stall("H", Stall.StallSize.MEDIUM, "4m x 3m"),
                stall("I", Stall.StallSize.LARGE, "5m x 4m")
        );
        stallRepository.saveAll(stalls);
    }

    private Stall stall(String name, Stall.StallSize size, String dimensions) {
        return Stall.builder().name(name).size(size).dimensions(dimensions).build();
    }

    private void seedAdminUser() {
        userRepository.save(User.builder()
                .email("admin@bookfair.lk")
                .password(passwordEncoder.encode("admin123"))
                .businessName("Book Fair Organizer")
                .contactPerson("Admin")
                .role(User.Role.EMPLOYEE)
                .build());
    }
}
