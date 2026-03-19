package com.example.tax.strategy;

public class ConsumptionTaxStrategy implements TaxStrategy {
    @Override
    public double calculateTax(double price) {
        return price * 0.08;
    }

    @Override
    public String getTaxName() {
        return "Thuế tiêu thụ 8%";
    }
}