package com.example.tax.decorator;

public class BasicProduct implements ProductComponent {
    private String name;
    private double price;

    public BasicProduct(String name, double price) {
        this.name = name;
        this.price = price;
    }

    @Override
    public String getDescription() {
        return "Sản phẩm: " + name;
    }

    @Override
    public double getPrice() {
        return price;
    }
}