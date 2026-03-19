package com.example.payment.state;

import com.example.payment.context.Payment;

public class ProcessingState implements PaymentState {
    @Override
    public void handle(Payment payment) {
        System.out.println("Đang xử lý: xác nhận và gửi yêu cầu thanh toán.");
        payment.executePayment();
    }

    @Override
    public String getStateName() {
        return "Đang xử lý";
    }
}