package com.example.decorator;

public abstract class OrderDecorator implements OrderComponent {
    protected OrderComponent decoratedOrder;

    public OrderDecorator(OrderComponent decoratedOrder) {
        this.decoratedOrder = decoratedOrder;
    }

    @Override
    public String getDescription() {
        return decoratedOrder.getDescription();
    }

    @Override
    public double getCost() {
        return decoratedOrder.getCost();
    }
}