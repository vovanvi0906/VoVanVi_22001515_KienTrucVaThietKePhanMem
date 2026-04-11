import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatters";

function CartPage() {
  const {
    cartItems,
    totalQuantity,
    totalAmount,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="fw-bold mb-2">Giỏ hàng</h1>
          <p className="text-secondary mb-0">
            Quản lý số lượng món ăn trước khi chuyển sang bước checkout.
          </p>
        </div>

        <div className="d-flex gap-2">
          <Link to="/foods" className="btn btn-outline-primary fw-semibold">
            Tiếp tục chọn món
          </Link>
          {cartItems.length > 0 && (
            <Link to="/checkout" className="btn btn-warning fw-semibold">
              Đi đến checkout
            </Link>
          )}
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <h3 className="mb-3">Giỏ hàng của bạn đang trống</h3>
            <p className="text-secondary mb-4">
              Hãy quay lại trang món ăn và thêm vài món để bắt đầu.
            </p>
            <Link to="/foods" className="btn btn-warning fw-semibold">
              Đi tới danh sách món ăn
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h4 className="fw-bold mb-4">Tóm tắt giỏ hàng</h4>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-secondary">Tổng số lượng món</span>
                  <span className="fw-semibold">{totalQuantity}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span className="text-secondary">Tạm tính</span>
                  <span className="fw-semibold">{formatCurrency(totalAmount)}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="fw-bold">Tổng tiền</span>
                  <span className="fw-bold text-danger fs-5">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="btn btn-warning w-100 fw-semibold mb-2"
                >
                  Tiếp tục đến checkout
                </Link>

                <button
                  type="button"
                  className="btn btn-outline-danger w-100 fw-semibold"
                  onClick={clearCart}
                >
                  Xóa toàn bộ giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
