package com.example.library.decorator;

public class SpecialEditionDecorator extends BorrowDecorator {
    public SpecialEditionDecorator(Borrowable borrowable) {
        super(borrowable);
    }

    @Override
    public String getDescription() {
        return super.getDescription() + ", yêu cầu phiên bản đặc biệt";
    }
}