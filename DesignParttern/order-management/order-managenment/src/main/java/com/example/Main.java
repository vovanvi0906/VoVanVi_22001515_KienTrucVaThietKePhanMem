package com.example;

import com.example.context.Order;
import com.example.decorator.BasicOrder;
import com.example.decorator.GiftWrapDecorator;
import com.example.decorator.InsuranceDecorator;
import com.example.decorator.OrderComponent;
import com.example.state.CancelledState;
import com.example.state.DeliveredState;
import com.example.state.ProcessingState;
import com.example.strategy.ExpressShipping;
import com.example.strategy.ShippingStrategy;
import com.example.strategy.StandardShipping;

public class Main {
    public static void main(String[] args) {
        OrderComponent orderComponent = new BasicOrder("Laptop", 1000);
        orderComponent = new GiftWrapDecorator(orderComponent);
        orderComponent = new InsuranceDecorator(orderComponent);

        ShippingStrategy shippingStrategy = new ExpressShipping();
        Order order = new Order(orderComponent, shippingStrategy);

        order.showOrderInfo();
        System.out.println();

        order.process();
        System.out.println();

        order.setState(new ProcessingState());
        order.process();
        System.out.println();

        order.setState(new DeliveredState());
        order.process();
        System.out.println();

        System.out.println("=== Mô phỏng đơn hàng bị hủy ===");
        OrderComponent order2 = new BasicOrder("Điện thoại", 500);
        Order cancelledOrder = new Order(order2, new StandardShipping());
        cancelledOrder.showOrderInfo();
        cancelledOrder.setState(new CancelledState());
        cancelledOrder.process();
    }
}