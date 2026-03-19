package com.example.payment.decorator;

public class BasicPayment implements PaymentComponent {
    private String orderName;
    private double amount;

    public BasicPayment(String orderName, double amount) {
        this.orderName = orderName;
        this.amount = amount;
    }

    @Override
    public String getDescription() {
        return "Thanh toán cho đơn: " + orderName;
    }

    @Override
    public double getAmount() {
        return amount;
    }
}