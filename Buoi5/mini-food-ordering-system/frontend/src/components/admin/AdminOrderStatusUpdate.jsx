const ORDER_STATUS_OPTIONS = [
  "PENDING",
  "CONFIRMED",
  "PAID",
  "CANCELLED",
];

function AdminOrderStatusUpdate({
  currentStatus,
  selectedStatus,
  onChange,
  onSubmit,
  isSubmitting = false,
}) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h3 className="h5 fw-bold mb-3">Cập nhật trạng thái đơn hàng</h3>
        <p className="text-secondary mb-3">
          Trạng thái hiện tại: <span className="fw-semibold">{currentStatus}</span>
        </p>

        <div className="d-flex flex-column flex-md-row gap-2">
          <select
            className="form-select"
            value={selectedStatus}
            onChange={(event) => onChange(event.target.value)}
          >
            {ORDER_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="btn btn-primary fw-semibold"
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderStatusUpdate;
