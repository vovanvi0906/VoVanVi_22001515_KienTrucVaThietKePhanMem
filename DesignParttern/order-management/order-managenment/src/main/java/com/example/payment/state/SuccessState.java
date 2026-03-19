package com.example.payment.state;

import com.example.payment.context.Payment;

public class SuccessState implements PaymentState {
    @Override
    public void handle(Payment payment) {
        System.out.println("Thanh toán thành công.");
    }

    @Override
    public String getStateName() {
        return "Thành công";
    }
}