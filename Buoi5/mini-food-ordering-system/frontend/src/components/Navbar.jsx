import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const getNavClassName = ({ isActive }) =>
  `nav-link fw-semibold px-3 py-2 rounded-pill ${isActive ? "active bg-warning text-dark" : "text-white"}`;

function Navbar() {
  const { totalQuantity } = useCart();
  const { currentUser, isAdmin, isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
      <div className="container py-2">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 w-100">
          <div className="d-flex justify-content-between align-items-center w-100">
            <NavLink to="/foods" className="navbar-brand fw-bold text-warning">
              Mini Food App
            </NavLink>

            <NavLink
              to="/cart"
              className="btn btn-warning position-relative fw-semibold d-lg-none"
            >
              Gio hang
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalQuantity}
              </span>
            </NavLink>
          </div>

          <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
            <div className="navbar-nav flex-row flex-wrap gap-2">
              <NavLink to="/foods" className={getNavClassName}>
                Mon an
              </NavLink>
              <NavLink to="/cart" className={getNavClassName}>
                Gio hang
              </NavLink>
              <NavLink to="/checkout" className={getNavClassName}>
                Checkout
              </NavLink>
              <NavLink to="/orders" className={getNavClassName}>
                Orders
              </NavLink>
              {isAdmin && (
                <NavLink to="/admin/foods" className={getNavClassName}>
                  Admin
                </NavLink>
              )}
            </div>

            <div className="d-flex align-items-center gap-2 flex-wrap">
              {isAuthenticated ? (
                <>
                  <div className="text-white small">
                    Xin chao{" "}
                    <span className="fw-semibold">
                      {currentUser?.fullName || currentUser?.username}
                    </span>
                    {currentUser?.role && (
                      <span className="badge text-bg-light ms-2">
                        {currentUser.role}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-light btn-sm fw-semibold"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="btn btn-outline-light btn-sm fw-semibold">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="btn btn-warning btn-sm fw-semibold">
                    Register
                  </NavLink>
                </>
              )}

              <NavLink
                to="/cart"
                className="btn btn-warning position-relative fw-semibold d-none d-lg-inline-flex"
              >
                Gio hang
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalQuantity}
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
