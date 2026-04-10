package com.cinema.booking_service.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateBookingRequest {

    @NotNull(message = "userId is required")
    @Positive(message = "userId must be greater than 0")
    private Long userId;

    @NotNull(message = "movieId is required")
    @Positive(message = "movieId must be greater than 0")
    private Long movieId;

    @NotNull(message = "showtime is required")
    private LocalDateTime showtime;

    @NotBlank(message = "seatNumber is required")
    private String seatNumber;

    @NotNull(message = "quantity is required")
    @Positive(message = "quantity must be greater than 0")
    private Integer quantity;

    @NotNull(message = "totalPrice is required")
    @DecimalMin(value = "0.01", message = "totalPrice must be greater than 0")
    private BigDecimal totalPrice;
}
