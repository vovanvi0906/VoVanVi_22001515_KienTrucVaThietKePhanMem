package com.cinema.booking_service.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cinema.booking_service.dto.BookingResponse;
import com.cinema.booking_service.dto.CreateBookingRequest;
import com.cinema.booking_service.entity.Booking;
import com.cinema.booking_service.entity.BookingStatus;
import com.cinema.booking_service.event.BookingCreatedEvent;
import com.cinema.booking_service.producer.BookingEventProducer;
import com.cinema.booking_service.repository.BookingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final BookingEventProducer bookingEventProducer;

    @Transactional
    public BookingResponse createBooking(CreateBookingRequest request) {
        LocalDateTime createdAt = LocalDateTime.now();

        Booking booking = Booking.builder()
                .userId(request.getUserId())
                .movieId(request.getMovieId())
                .showtime(request.getShowtime())
                .seatNumber(request.getSeatNumber())
                .quantity(request.getQuantity())
                .totalPrice(request.getTotalPrice())
                .status(BookingStatus.CREATED)
                .createdAt(createdAt)
                .build();

        Booking savedBooking = bookingRepository.save(booking);

        BookingCreatedEvent event = BookingCreatedEvent.builder()
                .eventType("BOOKING_CREATED")
                .bookingId(savedBooking.getId())
                .userId(savedBooking.getUserId())
                .movieId(savedBooking.getMovieId())
                .seatNumber(savedBooking.getSeatNumber())
                .quantity(savedBooking.getQuantity())
                .totalPrice(savedBooking.getTotalPrice())
                .createdAt(savedBooking.getCreatedAt())
                .build();

        bookingEventProducer.publishBookingCreated(event);
        return mapToResponse(savedBooking);
    }

    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private BookingResponse mapToResponse(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId())
                .userId(booking.getUserId())
                .movieId(booking.getMovieId())
                .showtime(booking.getShowtime())
                .seatNumber(booking.getSeatNumber())
                .quantity(booking.getQuantity())
                .totalPrice(booking.getTotalPrice())
                .status(booking.getStatus())
                .createdAt(booking.getCreatedAt())
                .build();
    }
}
