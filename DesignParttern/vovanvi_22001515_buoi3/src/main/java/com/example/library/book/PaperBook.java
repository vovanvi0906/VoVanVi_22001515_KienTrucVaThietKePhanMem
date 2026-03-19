package com.example.library.book;

public class PaperBook extends Book {
    public PaperBook(String title, String author, String category) {
        super(title, author, category);
    }

    @Override
    public String getType() {
        return "Sách giấy";
    }
}