package com.example.library.book;

public class EBook extends Book {
    public EBook(String title, String author, String category) {
        super(title, author, category);
    }

    @Override
    public String getType() {
        return "Sách điện tử";
    }
}