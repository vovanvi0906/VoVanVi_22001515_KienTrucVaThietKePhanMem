package com.example.observer.stock;

public interface InvestorObserver {
    void update(String stockName, double newPrice);
}