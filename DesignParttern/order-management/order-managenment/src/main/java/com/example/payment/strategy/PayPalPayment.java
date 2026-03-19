package com.example.payment.strategy;

public class PayPalPayment implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("Thanh toán " + amount + " bằng PayPal.");
    }

    @Override
    public String getPaymentMethod() {
        return "PayPal";
    }
}