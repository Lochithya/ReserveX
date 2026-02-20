package com.reservex.backend.services;

import com.reservex.backend.entity.Reservation;
import com.reservex.backend.entity.ReservationGenre;
import com.reservex.backend.entity.User;
import com.reservex.backend.repositories.ReservationGenreRepository;
import com.reservex.backend.repositories.ReservationRepository;
import com.reservex.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationGenreService {

    private final ReservationGenreRepository genreRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    /**
     * All genre operations are associated with the latest reservation of the user.
     * This matches the {@code reservation_id} foreign key in the reservation_genres table.
     */
    private Reservation getLatestReservationForUser(User user) {
        return reservationRepository.findTopByUserOrderByReservationDateDesc(user)
                .orElseThrow(() -> new IllegalStateException("No reservations found for user"));
    }

    @Transactional
    public ReservationGenre addGenre(Integer userId, String genreName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Reservation reservation = getLatestReservationForUser(user);
        ReservationGenre genre = new ReservationGenre(reservation, genreName.trim());
        return genreRepository.save(genre);
    }

    @Transactional(readOnly = true)
    public List<String> getGenresByUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Reservation reservation = getLatestReservationForUser(user);
        return genreRepository.findByReservation(reservation).stream()
                .map(ReservationGenre::getGenreName)
                .collect(Collectors.toList());
    }

    @Transactional
    public void setGenres(Integer userId, List<String> genreNames) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Reservation reservation = getLatestReservationForUser(user);

        // Use native SQL delete to bypass Hibernate cache
        genreRepository.deleteAllByReservationId(reservation.getId());
        genreRepository.flush();

        if (genreNames != null) {
            for (String name : genreNames) {
                if (name != null && !name.isBlank()) {
                    ReservationGenre genre = new ReservationGenre(reservation, name.trim());
                    genreRepository.saveAndFlush(genre);
                }
            }
        }
    }

    @Transactional
    public void setGenresByReservationId(Integer reservationId, Integer userId, List<String> genreNames) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found"));
        if (!reservation.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Not your reservation");
        }

        // Delete existing genres first and flush immediately
        genreRepository.deleteAllByReservationId(reservationId);
        genreRepository.flush(); // ← forces delete to complete before insert


        // Clear reservation's genre collection from cache
        reservation.getGenres().clear();
        reservationRepository.saveAndFlush(reservation);

        // Now insert new genres
        if (genreNames != null) {
            for (String name : genreNames) {
                if (name != null && !name.isBlank()) {
                    ReservationGenre genre = new ReservationGenre(reservation, name.trim());
                    genreRepository.saveAndFlush(genre); // saveAndFlush instead of save
                }
            }
        }
    }
}
