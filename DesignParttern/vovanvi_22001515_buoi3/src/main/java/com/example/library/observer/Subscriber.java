package com.example.library.observer;

public class Subscriber implements LibraryObserver {
    private String name;

    public Subscriber(String name) {
        this.name = name;
    }

    @Override
    public void update(String message) {
        System.out.println("Người dùng " + name + " nhận thông báo: " + message);
    }
}