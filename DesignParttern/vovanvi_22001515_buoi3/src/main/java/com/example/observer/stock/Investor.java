package com.example.observer.stock;

public class Investor implements InvestorObserver {
    private String name;

    public Investor(String name) {
        this.name = name;
    }

    @Override
    public void update(String stockName, double newPrice) {
        System.out.println(name + " nhận thông báo: " + stockName + " đổi giá thành " + newPrice);
    }
}