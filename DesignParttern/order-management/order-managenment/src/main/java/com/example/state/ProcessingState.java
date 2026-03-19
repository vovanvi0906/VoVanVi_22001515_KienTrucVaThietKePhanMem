package com.example.state;

import com.example.context.Order;

public class ProcessingState implements OrderState {
    @Override
    public void handle(Order order) {
        System.out.println("Đang xử lý: Đóng gói và vận chuyển.");
        order.shipOrder();
    }

    @Override
    public String getStateName() {
        return "Đang xử lý";
    }
}