package com.travel.payment_service.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequest {

    @NotNull
    private Long bookingId;

    @NotNull
    @Min(0)
    private Long amount;

    @NotBlank
    private String method;
}
