package com.reservex.backend.services;

import com.reservex.backend.entity.Reservation;
import com.reservex.backend.entity.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final QrCodeService qrCodeService;

    @Value("${spring.mail.username:}")
    private String fromEmail;

    @Async
    public void sendReservationConfirmation(User user, Reservation reservation) {
        if (fromEmail == null || fromEmail.isBlank()) {
            System.out.println(">>> fromEmail value: [" + fromEmail + "]");
            return; // skip if mail not configured
        }

        try {
            byte[] qrBytes = qrCodeService.generateQrCodeForReservation(reservation.getQrCodePath());
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromEmail);
            helper.setTo(user.getEmail());
            helper.setSubject("Colombo International Book Fair - Stall Reservation Confirmed");
            String body = buildConfirmationBody(user, reservation);
            helper.setText(body, true);
            helper.addAttachment("reservation-qr.png", new org.springframework.core.io.ByteArrayResource(qrBytes));
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send confirmation email", e);
        }
    }

    public void sendStallDeletionNotification(User user, String stallName, int currentBookings, boolean reservationCancelled) {
        if (fromEmail == null || fromEmail.isBlank()) return;

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromEmail);
            helper.setTo(user.getEmail());
            helper.setSubject("Colombo International Book Fair - Stall Deleted from Your Reservation");
            String body = buildStallDeletionBody(user, stallName, currentBookings, reservationCancelled);
            helper.setText(body, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send stall deletion email", e);
        }
    }

    private String buildStallDeletionBody(User user, String stallName, int currentBookings, boolean reservationCancelled) {
        String reason = "The stall \"" + stallName + "\" has been removed from the exhibition by the administrator.";
        String statusMsg;
        if (reservationCancelled) {
            statusMsg = "Your reservation has been called off because this was the only stall in your reservation.";
        } else {
            statusMsg = "Your current number of reserved stalls is now " + currentBookings + ".";
        }
        return """
            <h2>Stall Deletion Notice</h2>
            <p>Dear %s,</p>
            <p>%s</p>
            <p><strong>Reason:</strong> %s</p>
            <p>%s</p>
            <p>Please log in to the Publisher Portal to view your updated reservations.</p>
            <p>— Sri Lanka Book Publishers' Association</p>
            """.formatted(
                user.getBusinessName() != null ? user.getBusinessName() : "Vendor",
                "We regret to inform you that a stall from your reservation has been deleted.",
                reason,
                statusMsg
        );
    }

    private String buildConfirmationBody(User user, Reservation reservation) {
        // Build stall list
        StringBuilder stallList = new StringBuilder();
        reservation.getStalls().forEach(s -> 
            stallList.append("<li>").append(s.getName()).append(" (").append(s.getSize()).append(")</li>")
        );
        
        return """
            <h2>Stall Reservation Confirmed</h2>
            <p>Dear %s,</p>
            <p>Your stall reservation for the Colombo International Book Fair has been confirmed.</p>
            <p><strong>Business:</strong> %s</p>
            <p><strong>Stalls Reserved:</strong></p>
            <ul>%s</ul>
            <p><strong>Reservation ID:</strong> %s</p>
            <p>Please find your unique QR code attached. This QR code acts as your pass to enter the exhibition premises. Keep it safe and present it at the venue.</p>
            <p>Thank you for participating in the Colombo International Book Fair.</p>
            <p>— Sri Lanka Book Publishers' Association</p>
            """.formatted(
                user.getBusinessName() != null ? user.getBusinessName() : "Vendor",
                user.getBusinessName(),
                stallList.toString(),
                reservation.getQrCodePath()
        );
    }
}
