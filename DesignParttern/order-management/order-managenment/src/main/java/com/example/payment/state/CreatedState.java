package com.example.payment.state;

import com.example.payment.context.Payment;

public class CreatedState implements PaymentState {
    @Override
    public void handle(Payment payment) {
        System.out.println("Mới tạo: khởi tạo giao dịch thanh toán.");
    }

    @Override
    public String getStateName() {
        return "Mới tạo";
    }
}