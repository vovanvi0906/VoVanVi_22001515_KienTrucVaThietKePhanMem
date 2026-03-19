package com.example.tax.state;

import com.example.tax.context.Product;

public class ImportedProductState implements ProductState {
    @Override
    public void handle(Product product) {
        System.out.println("Sản phẩm nhập khẩu: kiểm tra thêm thuế nhập khẩu/phụ thu.");
    }

    @Override
    public String getStateName() {
        return "Sản phẩm nhập khẩu";
    }
}