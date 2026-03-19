package com.example.library.book;

public class AudioBook extends Book {
    public AudioBook(String title, String author, String category) {
        super(title, author, category);
    }

    @Override
    public String getType() {
        return "Sách nói";
    }
}