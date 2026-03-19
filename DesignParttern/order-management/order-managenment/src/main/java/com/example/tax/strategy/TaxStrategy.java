package com.example.tax.strategy;

public interface TaxStrategy {
    double calculateTax(double price);
    String getTaxName();
}