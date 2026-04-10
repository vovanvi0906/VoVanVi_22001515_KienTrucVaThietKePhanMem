package com.cinema.booking_service.producer;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import com.cinema.booking_service.event.BookingCreatedEvent;
import com.cinema.booking_service.exception.BookingEventPublishException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class BookingEventProducer {

    private final KafkaTemplate<String, BookingCreatedEvent> kafkaTemplate;

    @Value("${app.kafka.topic.booking-events}")
    private String bookingEventsTopic;

    public void publishBookingCreated(BookingCreatedEvent event) {
        try {
            kafkaTemplate.send(bookingEventsTopic, String.valueOf(event.getBookingId()), event)
                    .get(10, TimeUnit.SECONDS);
            log.info("Published BOOKING_CREATED event for bookingId={} to topic={}",
                    event.getBookingId(),
                    bookingEventsTopic);
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            throw new BookingEventPublishException("Publishing BOOKING_CREATED event was interrupted", exception);
        } catch (ExecutionException | TimeoutException exception) {
            log.error("Failed to publish BOOKING_CREATED event for bookingId={}", event.getBookingId(), exception);
            throw new BookingEventPublishException("Failed to publish BOOKING_CREATED event to Kafka", exception);
        }
    }
}
