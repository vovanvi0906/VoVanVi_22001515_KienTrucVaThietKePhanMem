import {
  getOrderById,
  getOrders,
  updateOrderStatusRequest,
} from "../api/orderApi";
import { getPaymentByOrderId, getPayments } from "../api/paymentApi";

export const getAllOrders = () => getOrders();

export const getOrderDetail = (id) => getOrderById(id);

export const updateOrderStatus = (id, status) =>
  updateOrderStatusRequest(id, { status });

export const getAllPayments = () => getPayments();

export const getOrderPayment = (orderId) => getPaymentByOrderId(orderId);
