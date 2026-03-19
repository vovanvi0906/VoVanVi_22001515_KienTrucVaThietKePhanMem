package com.example.strategy;

public class ExpressShipping implements ShippingStrategy {
    @Override
    public void ship() {
        System.out.println("Vận chuyển bằng hình thức giao hàng nhanh.");
    }
}