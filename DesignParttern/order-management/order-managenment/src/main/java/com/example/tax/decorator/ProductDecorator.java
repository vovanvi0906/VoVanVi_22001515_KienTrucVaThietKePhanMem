package com.example.tax.decorator;

public abstract class ProductDecorator implements ProductComponent {
    protected ProductComponent product;

    public ProductDecorator(ProductComponent product) {
        this.product = product;
    }

    @Override
    public String getDescription() {
        return product.getDescription();
    }

    @Override
    public double getPrice() {
        return product.getPrice();
    }
}