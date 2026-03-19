package com.example.payment.decorator;

public class ProcessingFeeDecorator extends PaymentDecorator {
    public ProcessingFeeDecorator(PaymentComponent payment) {
        super(payment);
    }

    @Override
    public String getDescription() {
        return super.getDescription() + ", cộng phí xử lý";
    }

    @Override
    public double getAmount() {
        return super.getAmount() + 5.0;
    }
}