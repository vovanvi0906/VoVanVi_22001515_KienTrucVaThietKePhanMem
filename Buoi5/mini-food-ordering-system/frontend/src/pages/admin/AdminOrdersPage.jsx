import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminOrderStatusUpdate from "../../components/admin/AdminOrderStatusUpdate";
import StatusBadge from "../../components/orders/StatusBadge";
import {
  getAllOrders,
  getAllPayments,
  updateOrderStatus,
} from "../../services/adminOrderService";
import {
  formatCurrency,
  formatDateTime,
  formatPaymentMethod,
} from "../../utils/formatters";
import { getAllOrderMeta } from "../../utils/orderStorage";
import { buildOrderViewModel } from "../../utils/orderView";

function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [message, setMessage] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [statusDraftMap, setStatusDraftMap] = useState({});

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    setWarning("");

    try {
      const [orderList, payments] = await Promise.allSettled([
        getAllOrders(),
        getAllPayments(),
      ]);

      if (orderList.status !== "fulfilled") {
        throw orderList.reason;
      }

      const paymentMap = new Map();

      if (payments.status === "fulfilled") {
        payments.value.forEach((payment) => {
          paymentMap.set(String(payment.orderId), payment);
        });
      } else {
        setWarning(
          "Khong the tai payment-service. Phan payment dang hien thi theo du lieu fallback neu co."
        );
      }

      const orderMetaMap = getAllOrderMeta();
      const mergedOrders = (orderList.value || []).map((order) =>
        buildOrderViewModel({
          order,
          orderMeta: orderMetaMap[String(order.id)],
          payment: paymentMap.get(String(order.id)),
        })
      );

      setOrders(mergedOrders);
      setStatusDraftMap(
        Object.fromEntries(
          mergedOrders.map((order) => [String(order.id), order.status || "PENDING"])
        )
      );
    } catch (fetchError) {
      console.error("Cannot fetch admin orders:", fetchError);
      setError("Không thể tải danh sách đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDraftChange = (orderId, nextStatus) => {
    setStatusDraftMap((prev) => ({
      ...prev,
      [String(orderId)]: nextStatus,
    }));
  };

  const handleUpdateStatus = async (orderId) => {
    setUpdatingOrderId(orderId);
    setError("");
    setMessage("");

    try {
      await updateOrderStatus(orderId, statusDraftMap[String(orderId)]);
      setMessage("Cập nhật trạng thái đơn hàng thành công.");
      await fetchOrders();
    } catch (updateError) {
      console.error("Cannot update order status:", updateError);
      setError("Cập nhật trạng thái đơn hàng thất bại.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return (
    <section>
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Manage Orders</h2>
        <p className="text-secondary mb-0">
          Theo dõi đơn hàng và cập nhật trạng thái trực tiếp từ màn hình admin.
        </p>
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
          <p className="mt-3 text-secondary">Đang tải danh sách đơn hàng...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <h3 className="mb-3">Chưa có đơn hàng nào</h3>
            <p className="text-secondary mb-0">
              Khi người dùng tạo order, dữ liệu sẽ hiển thị tại đây.
            </p>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {orders.map((order) => (
            <div className="card border-0 shadow-sm" key={order.id}>
              <div className="card-body">
                <div className="row g-3 align-items-start">
                  <div className="col-lg-4">
                    <div className="fw-bold mb-2">Order #{order.id}</div>
                    <div className="text-secondary small">
                      Người nhận: {order.customerName || `User #${order.userId}`}
                    </div>
                    <div className="text-secondary small">
                      Ngày tạo: {formatDateTime(order.createdAt)}
                    </div>
                    <div className="text-secondary small">
                      Payment: {formatPaymentMethod(order.paymentMethod)}
                    </div>
                    <div className="text-secondary small">
                      Tổng tiền: {formatCurrency(order.finalTotal || order.totalAmount)}
                    </div>
                  </div>

                  <div className="col-lg-3">
                    <div className="d-flex flex-wrap gap-2 mb-2">
                      <StatusBadge status={order.status} />
                      <StatusBadge status={order.paymentStatus} type="payment" />
                    </div>
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="btn btn-outline-primary btn-sm fw-semibold"
                    >
                      Xem chi tiết
                    </Link>
                  </div>

                  <div className="col-lg-5">
                    <AdminOrderStatusUpdate
                      currentStatus={order.status}
                      selectedStatus={statusDraftMap[String(order.id)] || order.status}
                      onChange={(nextStatus) => handleDraftChange(order.id, nextStatus)}
                      onSubmit={() => handleUpdateStatus(order.id)}
                      isSubmitting={updatingOrderId === order.id}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminOrdersPage;
