package com.example.state;

import com.example.context.Order;

public class NewOrderState implements OrderState {
    @Override
    public void handle(Order order) {
        System.out.println("Mới tạo: Kiểm tra thông tin đơn hàng.");
    }

    @Override
    public String getStateName() {
        return "Mới tạo";
    }
}