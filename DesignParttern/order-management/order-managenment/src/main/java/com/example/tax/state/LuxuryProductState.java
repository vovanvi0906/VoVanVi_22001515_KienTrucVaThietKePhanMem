package com.example.tax.state;

import com.example.tax.context.Product;

public class LuxuryProductState implements ProductState {
    @Override
    public void handle(Product product) {
        System.out.println("Sản phẩm xa xỉ: áp dụng mức thuế cao.");
    }

    @Override
    public String getStateName() {
        return "Sản phẩm xa xỉ";
    }
}