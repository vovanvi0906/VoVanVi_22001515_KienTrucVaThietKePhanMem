package com.travel.booking_service.controller;

import com.travel.booking_service.dto.CreateBookingRequest;
import com.travel.booking_service.entity.Booking;
import com.travel.booking_service.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @GetMapping("/test")
    public String test() {
        return "Booking Service is running";
    }

    @PostMapping
    public Booking createBooking(@Valid @RequestBody CreateBookingRequest request) {
        return bookingService.createBooking(request);
    }
}
