package com.example.library.core;

import java.util.ArrayList;
import java.util.List;

import com.example.library.book.Book;
import com.example.library.observer.LibraryObserver;
import com.example.library.search.SearchStrategy;

public class Library {
    private static Library instance;
    private List<Book> books = new ArrayList<>();
    private List<LibraryObserver> observers = new ArrayList<>();

    private Library() {}

    public static Library getInstance() {
        if (instance == null) {
            instance = new Library();
        }
        return instance;
    }

    public void addBook(Book book) {
        books.add(book);
        notifyObservers("Sách mới được thêm: " + book.getTitle());
    }

    public List<Book> getBooks() {
        return books;
    }

    public List<Book> search(SearchStrategy strategy, String keyword) {
        return strategy.search(books, keyword);
    }

    public void attach(LibraryObserver observer) {
        observers.add(observer);
    }

    public void notifyObservers(String message) {
        for (LibraryObserver observer : observers) {
            observer.update(message);
        }
    }
}