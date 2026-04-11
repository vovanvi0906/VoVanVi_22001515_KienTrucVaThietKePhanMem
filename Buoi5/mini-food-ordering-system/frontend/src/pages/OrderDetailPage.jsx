import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getOrderById } from "../api/orderApi";
import { getPaymentByOrderId } from "../api/paymentApi";
import StatusBadge from "../components/orders/StatusBadge";
import {
  formatCurrency,
  formatDateTime,
  formatPaymentMethod,
} from "../utils/formatters";
import { getOrderMeta } from "../utils/orderStorage";
import { buildOrderViewModel } from "../utils/orderView";

function OrderDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  useEffect(() => {
    const fetchOrderDetail = async () => {
      setLoading(true);
      setError("");
      setWarning("");

      try {
        const orderResponse = await getOrderById(id);
        const orderMeta = getOrderMeta(id);

        let paymentResponse = null;

        try {
          paymentResponse = await getPaymentByOrderId(id);
        } catch (paymentError) {
          console.error("Cannot fetch payment by order id:", paymentError);
          setWarning(
            "Không lấy được thông tin payment-service. Đang hiển thị dữ liệu dự phòng nếu có."
          );
        }

        setOrder(
          buildOrderViewModel({
            order: orderResponse,
            orderMeta,
            payment: paymentResponse,
          })
        );
      } catch (fetchError) {
        console.error("Cannot fetch order detail:", fetchError);
        setError(
          "Không thể tải chi tiết đơn hàng. Vui lòng kiểm tra order-service và thử lại."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="fw-bold mb-2">Chi tiết đơn hàng</h1>
          <p className="text-secondary mb-0">
            Xem toàn bộ thông tin checkout, payment và danh sách món đã đặt.
          </p>
        </div>

        <div className="d-flex gap-2">
          <Link to="/orders" className="btn btn-outline-primary fw-semibold">
            Quay lại orders
          </Link>
          <Link to="/foods" className="btn btn-warning fw-semibold">
            Chọn thêm món
          </Link>
        </div>
      </div>

      {location.state?.successMessage && (
        <div className="alert alert-success" role="alert">
          {location.state.successMessage}
        </div>
      )}

      {(location.state?.warningMessage || warning) && (
        <div className="alert alert-warning" role="alert">
          {location.state?.warningMessage || warning}
        </div>
      )}

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status" />
          <p className="mt-3 text-secondary">Đang tải chi tiết đơn hàng...</p>
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && order && (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
                  <div>
                    <div className="text-secondary small">Mã đơn hàng</div>
                    <h2 className="h4 fw-bold mb-0">#{order.id}</h2>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <StatusBadge status={order.status} />
                    <StatusBadge status={order.paymentStatus} type="payment" />
                  </div>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="text-secondary small">Ngày tạo</div>
                    <div className="fw-semibold">{formatDateTime(order.createdAt)}</div>
                  </div>
                  <div className="col-md-6">
                    <div className="text-secondary small">Phương thức thanh toán</div>
                    <div className="fw-semibold">
                      {formatPaymentMethod(order.paymentMethod)}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="text-secondary small">Người nhận</div>
                    <div className="fw-semibold">{order.customerName}</div>
                  </div>
                  <div className="col-md-6">
                    <div className="text-secondary small">Số điện thoại</div>
                    <div className="fw-semibold">{order.phone}</div>
                  </div>
                  <div className="col-12">
                    <div className="text-secondary small">Địa chỉ nhận hàng</div>
                    <div className="fw-semibold">{order.address}</div>
                  </div>
                  <div className="col-12">
                    <div className="text-secondary small">Ghi chú</div>
                    <div className="fw-semibold">
                      {order.note || "Không có ghi chú."}
                    </div>
                  </div>
                  {order.transactionCode && (
                    <div className="col-12">
                      <div className="text-secondary small">Mã giao dịch</div>
                      <div className="fw-semibold">{order.transactionCode}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h2 className="h4 fw-bold mb-3">Danh sách món đã đặt</h2>

                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Món ăn</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={item.id || `${item.foodId}-${index}`}>
                          <td>
                            <div className="fw-semibold">
                              {item.foodName || item.name}
                            </div>
                            <div className="text-secondary small">
                              Mã món: {item.foodId || item.id}
                            </div>
                          </td>
                          <td>{item.quantity}</td>
                          <td>{formatCurrency(item.price)}</td>
                          <td className="fw-semibold">
                            {formatCurrency(item.subtotal || item.price * item.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h2 className="h4 fw-bold mb-4">Tổng kết thanh toán</h2>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-secondary">Tạm tính</span>
                  <span className="fw-semibold">{formatCurrency(order.subtotal)}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-secondary">Phí ship</span>
                  <span className="fw-semibold">
                    {formatCurrency(order.shippingFee)}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-secondary">Phương thức thanh toán</span>
                  <span className="fw-semibold">
                    {formatPaymentMethod(order.paymentMethod)}
                  </span>
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">Tổng cộng</span>
                  <span className="fw-bold text-danger fs-5">
                    {formatCurrency(order.finalTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetailPage;
