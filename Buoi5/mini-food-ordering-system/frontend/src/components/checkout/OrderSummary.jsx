import { formatCurrency } from "../../utils/formatters";

function OrderSummary({
  items,
  subtotal,
  shippingFee,
  totalAmount,
  submitLabel,
  submitDisabled,
  submitError,
  isSubmitting,
}) {
  return (
    <aside className="card border-0 shadow-sm sticky-top" style={{ top: "88px" }}>
      <div className="card-body p-4">
        <h2 className="h4 fw-bold mb-3">Tóm tắt đơn hàng</h2>

        <div className="list-group list-group-flush mb-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="list-group-item d-flex justify-content-between px-0"
            >
              <div>
                <div className="fw-semibold">{item.name}</div>
                <div className="text-secondary small">
                  {item.quantity} x {formatCurrency(item.price)}
                </div>
              </div>
              <span className="fw-semibold">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span className="text-secondary">Tạm tính</span>
          <span className="fw-semibold">{formatCurrency(subtotal)}</span>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <span className="text-secondary">Phí ship</span>
          <span className="fw-semibold">{formatCurrency(shippingFee)}</span>
        </div>

        <hr />

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-bold">Tổng thanh toán</span>
          <span className="fw-bold text-danger fs-5">
            {formatCurrency(totalAmount)}
          </span>
        </div>

        {submitError && (
          <div className="alert alert-danger py-2" role="alert">
            {submitError}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-warning w-100 fw-semibold"
          disabled={submitDisabled}
        >
          {isSubmitting ? "Đang xử lý..." : submitLabel}
        </button>
      </div>
    </aside>
  );
}

export default OrderSummary;
