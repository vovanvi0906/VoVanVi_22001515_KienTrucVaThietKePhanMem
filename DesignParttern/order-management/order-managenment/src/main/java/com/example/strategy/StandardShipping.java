package com.example.strategy;

public class StandardShipping implements ShippingStrategy {
    @Override
    public void ship() {
        System.out.println("Vận chuyển bằng hình thức giao hàng thường.");
    }
}