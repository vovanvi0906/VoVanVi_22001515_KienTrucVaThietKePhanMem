import axios from "axios";

const orderApi = axios.create({
  baseURL: import.meta.env.VITE_ORDER_API || "/order-api",
});

const unwrapOrderResponse = (response) => response.data?.data ?? response.data;

export const createOrder = async (payload) => {
  const response = await orderApi.post("/orders", payload);
  return unwrapOrderResponse(response);
};

export const getOrders = async () => {
  const response = await orderApi.get("/orders");
  return unwrapOrderResponse(response);
};

export const getOrderById = async (id) => {
  const response = await orderApi.get(`/orders/${id}`);
  return unwrapOrderResponse(response);
};

export const updateOrderStatusRequest = async (id, payload) => {
  const response = await orderApi.put(`/orders/${id}/status`, payload);
  return unwrapOrderResponse(response);
};

export default orderApi;
