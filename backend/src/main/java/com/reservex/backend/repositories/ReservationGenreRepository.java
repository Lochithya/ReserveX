package com.reservex.backend.repositories;

import com.reservex.backend.entity.Reservation;
import com.reservex.backend.entity.ReservationGenre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationGenreRepository extends JpaRepository<ReservationGenre, Long> {

    List<ReservationGenre> findByReservation(Reservation reservation);

    void deleteByReservation(Reservation reservation);
}
