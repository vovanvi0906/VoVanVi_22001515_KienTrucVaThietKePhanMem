package com.example.decorator;

public class GiftWrapDecorator extends OrderDecorator {
    public GiftWrapDecorator(OrderComponent decoratedOrder) {
        super(decoratedOrder);
    }

    @Override
    public String getDescription() {
        return super.getDescription() + ", thêm gói quà";
    }

    @Override
    public double getCost() {
        return super.getCost() + 20.0;
    }
}