import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const getNavClassName = ({ isActive }) =>
  `list-group-item list-group-item-action fw-semibold ${isActive ? "active" : ""}`;

function AdminLayout() {
  const { currentUser } = useAuth();

  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="fw-bold mb-1">Admin Dashboard</h1>
          <p className="text-secondary mb-0">
            Quản lý món ăn và đơn hàng cho Mini Food Ordering System.
          </p>
        </div>

        <div className="text-secondary">
          Admin hiện tại: <span className="fw-semibold">{currentUser?.fullName || currentUser?.username}</span>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h5 fw-bold mb-3">Điều hướng</h2>

              <div className="list-group">
                <NavLink to="/admin/foods" className={getNavClassName} end>
                  Manage Foods
                </NavLink>
                <NavLink to="/admin/foods/new" className={getNavClassName}>
                  Add New Food
                </NavLink>
                <NavLink to="/admin/orders" className={getNavClassName}>
                  Manage Orders
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
