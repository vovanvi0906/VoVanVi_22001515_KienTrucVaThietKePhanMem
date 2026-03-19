package com.example.library.book;

public class SimpleBookFactory implements BookFactory {
    @Override
    public Book createBook(String type, String title, String author, String category) {
        return switch (type.toLowerCase()) {
            case "paper" -> new PaperBook(title, author, category);
            case "ebook" -> new EBook(title, author, category);
            case "audio" -> new AudioBook(title, author, category);
            default -> throw new IllegalArgumentException("Loại sách không hợp lệ");
        };
    }
}