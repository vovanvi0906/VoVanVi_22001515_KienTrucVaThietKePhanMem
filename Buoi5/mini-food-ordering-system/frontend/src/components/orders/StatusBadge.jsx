const ORDER_STATUS_STYLES = {
  PENDING: "warning",
  CONFIRMED: "info",
  PAID: "success",
  CANCELLED: "danger",
  COMPLETED: "success",
};

const ORDER_STATUS_LABELS = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  PAID: "Đã thanh toán",
  CANCELLED: "Đã hủy",
  COMPLETED: "Hoàn thành",
};

const PAYMENT_STATUS_STYLES = {
  PENDING: "warning",
  PAID: "success",
  FAILED: "danger",
  CANCELLED: "secondary",
  UNPAID: "secondary",
};

const PAYMENT_STATUS_LABELS = {
  PENDING: "Chờ thanh toán",
  PAID: "Đã thanh toán",
  FAILED: "Thất bại",
  CANCELLED: "Đã hủy",
  UNPAID: "Chưa thanh toán",
};

function StatusBadge({ status, type = "order" }) {
  const normalizedStatus = String(status || "PENDING").toUpperCase();
  const styles =
    type === "payment" ? PAYMENT_STATUS_STYLES : ORDER_STATUS_STYLES;
  const labels =
    type === "payment" ? PAYMENT_STATUS_LABELS : ORDER_STATUS_LABELS;
  const badgeStyle = styles[normalizedStatus] || "secondary";
  const label = labels[normalizedStatus] || normalizedStatus;

  return <span className={`badge text-bg-${badgeStyle}`}>{label}</span>;
}

export default StatusBadge;
