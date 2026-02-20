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

        if (!userRepository.existsByEmail("user@bookfair.lk")) {
            seedVendorUser();
        }
    }

    private void seedStalls() {
        List<Stall> stalls = List.of(
                stall("A1", Stall.StallSize.SMALL,  1, 1, 5000.0,true ),
                stall("B1", Stall.StallSize.SMALL,  2, 1, 5000.0 ,false),
                stall("C1", Stall.StallSize.MEDIUM, 3, 1, 10000.0 ,false),
                stall("D1", Stall.StallSize.MEDIUM, 4, 1, 10000.0 ,true),
                stall("E1", Stall.StallSize.LARGE,  1, 2, 15000.0 ,true),
                stall("F1", Stall.StallSize.LARGE,  2, 2, 15000.0 ,true),
                stall("G1", Stall.StallSize.SMALL,  3, 2, 5000.0 ,true),
                stall("H2", Stall.StallSize.MEDIUM, 4, 2, 10000.0 ,true),
                stall("I3", Stall.StallSize.LARGE,  1, 3, 15000.0 ,true)
        );
        stallRepository.saveAll(stalls);
    }

    private Stall stall(String name, Stall.StallSize size, int gridCol, int gridRow , Double price,Boolean isConfirmed) {
        return Stall.builder().name(name).size(size).gridCol(gridCol).gridRow(gridRow).price(price).isConfirmed(isConfirmed).build();
    }

    private void seedAdminUser() {
        userRepository.save(User.builder()
                .email("admin@bookfair.lk")
                .password(passwordEncoder.encode("admin123"))
                .businessName("Book Fair Organizer")
                .role(User.Role.EMPLOYEE)
                .build());

    }

    private void seedVendorUser() {
        userRepository.save(User.builder()
                .email("user@bookfair.lk")
                .username("user@bookfair.lk") // Added username
                .password(passwordEncoder.encode("user123"))
                .businessName("Sarasavi Publishers")
                .role(User.Role.VENDOR)
                .build());
        System.out.println("Vendor user seeded.");
    }
}
