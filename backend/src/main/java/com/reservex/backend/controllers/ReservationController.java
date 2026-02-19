// Reserve stall(s) endpoint
// “My reservations” endpoint


package com.reservex.backend.controllers;

import com.reservex.backend.config.UserPrincipal;
import com.reservex.backend.dto.ReservationDto;
import com.reservex.backend.services.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<?> createReservation(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestBody Map<String, Object> body) {
        try {
            if (body.get("stallIds") != null) {
                @SuppressWarnings("unchecked")
                List<Integer> list = (List<Integer>) body.get("stallIds");
                List<Long> stallIds = list.stream().map(Long::valueOf).toList();
                List<ReservationDto> dtos = reservationService.createReservations(principal.getId(), stallIds);
                return ResponseEntity.status(HttpStatus.CREATED).body(dtos);
            }
            Object stallIdObj = body.get("stallId");
            if (stallIdObj == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "stallId or stallIds is required"));
            }
            Long stallId = stallIdObj instanceof Number n ? n.longValue() : Long.parseLong(stallIdObj.toString());
            ReservationDto dto = reservationService.createReservation(principal.getId(), stallId);
            return ResponseEntity.status(HttpStatus.CREATED).body(dto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/my")
    public ResponseEntity<List<ReservationDto>> getMyReservations(@AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(reservationService.getMyReservations(principal.getId()));
    }
}
