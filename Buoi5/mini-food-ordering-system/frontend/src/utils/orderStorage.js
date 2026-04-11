const ORDER_META_STORAGE_KEY = "mini-food-order-meta";

const readOrderMetaMap = () => {
  if (typeof window === "undefined") {
    return {};
  }

  const savedValue = window.localStorage.getItem(ORDER_META_STORAGE_KEY);

  if (!savedValue) {
    return {};
  }

  try {
    const parsedValue = JSON.parse(savedValue);
    return parsedValue && typeof parsedValue === "object" ? parsedValue : {};
  } catch (error) {
    console.error("Cannot parse saved order metadata:", error);
    return {};
  }
};

export const getAllOrderMeta = () => readOrderMetaMap();

export const getOrderMeta = (orderId) => {
  const allOrderMeta = readOrderMetaMap();
  return allOrderMeta[String(orderId)] || null;
};

export const saveOrderMeta = (orderId, meta) => {
  const allOrderMeta = readOrderMetaMap();
  const key = String(orderId);

  // order-service hiện chưa lưu receiver info và shipping fee,
  // nên frontend giữ snapshot này để hiển thị lại ở Orders.
  allOrderMeta[key] = {
    ...(allOrderMeta[key] || {}),
    ...meta,
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      ORDER_META_STORAGE_KEY,
      JSON.stringify(allOrderMeta)
    );
  }

  return allOrderMeta[key];
};
