package com.example.decorator;

public class BasicOrder implements OrderComponent {
    private String orderName;
    private double baseCost;

    public BasicOrder(String orderName, double baseCost) {
        this.orderName = orderName;
        this.baseCost = baseCost;
    }

    @Override
    public String getDescription() {
        return "Đơn hàng: " + orderName;
    }

    @Override
    public double getCost() {
        return baseCost;
    }
}