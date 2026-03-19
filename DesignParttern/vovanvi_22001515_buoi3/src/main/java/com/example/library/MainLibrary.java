package com.example.library;

import com.example.library.book.*;
import com.example.library.core.Library;
import com.example.library.decorator.*;
import com.example.library.observer.*;
import com.example.library.search.*;

public class MainLibrary {
    public static void main(String[] args) {
        Library library = Library.getInstance();

        library.attach(new Librarian("Lan"));
        library.attach(new Subscriber("Minh"));

        BookFactory factory = new SimpleBookFactory();

        library.addBook(factory.createBook("paper", "Lập trình Java", "Nguyễn Văn A", "CNTT"));
        library.addBook(factory.createBook("ebook", "Design Patterns", "Erich Gamma", "CNTT"));
        library.addBook(factory.createBook("audio", "Dế Mèn Phiêu Lưu Ký", "Tô Hoài", "Văn học"));

        System.out.println("\nTìm theo tên:");
        library.search(new SearchByTitle(), "Java").forEach(System.out::println);

        System.out.println("\nTìm theo tác giả:");
        library.search(new SearchByAuthor(), "Tô Hoài").forEach(System.out::println);

        Borrowable borrow = new BasicBorrow();
        borrow = new ExtendedLoanDecorator(borrow);
        borrow = new SpecialEditionDecorator(borrow);

        System.out.println("\nChức năng mượn:");
        System.out.println(borrow.getDescription());
    }
}