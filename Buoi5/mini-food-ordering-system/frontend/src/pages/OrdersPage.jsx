import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../api/orderApi";
import { getPayments } from "../api/paymentApi";
import StatusBadge from "../components/orders/StatusBadge";
import { useAuth } from "../context/AuthContext";
import {
  formatCurrency,
  formatDateTime,
  formatPaymentMethod,
} from "../utils/formatters";
import { getAllOrderMeta } from "../utils/orderStorage";
import { buildOrderViewModel } from "../utils/orderView";

const DEMO_USER_ID = Number(import.meta.env.VITE_DEMO_USER_ID || 1) || 1;

function OrdersPage() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      setWarning("");

      try {
        const [ordersResult, paymentsResult] = await Promise.allSettled([
          getOrders(),
          getPayments(),
        ]);

        if (ordersResult.status !== "fulfilled") {
          throw ordersResult.reason;
        }

        const orderMetaMap = getAllOrderMeta();
        const paymentsMap = new Map();

        if (paymentsResult.status === "fulfilled") {
          paymentsResult.value.forEach((payment) => {
            paymentsMap.set(String(payment.orderId), payment);
          });
        } else {
          console.error("Cannot fetch payments:", paymentsResult.reason);
          setWarning(
            "Không thể tải payment-service. Danh sách đang dùng dữ liệu dự phòng từ localStorage."
          );
        }

        const userOrders = (ordersResult.value || [])
          .filter((order) => Number(order.userId) === Number(currentUser?.id || DEMO_USER_ID))
          .map((order) =>
            buildOrderViewModel({
              order,
              orderMeta: orderMetaMap[String(order.id)],
              payment: paymentsMap.get(String(order.id)),
            })
          );

        setOrders(userOrders);
      } catch (fetchError) {
        console.error("Cannot fetch orders:", fetchError);
        setError(
          "Không thể tải danh sách đơn hàng. Vui lòng kiểm tra order-service và thử lại."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="fw-bold mb-2">Orders</h1>
          <p className="text-secondary mb-0">
            Theo dõi các đơn hàng bạn đã tạo trong quá trình demo.
          </p>
        </div>

        <Link to="/foods" className="btn btn-outline-primary fw-semibold">
          Tiếp tục chọn món
        </Link>
      </div>

      {warning && (
        <div className="alert alert-warning" role="alert">
          {warning}
        </div>
      )}

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status" />
          <p className="mt-3 text-secondary">Đang tải danh sách đơn hàng...</p>
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <h3 className="mb-3">Chưa có đơn hàng nào</h3>
            <p className="text-secondary mb-4">
              Hãy chọn món, vào checkout và đặt thử một đơn để xem dữ liệu tại đây.
            </p>
            <Link to="/foods" className="btn btn-warning fw-semibold">
              Đi tới danh sách món ăn
            </Link>
          </div>
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Mã đơn</th>
                  <th>Người nhận</th>
                  <th>Ngày tạo</th>
                  <th>Tổng tiền</th>
                  <th>Thanh toán</th>
                  <th>Trạng thái payment</th>
                  <th>Trạng thái đơn</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="fw-semibold">#{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{formatDateTime(order.createdAt)}</td>
                    <td className="fw-semibold text-danger">
                      {formatCurrency(order.finalTotal)}
                    </td>
                    <td>{formatPaymentMethod(order.paymentMethod)}</td>
                    <td>
                      <StatusBadge status={order.paymentStatus} type="payment" />
                    </td>
                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="text-end">
                      <Link
                        to={`/orders/${order.id}`}
                        className="btn btn-sm btn-outline-primary fw-semibold"
                      >
                        Xem chi tiết
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
