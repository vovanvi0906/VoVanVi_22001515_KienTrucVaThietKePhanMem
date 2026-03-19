package com.example.tax.state;

import com.example.tax.context.Product;

public interface ProductState {
    void handle(Product product);
    String getStateName();
}