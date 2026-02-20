package com.reservex.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
    name = "reservation_genres",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"reservation_id", "genre_name"})
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationGenre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    // Many genres can belong to one reservation
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservation_id", nullable = false)
    private Reservation reservation;
 
    @Column(name = "genre_name", nullable = false)
    private String genreName;

    public ReservationGenre(Reservation reservation, String genreName) {
        this.reservation = reservation;
        this.genreName = genreName;
    }
}
