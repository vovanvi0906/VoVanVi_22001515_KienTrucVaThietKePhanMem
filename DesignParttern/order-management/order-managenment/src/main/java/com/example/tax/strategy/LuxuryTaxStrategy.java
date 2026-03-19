package com.example.tax.strategy;

public class LuxuryTaxStrategy implements TaxStrategy {
    @Override
    public double calculateTax(double price) {
        return price * 0.20;
    }

    @Override
    public String getTaxName() {
        return "Thuế xa xỉ 20%";
    }
}