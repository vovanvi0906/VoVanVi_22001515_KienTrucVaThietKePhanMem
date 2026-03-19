package com.example.payment.decorator;

public abstract class PaymentDecorator implements PaymentComponent {
    protected PaymentComponent payment;

    public PaymentDecorator(PaymentComponent payment) {
        this.payment = payment;
    }

    @Override
    public String getDescription() {
        return payment.getDescription();
    }

    @Override
    public double getAmount() {
        return payment.getAmount();
    }
}