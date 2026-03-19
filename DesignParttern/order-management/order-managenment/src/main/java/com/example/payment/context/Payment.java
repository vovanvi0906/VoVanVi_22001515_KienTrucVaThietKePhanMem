package com.example.payment.context;

import com.example.payment.decorator.PaymentComponent;
import com.example.payment.state.CreatedState;
import com.example.payment.state.PaymentState;
import com.example.payment.strategy.PaymentStrategy;

public class Payment {
    private PaymentState state;
    private PaymentStrategy paymentStrategy;
    private PaymentComponent paymentComponent;

    public Payment(PaymentComponent paymentComponent, PaymentStrategy paymentStrategy) {
        this.paymentComponent = paymentComponent;
        this.paymentStrategy = paymentStrategy;
        this.state = new CreatedState();
    }

    public void setState(PaymentState state) {
        this.state = state;
    }

    public void setPaymentStrategy(PaymentStrategy paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    public void process() {
        System.out.println("== Trạng thái thanh toán: " + state.getStateName() + " ==");
        System.out.println("Mô tả: " + paymentComponent.getDescription());
        System.out.println("Số tiền cần thanh toán: " + paymentComponent.getAmount());
        System.out.println("Phương thức: " + paymentStrategy.getPaymentMethod());
        state.handle(this);
    }

    public void executePayment() {
        paymentStrategy.pay(paymentComponent.getAmount());
    }
}