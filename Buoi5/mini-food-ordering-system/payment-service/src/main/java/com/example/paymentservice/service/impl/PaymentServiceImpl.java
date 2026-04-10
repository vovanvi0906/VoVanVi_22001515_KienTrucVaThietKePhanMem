package com.example.paymentservice.service.impl;

import com.example.paymentservice.client.OrderServiceClient;
import com.example.paymentservice.dto.PaymentRequest;
import com.example.paymentservice.dto.PaymentResponse;
import com.example.paymentservice.dto.UpdatePaymentStatusRequest;
import com.example.paymentservice.entity.Payment;
import com.example.paymentservice.enums.OrderStatus;
import com.example.paymentservice.enums.PaymentMethod;
import com.example.paymentservice.enums.PaymentStatus;
import com.example.paymentservice.exception.BadRequestException;
import com.example.paymentservice.exception.ResourceNotFoundException;
import com.example.paymentservice.repository.PaymentRepository;
import com.example.paymentservice.service.PaymentService;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderServiceClient orderServiceClient;

    @Override
    @Transactional
    public PaymentResponse createPayment(PaymentRequest request) {
        validateNewPayment(request.getOrderId());

        PaymentStatus initialStatus = resolveInitialStatus(request.getPaymentMethod());
        LocalDateTime now = LocalDateTime.now();

        Payment payment = Payment.builder()
                .orderId(request.getOrderId())
                .amount(request.getAmount())
                .paymentMethod(request.getPaymentMethod())
                .paymentStatus(initialStatus)
                .transactionCode(generateTransactionCode(request.getPaymentMethod()))
                .createdAt(now)
                .updatedAt(now)
                .build();

        Payment savedPayment = paymentRepository.save(payment);

        if (savedPayment.getPaymentMethod() == PaymentMethod.COD) {
            orderServiceClient.updateOrderStatus(savedPayment.getOrderId(), OrderStatus.CONFIRMED);
        } else {
            // BANKING is simulated as paid immediately for easier classroom demo.
            orderServiceClient.updateOrderStatus(savedPayment.getOrderId(), OrderStatus.PAID);
            logPaymentSuccess(savedPayment);
        }

        return mapToResponse(savedPayment);
    }

    @Override
    public List<PaymentResponse> getAllPayments() {
        return paymentRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public PaymentResponse getPaymentById(Long id) {
        return mapToResponse(findPaymentEntityById(id));
    }

    @Override
    public PaymentResponse getPaymentByOrderId(Long orderId) {
        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found for orderId: " + orderId));
        return mapToResponse(payment);
    }

    @Override
    @Transactional
    public PaymentResponse updatePaymentStatus(Long id, UpdatePaymentStatusRequest request) {
        Payment payment = findPaymentEntityById(id);
        validateStatusTransition(payment, request.getStatus());

        payment.setPaymentStatus(request.getStatus());
        payment.setUpdatedAt(LocalDateTime.now());

        Payment updatedPayment = paymentRepository.save(payment);

        if (updatedPayment.getPaymentStatus() == PaymentStatus.PAID) {
            orderServiceClient.updateOrderStatus(updatedPayment.getOrderId(), OrderStatus.PAID);
            logPaymentSuccess(updatedPayment);
        }

        return mapToResponse(updatedPayment);
    }

    private Payment findPaymentEntityById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));
    }

    private void validateNewPayment(Long orderId) {
        if (paymentRepository.existsByOrderId(orderId)) {
            throw new BadRequestException("Payment already exists for orderId: " + orderId);
        }
    }

    private PaymentStatus resolveInitialStatus(PaymentMethod paymentMethod) {
        return paymentMethod == PaymentMethod.BANKING ? PaymentStatus.PAID : PaymentStatus.PENDING;
    }

    private String generateTransactionCode(PaymentMethod paymentMethod) {
        if (paymentMethod != PaymentMethod.BANKING) {
            return null;
        }

        return "TXN-" + UUID.randomUUID()
                .toString()
                .replace("-", "")
                .substring(0, 12)
                .toUpperCase();
    }

    private void validateStatusTransition(Payment payment, PaymentStatus newStatus) {
        if (payment.getPaymentStatus() == PaymentStatus.PAID && newStatus != PaymentStatus.PAID) {
            throw new BadRequestException("Paid payment cannot be changed to another status");
        }

        if (payment.getPaymentStatus() == PaymentStatus.CANCELLED && newStatus == PaymentStatus.PAID) {
            throw new BadRequestException("Cancelled payment cannot be marked as PAID");
        }
    }

    private void logPaymentSuccess(Payment payment) {
        log.info(
                "Payment successful. orderId={}, paymentId={}, method={}, amount={}, transactionCode={}",
                payment.getOrderId(),
                payment.getId(),
                payment.getPaymentMethod(),
                payment.getAmount(),
                payment.getTransactionCode()
        );
    }

    private PaymentResponse mapToResponse(Payment payment) {
        return PaymentResponse.builder()
                .id(payment.getId())
                .orderId(payment.getOrderId())
                .amount(payment.getAmount())
                .paymentMethod(payment.getPaymentMethod())
                .paymentStatus(payment.getPaymentStatus())
                .transactionCode(payment.getTransactionCode())
                .createdAt(payment.getCreatedAt())
                .updatedAt(payment.getUpdatedAt())
                .build();
    }
}
