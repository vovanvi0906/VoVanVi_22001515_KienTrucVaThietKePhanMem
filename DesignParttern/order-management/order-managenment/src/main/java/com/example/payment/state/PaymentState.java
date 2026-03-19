package com.example.payment.state;

import com.example.payment.context.Payment;

public interface PaymentState {
    void handle(Payment payment);
    String getStateName();
}