import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUserRequest } from "../services/authService";

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    password: "",
    role: "USER",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setMessage("");
    setIsSubmitting(true);

    try {
      await registerUserRequest({
        username: formData.username.trim(),
        fullName: formData.fullName.trim(),
        password: formData.password,
        role: formData.role,
      });

      setMessage("Đăng ký thành công. Bạn có thể đăng nhập ngay.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (registerError) {
      console.error("Cannot register user:", registerError);
      setError("Đăng ký thất bại. Username có thể đã tồn tại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h1 className="fw-bold mb-2">Register</h1>
              <p className="text-secondary mb-4">
                Form đăng ký được căn chỉnh theo backend hiện tại của user-service.
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
                  <label className="form-label fw-semibold" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="form-control"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên"
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

                <div>
                  <label className="form-label fw-semibold" htmlFor="role">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>

                {message && (
                  <div className="alert alert-success py-2 mb-0" role="alert">
                    {message}
                  </div>
                )}

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
                  {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
                </button>
              </form>

              <p className="text-secondary mt-4 mb-0">
                Đã có tài khoản?{" "}
                <Link to="/login" className="fw-semibold text-decoration-none">
                  Đăng nhập
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
