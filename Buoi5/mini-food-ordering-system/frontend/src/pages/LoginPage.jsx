import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUserRequest } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectPath = location.state?.from || "/foods";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const user = await loginUserRequest({
        username: formData.username.trim(),
        password: formData.password,
      });

      login(user);
      navigate(redirectPath, { replace: true });
    } catch (loginError) {
      console.error("Cannot login user:", loginError);
      setError("Đăng nhập thất bại. Vui lòng kiểm tra username hoặc password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h1 className="fw-bold mb-2">Login</h1>
              <p className="text-secondary mb-4">
                Đăng nhập để lưu user role và truy cập admin route nếu là ADMIN.
              </p>

              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div>
                  <label className="form-label fw-semibold" htmlFor="username">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Nhập username"
                    required
                  />
                </div>

                <div>
                  <label className="form-label fw-semibold" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Nhập password"
                    required
                  />
                </div>

                {error && (
                  <div className="alert alert-danger py-2 mb-0" role="alert">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-warning fw-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
              </form>

              <p className="text-secondary mt-4 mb-0">
                Chưa có tài khoản?{" "}
                <Link to="/register" className="fw-semibold text-decoration-none">
                  Tạo tài khoản
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
