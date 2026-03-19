package com.example.library.search;

import java.util.List;

import com.example.library.book.Book;

public interface SearchStrategy {
    List<Book> search(List<Book> books, String keyword);
}