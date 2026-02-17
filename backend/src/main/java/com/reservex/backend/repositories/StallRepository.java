package com.reservex.backend.repositories;

import com.reservex.backend.entity.Stall;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StallRepository extends JpaRepository<Stall, Long> {

    List<Stall> findAllByOrderByNameAsc();
}
