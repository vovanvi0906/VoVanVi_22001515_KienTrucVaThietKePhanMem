package com.travel.booking_service.service;

import com.travel.booking_service.dto.CreateBookingRequest;
import com.travel.booking_service.entity.Booking;
import com.travel.booking_service.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;

    public Booking createBooking(CreateBookingRequest request) {
        Booking booking = Booking.builder()
                .userId(request.getUserId())
                .tourId(request.getTourId())
                .quantity(request.getQuantity())
                .totalPrice(request.getTotalPrice())
                .status("PENDING")
                .createdAt(LocalDateTime.now())
                .build();

        return bookingRepository.save(booking);
    }
}
