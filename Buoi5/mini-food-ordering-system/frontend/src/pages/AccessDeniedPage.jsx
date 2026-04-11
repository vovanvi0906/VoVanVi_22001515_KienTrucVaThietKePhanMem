import { Link } from "react-router-dom";

function AccessDeniedPage() {
  return (
    <div className="container">
      <div className="card border-0 shadow-sm">
        <div className="card-body text-center py-5">
          <h1 className="h3 fw-bold mb-3">Access Denied</h1>
          <p className="text-secondary mb-4">
            Bạn không có quyền truy cập khu vực quản trị.
          </p>
          <Link to="/foods" className="btn btn-warning fw-semibold">
            Quay lại trang món ăn
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccessDeniedPage;
