package com.example.decorator;

public class InsuranceDecorator extends OrderDecorator {
    public InsuranceDecorator(OrderComponent decoratedOrder) {
        super(decoratedOrder);
    }

    @Override
    public String getDescription() {
        return super.getDescription() + ", thêm bảo hiểm";
    }

    @Override
    public double getCost() {
        return super.getCost() + 30.0;
    }
}