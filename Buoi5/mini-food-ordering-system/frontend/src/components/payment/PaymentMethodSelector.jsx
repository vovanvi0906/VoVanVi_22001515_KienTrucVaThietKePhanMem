import { formatCurrency } from "../../utils/formatters";

const PAYMENT_OPTIONS = [
  {
    value: "COD",
    title: "Thanh toán khi nhận hàng (COD)",
    description: "Đơn hàng sẽ được xác nhận, thanh toán khi shipper giao tới.",
  },
  {
    value: "BANKING",
    title: "Chuyển khoản ngân hàng",
    description: "Mô phỏng thanh toán online. Hệ thống sẽ đánh dấu đã thanh toán.",
  },
];

function PaymentMethodSelector({ value, onChange, previewAmount, phone }) {
  const transferContent = `MINIFOOD-${phone || "SDT"}`;

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h2 className="h4 fw-bold mb-3">Phương thức thanh toán</h2>

        <div className="row g-3">
          {PAYMENT_OPTIONS.map((option) => (
            <div className="col-md-6" key={option.value}>
              <label
                className={`card h-100 border ${value === option.value ? "border-warning border-2" : "border-light"}`}
              >
                <div className="card-body">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id={option.value}
                      value={option.value}
                      checked={value === option.value}
                      onChange={onChange}
                    />
                    <span className="form-check-label fw-semibold ms-2">
                      {option.title}
                    </span>
                  </div>
                  <p className="text-secondary mt-3 mb-0">{option.description}</p>
                </div>
              </label>
            </div>
          ))}
        </div>

        {value === "BANKING" && (
          <div className="alert alert-info mt-4 mb-0">
            <h3 className="h6 fw-bold">Thông tin chuyển khoản giả lập</h3>
            <div>Ngân hàng: Demo Bank</div>
            <div>Số tài khoản: 123456789</div>
            <div>Chủ tài khoản: MINI FOOD ORDERING</div>
            <div>Nội dung chuyển khoản: {transferContent}</div>
            <div>Số tiền mẫu: {formatCurrency(previewAmount)}</div>
          </div>
        )}
      </div>
    </section>
  );
}

export default PaymentMethodSelector;
