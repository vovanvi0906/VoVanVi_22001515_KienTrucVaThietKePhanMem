package com.example.payment;

import com.example.payment.context.Payment;
import com.example.payment.decorator.BasicPayment;
import com.example.payment.decorator.DiscountDecorator;
import com.example.payment.decorator.PaymentComponent;
import com.example.payment.decorator.ProcessingFeeDecorator;
import com.example.payment.state.FailedState;
import com.example.payment.state.ProcessingState;
import com.example.payment.state.SuccessState;
import com.example.payment.strategy.CreditCardPayment;
import com.example.payment.strategy.PayPalPayment;
import com.example.payment.strategy.PaymentStrategy;

public class MainPayment {
    public static void main(String[] args) {
        PaymentComponent paymentComponent = new BasicPayment("Đơn hàng #001", 200);
        paymentComponent = new ProcessingFeeDecorator(paymentComponent);
        paymentComponent = new DiscountDecorator(paymentComponent);

        PaymentStrategy strategy = new CreditCardPayment();
        Payment payment = new Payment(paymentComponent, strategy);

        payment.process();
        System.out.println();

        payment.setState(new ProcessingState());
        payment.process();
        System.out.println();

        payment.setState(new SuccessState());
        payment.process();
        System.out.println();

        System.out.println("=== Mô phỏng giao dịch khác bị lỗi ===");
        PaymentComponent payment2 = new BasicPayment("Đơn hàng #002", 150);
        Payment failedPayment = new Payment(payment2, new PayPalPayment());
        failedPayment.setState(new FailedState());
        failedPayment.process();
    }
}