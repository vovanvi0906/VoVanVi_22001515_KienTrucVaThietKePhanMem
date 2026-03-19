package com.example.library.search;

import java.util.List;
import java.util.stream.Collectors;

import com.example.library.book.Book;

public class SearchByAuthor implements SearchStrategy {
    @Override
    public List<Book> search(List<Book> books, String keyword) {
        return books.stream()
                .filter(book -> book.getAuthor().toLowerCase().contains(keyword.toLowerCase()))
                .collect(Collectors.toList());
    }
}