package com.example.paymentservice.client;

import com.example.paymentservice.dto.OrderStatusUpdateRequest;
import com.example.paymentservice.enums.OrderStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
@Slf4j
public class OrderServiceClient {

    private final RestTemplate restTemplate;

    @Value("${order.service.url}")
    private String orderServiceUrl;

    public void updateOrderStatus(Long orderId, OrderStatus status) {
        String url = orderServiceUrl + "/orders/{orderId}/status";
        OrderStatusUpdateRequest request = OrderStatusUpdateRequest.builder()
                .status(status)
                .build();

        try {
            restTemplate.put(url, request, orderId);
            log.info("Updated order {} to status {}", orderId, status);
        } catch (RestClientException ex) {
            // order-service can be unavailable during demo, payment-service should still work.
            log.warn(
                    "Could not update order-service for orderId {} with status {}. Reason: {}",
                    orderId,
                    status,
                    ex.getMessage()
            );
        }
    }
}
