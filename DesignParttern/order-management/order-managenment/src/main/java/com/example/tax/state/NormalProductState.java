package com.example.tax.state;

import com.example.tax.context.Product;

public class NormalProductState implements ProductState {
    @Override
    public void handle(Product product) {
        System.out.println("Sản phẩm thường: áp dụng thuế cơ bản.");
    }

    @Override
    public String getStateName() {
        return "Sản phẩm thường";
    }
}