export const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });

export const formatDateTime = (value) => {
  if (!value) {
    return "Chưa có thời gian";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("vi-VN", {
    hour12: false,
  });
};

export const formatPaymentMethod = (method) => {
  const methodLabels = {
    COD: "COD",
    BANKING: "Chuyển khoản",
  };

  return methodLabels[method] || method || "Chưa chọn";
};
