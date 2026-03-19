package com.example.tax.strategy;

public class VATTaxStrategy implements TaxStrategy {
    @Override
    public double calculateTax(double price) {
        return price * 0.10;
    }

    @Override
    public String getTaxName() {
        return "Thuế VAT 10%";
    }
}