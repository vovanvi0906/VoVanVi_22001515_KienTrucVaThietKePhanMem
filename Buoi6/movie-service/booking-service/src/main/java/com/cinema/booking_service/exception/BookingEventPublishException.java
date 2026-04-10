package com.cinema.booking_service.exception;

public class BookingEventPublishException extends RuntimeException {

    public BookingEventPublishException(String message, Throwable cause) {
        super(message, cause);
    }
}
