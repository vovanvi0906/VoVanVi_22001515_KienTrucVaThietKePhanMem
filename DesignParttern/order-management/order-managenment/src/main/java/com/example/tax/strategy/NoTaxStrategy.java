package com.example.tax.strategy;

public class NoTaxStrategy implements TaxStrategy {
    @Override
    public double calculateTax(double price) {
        return 0.0;
    }

    @Override
    public String getTaxName() {
        return "Miễn thuế";
    }
}