package com.foodorder.order_service.service;

import com.foodorder.order_service.dto.CreateOrderRequest;
import com.foodorder.order_service.dto.OrderResponse;
import com.foodorder.order_service.dto.UpdateOrderStatusRequest;
import java.util.List;

public interface OrderService {

    OrderResponse createOrder(CreateOrderRequest request);

    List<OrderResponse> getAllOrders();

    OrderResponse getOrderById(Long id);

    OrderResponse updateOrderStatus(Long id, UpdateOrderStatusRequest request);
}
