function CheckoutForm({ formData, errors, onChange }) {
  return (
    <section className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        <h2 className="h4 fw-bold mb-3">Thông tin nhận hàng</h2>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold" htmlFor="customerName">
              Họ tên người nhận
            </label>
            <input
              id="customerName"
              name="customerName"
              type="text"
              className={`form-control ${errors.customerName ? "is-invalid" : ""}`}
              value={formData.customerName}
              onChange={onChange}
              placeholder="Nhập họ tên"
            />
            {errors.customerName && (
              <div className="invalid-feedback">{errors.customerName}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold" htmlFor="phone">
              Số điện thoại
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              value={formData.phone}
              onChange={onChange}
              placeholder="Nhập số điện thoại"
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold" htmlFor="address">
              Địa chỉ nhận hàng
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              value={formData.address}
              onChange={onChange}
              placeholder="Nhập địa chỉ nhận hàng"
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
          </div>

          <div className="col-12">
            <label className="form-label fw-semibold" htmlFor="note">
              Ghi chú
            </label>
            <textarea
              id="note"
              name="note"
              rows="3"
              className="form-control"
              value={formData.note}
              onChange={onChange}
              placeholder="Ví dụ: giao giờ trưa, gọi trước khi giao..."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckoutForm;
