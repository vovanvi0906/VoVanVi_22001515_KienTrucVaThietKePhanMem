import axios from "axios";

const paymentApi = axios.create({
  baseURL: import.meta.env.VITE_PAYMENT_API || "/payment-api",
});

export const createPayment = async (payload) => {
  const response = await paymentApi.post("/api/payments", payload);
  return response.data;
};

export const getPayments = async () => {
  const response = await paymentApi.get("/api/payments");
  return response.data;
};

export const getPaymentByOrderId = async (orderId) => {
  const response = await paymentApi.get(`/api/payments/order/${orderId}`);
  return response.data;
};

export default paymentApi;
