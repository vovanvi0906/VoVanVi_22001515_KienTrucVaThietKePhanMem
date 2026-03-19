package com.example.library.observer;

public class Librarian implements LibraryObserver {
    private String name;

    public Librarian(String name) {
        this.name = name;
    }

    @Override
    public void update(String message) {
        System.out.println("Thủ thư " + name + " nhận thông báo: " + message);
    }
}