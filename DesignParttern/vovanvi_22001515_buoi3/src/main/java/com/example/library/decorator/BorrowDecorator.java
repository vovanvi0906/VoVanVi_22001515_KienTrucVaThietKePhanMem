package com.example.library.decorator;

public abstract class BorrowDecorator implements Borrowable {
    protected Borrowable borrowable;

    public BorrowDecorator(Borrowable borrowable) {
        this.borrowable = borrowable;
    }

    @Override
    public String getDescription() {
        return borrowable.getDescription();
    }
}