package com.travel.payment_service.service;

import com.travel.payment_service.dto.PaymentRequest;
import com.travel.payment_service.dto.PaymentResponse;
import org.springframework.stereotype.Service;

import java.util.concurrent.ThreadLocalRandom;

@Service
public class PaymentService {

    public PaymentResponse processPayment(PaymentRequest request) {
        boolean successful = ThreadLocalRandom.current().nextBoolean();

        if (successful) {
            return new PaymentResponse(
                    request.getBookingId(),
                    "SUCCESS",
                    "Payment successful"
            );
        }

        return new PaymentResponse(
                request.getBookingId(),
                "FAILED",
                "Payment failed"
        );
    }
}
