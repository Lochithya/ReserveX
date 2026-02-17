package com.reservex.backend.controllers;

import com.reservex.backend.dto.StallDto;
import com.reservex.backend.services.StallService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stalls")
@RequiredArgsConstructor
public class StallController {

    private final StallService stallService;

    @GetMapping
    public ResponseEntity<List<StallDto>> getAllStalls() {
        return ResponseEntity.ok(stallService.getAllStallsWithAvailability());
    }
}
