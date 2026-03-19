package com.example.context;

import com.example.decorator.OrderComponent;
import com.example.state.NewOrderState;
import com.example.state.OrderState;
import com.example.strategy.ShippingStrategy;

public class Order {
    private OrderState state;
    private ShippingStrategy shippingStrategy;
    private OrderComponent orderComponent;

    public Order(OrderComponent orderComponent, ShippingStrategy shippingStrategy) {
        this.orderComponent = orderComponent;
        this.shippingStrategy = shippingStrategy;
        this.state = new NewOrderState();
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public void setShippingStrategy(ShippingStrategy shippingStrategy) {
        this.shippingStrategy = shippingStrategy;
    }

    public void process() {
        System.out.println("== Trạng thái hiện tại: " + state.getStateName() + " ==");
        state.handle(this);
    }

    public void shipOrder() {
        shippingStrategy.ship();
    }

    public void showOrderInfo() {
        System.out.println("Thông tin đơn hàng: " + orderComponent.getDescription());
        System.out.println("Tổng chi phí: " + orderComponent.getCost());
    }
}