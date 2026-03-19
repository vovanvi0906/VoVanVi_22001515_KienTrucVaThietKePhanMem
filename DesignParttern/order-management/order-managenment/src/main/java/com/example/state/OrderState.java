package com.example.state;

import com.example.context.Order;

public interface OrderState {
    void handle(Order order);
    String getStateName();
}