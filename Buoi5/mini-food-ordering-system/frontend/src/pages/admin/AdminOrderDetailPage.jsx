import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AdminOrderStatusUpdate from "../../components/admin/AdminOrderStatusUpdate";
import StatusBadge from "../../components/orders/StatusBadge";
import {
  getOrderDetail,
  getOrderPayment,
  updateOrderStatus,
} from "../../services/adminOrderService";
import {
  formatCurrency,
  formatDateTime,
  formatPaymentMethod,
} from "../../utils/formatters";
import { getOrderMeta } from "../../utils/orderStorage";
import { buildOrderViewModel } from "../../utils/orderView";

function AdminOrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [message, setMessage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("PENDING");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchOrderDetail = async () => {
    setLoading(true);
    setError("");
    setWarning("");

    try {
      const orderData = await getOrderDetail(id);
      const orderMeta = getOrderMeta(id);

      let payment = null;

      try {
        payment = await getOrderPayment(id);
      } catch (paymentError) {
        console.error("Cannot fetch admin payment detail:", paymentError);
        setWarning(
          "Khong the tai payment-service. Chi tiet payment dang dung du lieu fallback neu co."
        );
      }

      const mergedOrder = buildOrderViewModel({
        order: orderData,
        orderMeta,
        payment,
      });

      setOrder(mergedOrder);
      setSelectedStatus(mergedOrder.status || "PENDING");
    } catch (fetchError) {
      console.error("Cannot fetch admin order detail:", fetchError);
      setError("Không thể tải chi tiết đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  const handleUpdateStatus = async () => {
    setIsSubmitting(true);
    setError("");
    setMessage("");

    try {
      await updateOrderStatus(id, selectedStatus);
      setMessage("Cập nhật trạng thái đơn hàng thành công.");
      await fetchOrderDetail();
    } catch (updateError) {
      console.error("Cannot update admin order detail status:", updateError);
      setError("Cập nhật trạng thái đơn hàng thất bại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Chi tiết đơn hàng admin</h2>
          <p className="text-secondary mb-0">
            Xem chi tiết đơn hàng và cập nhật trạng thái ngay tại đây.
          </p>
        </div>

        <Link to="/admin/orders" className="btn btn-outline-primary fw-semibold">
          Quay lại danh sách
        </Link>
      </div>

      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}

      {warning && (
        <div className="alert alert-warning" role="alert">
          {warning}
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status" />
        </div>
      ) : !order ? null : (
        <div className="d-flex flex-column gap-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
                <div>
                  <h3 className="h4 fw-bold mb-1">Order #{order.id}</h3>
                  <div className="text-secondary small">
                    Ngày tạo: {formatDateTime(order.createdAt)}
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-2">
                  <StatusBadge status={order.status} />
                  <StatusBadge status={order.paymentStatus} type="payment" />
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="text-secondary small">User ID</div>
                  <div className="fw-semibold">{order.userId}</div>
                </div>
                <div className="col-md-6">
                  <div className="text-secondary small">Người nhận</div>
                  <div className="fw-semibold">
                    {order.customerName || `User #${order.userId}`}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="text-secondary small">Số điện thoại</div>
                  <div className="fw-semibold">{order.phone || "-"}</div>
                </div>
                <div className="col-md-6">
                  <div className="text-secondary small">Phương thức thanh toán</div>
                  <div className="fw-semibold">
                    {formatPaymentMethod(order.paymentMethod)}
                  </div>
                </div>
                <div className="col-12">
                  <div className="text-secondary small">Địa chỉ</div>
                  <div className="fw-semibold">{order.address || "-"}</div>
                </div>
                <div className="col-12">
                  <div className="text-secondary small">Ghi chú</div>
                  <div className="fw-semibold">{order.note || "-"}</div>
                </div>
              </div>
            </div>
          </div>

          <AdminOrderStatusUpdate
            currentStatus={order.status}
            selectedStatus={selectedStatus}
            onChange={setSelectedStatus}
            onSubmit={handleUpdateStatus}
            isSubmitting={isSubmitting}
          />

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h3 className="h5 fw-bold mb-3">Danh sách món trong đơn</h3>

              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Món</th>
                      <th>Số lượng</th>
                      <th>Đơn giá</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={item.id || `${item.foodId}-${index}`}>
                        <td>
                          <div className="fw-semibold">{item.foodName || item.name}</div>
                          <div className="text-secondary small">
                            Food ID: {item.foodId || item.id}
                          </div>
                        </td>
                        <td>{item.quantity}</td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>
                          {formatCurrency(item.subtotal || item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="row g-3 mt-3">
                <div className="col-md-4">
                  <div className="card bg-light border-0">
                    <div className="card-body">
                      <div className="text-secondary small">Tạm tính</div>
                      <div className="fw-bold">{formatCurrency(order.subtotal)}</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-light border-0">
                    <div className="card-body">
                      <div className="text-secondary small">Phí ship</div>
                      <div className="fw-bold">{formatCurrency(order.shippingFee)}</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-light border-0">
                    <div className="card-body">
                      <div className="text-secondary small">Tổng cộng</div>
                      <div className="fw-bold text-danger">
                        {formatCurrency(order.finalTotal || order.totalAmount)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminOrderDetailPage;
