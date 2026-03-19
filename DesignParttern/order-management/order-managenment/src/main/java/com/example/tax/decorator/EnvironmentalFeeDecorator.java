package com.example.tax.decorator;

public class EnvironmentalFeeDecorator extends ProductDecorator {
    public EnvironmentalFeeDecorator(ProductComponent product) {
        super(product);
    }

    @Override
    public String getDescription() {
        return super.getDescription() + ", thêm phí môi trường";
    }

    @Override
    public double getPrice() {
        return super.getPrice() + 15.0;
    }
}