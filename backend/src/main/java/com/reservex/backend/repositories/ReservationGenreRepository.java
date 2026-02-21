package com.reservex.backend.repositories;

import com.reservex.backend.entity.Reservation;
import com.reservex.backend.entity.ReservationGenre;
import com.reservex.backend.entity.ReservationGenreId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservationGenreRepository extends JpaRepository<ReservationGenre, ReservationGenreId> {

    List<ReservationGenre> findByReservation(Reservation reservation);

    void deleteByReservation(Reservation reservation);

//    @Modifying
//    @Query("DELETE FROM ReservationGenre rg WHERE rg.reservation.id = :reservationId")
//    void deleteAllByReservationId(@Param("reservationId") Integer reservationId);

    // The underscore tells Spring to look for the "id" inside the "reservation" object
    void deleteAllByReservation_Id(Integer reservationId);

}
