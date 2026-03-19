package com.example.tax.state;

import com.example.tax.context.Product;

public class ExemptProductState implements ProductState {
    @Override
    public void handle(Product product) {
        System.out.println("Sản phẩm miễn thuế: không tính thuế.");
    }

    @Override
    public String getStateName() {
        return "Sản phẩm miễn thuế";
    }
}