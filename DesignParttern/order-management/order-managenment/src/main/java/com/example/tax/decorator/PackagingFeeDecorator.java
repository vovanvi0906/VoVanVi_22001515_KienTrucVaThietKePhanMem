package com.example.tax.decorator;

public class PackagingFeeDecorator extends ProductDecorator {
    public PackagingFeeDecorator(ProductComponent product) {
        super(product);
    }

    @Override
    public String getDescription() {
        return super.getDescription() + ", thêm phí đóng gói";
    }

    @Override
    public double getPrice() {
        return super.getPrice() + 10.0;
    }
}