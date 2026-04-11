import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import FoodListPage from "../pages/FoodListPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import OrderDetailPage from "../pages/OrderDetailPage";
import OrdersPage from "../pages/OrdersPage";
import RegisterPage from "../pages/RegisterPage";
import AccessDeniedPage from "../pages/AccessDeniedPage";
import AdminFoodCreatePage from "../pages/admin/AdminFoodCreatePage";
import AdminFoodEditPage from "../pages/admin/AdminFoodEditPage";
import AdminFoodsPage from "../pages/admin/AdminFoodsPage";
import AdminOrderDetailPage from "../pages/admin/AdminOrderDetailPage";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage";
import AdminRoute from "./AdminRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/foods" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/foods" element={<FoodListPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/:id" element={<OrderDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/access-denied" element={<AccessDeniedPage />} />

      <Route path="/admin" element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/foods" replace />} />
          <Route path="foods" element={<AdminFoodsPage />} />
          <Route path="foods/new" element={<AdminFoodCreatePage />} />
          <Route path="foods/:id/edit" element={<AdminFoodEditPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="orders/:id" element={<AdminOrderDetailPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/foods" replace />} />
    </Routes>
  );
}

export default AppRoutes;
