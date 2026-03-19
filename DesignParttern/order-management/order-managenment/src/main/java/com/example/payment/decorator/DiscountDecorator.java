package com.example.payment.decorator;

public class DiscountDecorator extends PaymentDecorator {
    public DiscountDecorator(PaymentComponent payment) {
        super(payment);
    }

    @Override
    public String getDescription() {
        return super.getDescription() + ", áp dụng mã giảm giá";
    }

    @Override
    public double getAmount() {
        return super.getAmount() - 20.0;
    }
}