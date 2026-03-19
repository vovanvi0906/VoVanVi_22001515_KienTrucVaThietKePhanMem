package com.example.payment.state;

import com.example.payment.context.Payment;

public class FailedState implements PaymentState {
    @Override
    public void handle(Payment payment) {
        System.out.println("Thanh toán thất bại.");
    }

    @Override
    public String getStateName() {
        return "Thất bại";
    }
}