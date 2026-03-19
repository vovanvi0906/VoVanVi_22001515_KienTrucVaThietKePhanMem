package com.example.payment.strategy;

public class CreditCardPayment implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("Thanh toán " + amount + " bằng Thẻ tín dụng.");
    }

    @Override
    public String getPaymentMethod() {
        return "Thẻ tín dụng";
    }
}