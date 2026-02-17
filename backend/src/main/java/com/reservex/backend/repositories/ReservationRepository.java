package com.reservex.backend.repositories;

import com.reservex.backend.entity.Reservation;
import com.reservex.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUserOrderByCreatedAtDesc(User user);

    int countByUser(User user);

    Optional<Reservation> findTopByUserOrderByCreatedAtDesc(User user);

    Optional<Reservation> findByQrCodeToken(String qrCodeToken);

    /**
     * Used to check whether a given stall is already attached to any reservation.
     */
    boolean existsByStalls_Id(Long stallId);
}
