package com.example.state;

import com.example.context.Order;

public class DeliveredState implements OrderState {
    @Override
    public void handle(Order order) {
        System.out.println("Đã giao: Cập nhật trạng thái đơn hàng là đã giao.");
    }

    @Override
    public String getStateName() {
        return "Đã giao";
    }
}