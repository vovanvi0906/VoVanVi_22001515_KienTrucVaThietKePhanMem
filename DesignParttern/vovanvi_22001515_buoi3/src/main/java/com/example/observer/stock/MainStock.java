package com.example.observer.stock;

public class MainStock {
    public static void main(String[] args) {
        Stock stock = new Stock("FPT", 100.0);

        Investor investor1 = new Investor("An");
        Investor investor2 = new Investor("Bình");

        stock.attach(investor1);
        stock.attach(investor2);

        System.out.println("Cập nhật giá lần 1:");
        stock.setPrice(105.5);

        System.out.println("\nCập nhật giá lần 2:");
        stock.setPrice(110.0);
    }
}