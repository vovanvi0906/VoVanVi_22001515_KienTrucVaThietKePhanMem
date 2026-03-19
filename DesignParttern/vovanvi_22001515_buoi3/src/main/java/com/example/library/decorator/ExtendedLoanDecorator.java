package com.example.library.decorator;

public class ExtendedLoanDecorator extends BorrowDecorator {
    public ExtendedLoanDecorator(Borrowable borrowable) {
        super(borrowable);
    }

    @Override
    public String getDescription() {
        return super.getDescription() + ", thêm gia hạn thời gian mượn";
    }
}