package com.example.library.book;

public interface BookFactory {
    Book createBook(String type, String title, String author, String category);
}