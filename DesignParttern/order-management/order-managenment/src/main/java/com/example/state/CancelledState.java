package com.example.state;

import com.example.context.Order;

public class CancelledState implements OrderState {
    @Override
    public void handle(Order order) {
        System.out.println("Hủy: Hủy đơn hàng và hoàn tiền.");
    }

    @Override
    public String getStateName() {
        return "Hủy";
    }
}