package com.example.library.decorator;

public class BasicBorrow implements Borrowable {
    @Override
    public String getDescription() {
        return "Mượn sách cơ bản";
    }
}