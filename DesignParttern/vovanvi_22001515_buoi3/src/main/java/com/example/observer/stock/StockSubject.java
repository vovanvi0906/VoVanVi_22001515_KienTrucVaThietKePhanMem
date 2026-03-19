package com.example.observer.stock;

public interface StockSubject {
    void attach(InvestorObserver observer);
    void detach(InvestorObserver observer);
    void notifyObservers();
}