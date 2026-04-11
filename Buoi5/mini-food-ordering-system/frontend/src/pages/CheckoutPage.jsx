import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../api/orderApi";
import { createPayment } from "../api/paymentApi";
import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSummary from "../components/checkout/OrderSummary";
import PaymentMethodSelector from "../components/payment/PaymentMethodSelector";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { saveOrderMeta } from "../utils/orderStorage";

const SHIPPING_FEE = Number(import.meta.env.VITE_SHIPPING_FEE || 15000) || 15000;
const DEMO_USER_ID = Number(import.meta.env.VITE_DEMO_USER_ID || 1) || 1;

const initialFormData = {
  customerName: "",
  phone: "",
  address: "",
  note: "",
  paymentMethod: "COD",
};

function CheckoutPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { cartItems, totalAmount, clearCart } = useCart();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingFee = cartItems.length > 0 ? SHIPPING_FEE : 0;
  const finalTotal = totalAmount + shippingFee;
  const checkoutUserId = currentUser?.id || DEMO_USER_ID;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.customerName.trim()) {
      nextErrors.customerName = "Vui lòng nhập họ tên người nhận.";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Vui lòng nhập số điện thoại.";
    }

    if (!formData.address.trim()) {
      nextErrors.address = "Vui lòng nhập địa chỉ nhận hàng.";
    }

    if (cartItems.length === 0) {
      nextErrors.cart = "Giỏ hàng đang trống, không thể checkout.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    setSubmitError("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        userId: checkoutUserId,
        items: cartItems.map((item) => ({
          foodId: item.id,
          foodName: item.name,
          price: Number(item.price),
          quantity: item.quantity,
        })),
      };

      // payment-service cần orderId, nên phải tạo order trước rồi mới tạo payment.
      const createdOrder = await createOrder(orderPayload);

      let paymentResponse = null;
      let paymentWarning = "";

      try {
        paymentResponse = await createPayment({
          orderId: createdOrder.id,
          amount: finalTotal,
          paymentMethod: formData.paymentMethod,
        });
      } catch (paymentError) {
        console.error("Cannot create payment:", paymentError);
        paymentWarning =
          "Đơn hàng đã được tạo nhưng chưa đồng bộ được payment-service. Bạn vẫn có thể xem đơn trong Orders.";
      }

      saveOrderMeta(createdOrder.id, {
        customerName: formData.customerName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        note: formData.note.trim(),
        shippingFee,
        subtotal: totalAmount,
        finalTotal,
        paymentMethod: formData.paymentMethod,
        paymentStatus: paymentResponse?.paymentStatus || "PENDING",
        transactionCode: paymentResponse?.transactionCode || "",
        paymentId: paymentResponse?.id || null,
        createdAt: createdOrder.createdAt || new Date().toISOString(),
        itemsSnapshot: cartItems.map((item) => ({
          ...item,
          subtotal: item.price * item.quantity,
        })),
      });

      clearCart();
      setFormData(initialFormData);

      navigate(`/orders/${createdOrder.id}`, {
        state: {
          successMessage: "Đặt hàng thành công.",
          warningMessage: paymentWarning,
        },
      });
    } catch (error) {
      console.error("Cannot create order:", error);
      setSubmitError(
        "Không thể tạo đơn hàng. Vui lòng kiểm tra order-service và thử lại."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <h1 className="h3 fw-bold mb-3">Chưa có món nào để checkout</h1>
            <p className="text-secondary mb-4">
              Hãy thêm món vào giỏ hàng trước khi nhập thông tin thanh toán.
            </p>
            <Link to="/foods" className="btn btn-warning fw-semibold">
              Quay lại trang món ăn
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="fw-bold mb-2">Checkout</h1>
          <p className="text-secondary mb-0">
            Xác nhận thông tin nhận hàng, chọn phương thức thanh toán và đặt đơn.
          </p>
        </div>

        <Link to="/cart" className="btn btn-outline-primary fw-semibold">
          Quay lại giỏ hàng
        </Link>
      </div>

      {errors.cart && (
        <div className="alert alert-danger" role="alert">
          {errors.cart}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-lg-7">
            <CheckoutForm
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />

            <PaymentMethodSelector
              value={formData.paymentMethod}
              onChange={handleChange}
              previewAmount={finalTotal}
              phone={formData.phone}
            />
          </div>

          <div className="col-lg-5">
            <OrderSummary
              items={cartItems}
              subtotal={totalAmount}
              shippingFee={shippingFee}
              totalAmount={finalTotal}
              submitLabel={
                formData.paymentMethod === "BANKING"
                  ? "Xác nhận thanh toán"
                  : "Xác nhận đặt hàng"
              }
              submitDisabled={isSubmitting}
              submitError={submitError}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;
