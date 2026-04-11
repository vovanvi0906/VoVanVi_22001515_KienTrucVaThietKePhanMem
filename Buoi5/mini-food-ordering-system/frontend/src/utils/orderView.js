export const buildOrderViewModel = ({ order, orderMeta, payment }) => {
  const backendSubtotal = Number(order?.totalAmount || 0);
  const paymentAmount = Number(payment?.amount || 0);
  const subtotal = Number(orderMeta?.subtotal ?? backendSubtotal);
  const shippingFee = Number(
    orderMeta?.shippingFee ?? Math.max(paymentAmount - subtotal, 0)
  );
  const finalTotal = Number(
    orderMeta?.finalTotal ?? (paymentAmount > 0 ? paymentAmount : subtotal + shippingFee)
  );
  const paymentMethod = payment?.paymentMethod || orderMeta?.paymentMethod || "COD";
  const paymentStatus =
    payment?.paymentStatus ||
    orderMeta?.paymentStatus ||
    (paymentMethod === "BANKING" ? "PAID" : "PENDING");

  return {
    ...order,
    items: order?.items?.length ? order.items : orderMeta?.itemsSnapshot || [],
    customerName: orderMeta?.customerName || "Chưa có thông tin",
    phone: orderMeta?.phone || "Chưa có thông tin",
    address: orderMeta?.address || "Chưa có thông tin",
    note: orderMeta?.note || "",
    shippingFee,
    subtotal,
    finalTotal,
    paymentMethod,
    paymentStatus,
    transactionCode: payment?.transactionCode || orderMeta?.transactionCode || "",
    createdAt: order?.createdAt || orderMeta?.createdAt || "",
  };
};
