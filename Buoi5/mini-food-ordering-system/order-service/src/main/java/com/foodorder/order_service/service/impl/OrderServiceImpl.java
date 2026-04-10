package com.foodorder.order_service.service.impl;

import com.foodorder.order_service.dto.CreateOrderRequest;
import com.foodorder.order_service.dto.OrderItemRequest;
import com.foodorder.order_service.dto.OrderItemResponse;
import com.foodorder.order_service.dto.OrderResponse;
import com.foodorder.order_service.dto.UpdateOrderStatusRequest;
import com.foodorder.order_service.entity.Order;
import com.foodorder.order_service.entity.OrderItem;
import com.foodorder.order_service.entity.OrderStatus;
import com.foodorder.order_service.exception.ResourceNotFoundException;
import com.foodorder.order_service.repository.OrderRepository;
import com.foodorder.order_service.service.OrderService;
import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    @Override
    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request) {
        Order order = Order.builder()
                .userId(request.getUserId())
                .status(OrderStatus.PENDING)
                .totalAmount(BigDecimal.ZERO)
                .build();

        BigDecimal totalAmount = BigDecimal.ZERO;
        for (OrderItemRequest itemRequest : request.getItems()) {
            OrderItem orderItem = buildOrderItem(itemRequest);
            order.addItem(orderItem);
            totalAmount = totalAmount.add(orderItem.getSubtotal());
        }

        order.setTotalAmount(totalAmount);
        Order savedOrder = orderRepository.save(order);
        return toOrderResponse(savedOrder);
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toOrderResponse)
                .toList();
    }

    @Override
    public OrderResponse getOrderById(Long id) {
        Order order = findOrderById(id);
        return toOrderResponse(order);
    }

    @Override
    @Transactional
    public OrderResponse updateOrderStatus(Long id, UpdateOrderStatusRequest request) {
        Order order = findOrderById(id);
        order.setStatus(request.getStatus());
        return toOrderResponse(orderRepository.save(order));
    }

    private Order findOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
    }

    private OrderItem buildOrderItem(OrderItemRequest request) {
        BigDecimal subtotal = calculateSubtotal(request.getPrice(), request.getQuantity());

        return OrderItem.builder()
                .foodId(request.getFoodId())
                .foodName(request.getFoodName().trim())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .subtotal(subtotal)
                .build();
    }

    private BigDecimal calculateSubtotal(BigDecimal price, Integer quantity) {
        return price.multiply(BigDecimal.valueOf(quantity.longValue()));
    }

    private OrderResponse toOrderResponse(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .items(order.getItems()
                        .stream()
                        .map(this::toOrderItemResponse)
                        .toList())
                .build();
    }

    private OrderItemResponse toOrderItemResponse(OrderItem orderItem) {
        return OrderItemResponse.builder()
                .id(orderItem.getId())
                .foodId(orderItem.getFoodId())
                .foodName(orderItem.getFoodName())
                .price(orderItem.getPrice())
                .quantity(orderItem.getQuantity())
                .subtotal(orderItem.getSubtotal())
                .build();
    }
}
