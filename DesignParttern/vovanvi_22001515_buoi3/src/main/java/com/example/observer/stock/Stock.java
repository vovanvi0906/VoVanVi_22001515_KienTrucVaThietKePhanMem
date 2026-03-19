package com.example.observer.stock;

import java.util.ArrayList;
import java.util.List;

public class Stock implements StockSubject {
    private String name;
    private double price;
    private List<InvestorObserver> observers = new ArrayList<>();

    public Stock(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public void setPrice(double price) {
        this.price = price;
        notifyObservers();
    }

    @Override
    public void attach(InvestorObserver observer) {
        observers.add(observer);
    }

    @Override
    public void detach(InvestorObserver observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        for (InvestorObserver observer : observers) {
            observer.update(name, price);
        }
    }
}