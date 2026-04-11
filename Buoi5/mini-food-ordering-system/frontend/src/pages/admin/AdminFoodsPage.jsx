import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  deleteFood,
  getAllFoods,
} from "../../services/adminFoodService";
import { formatCurrency } from "../../utils/formatters";

function AdminFoodsPage() {
  const location = useLocation();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchFoods = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAllFoods();
      setFoods(Array.isArray(data) ? data : []);
    } catch (fetchError) {
      console.error("Cannot fetch admin foods:", fetchError);
      setError("Không thể tải danh sách món ăn.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  useEffect(() => {
    if (location.state?.successMessage) {
      setMessage(location.state.successMessage);
    }
  }, [location.state]);

  const handleDelete = async (foodId, foodName) => {
    const isConfirmed = window.confirm(`Bạn có chắc muốn xóa món "${foodName}"?`);

    if (!isConfirmed) {
      return;
    }

    try {
      await deleteFood(foodId);
      setMessage("Xóa món ăn thành công.");
      await fetchFoods();
    } catch (deleteError) {
      console.error("Cannot delete food:", deleteError);
      setError("Xóa món ăn thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <section>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Manage Foods</h2>
          <p className="text-secondary mb-0">
            Xem, thêm, sửa và xóa món ăn trong hệ thống.
          </p>
        </div>

        <Link to="/admin/foods/new" className="btn btn-warning fw-semibold">
          Thêm món mới
        </Link>
      </div>

      {message && (
        <div className="alert alert-success" role="alert">
          {message}
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
          <p className="mt-3 text-secondary">Đang tải danh sách món ăn...</p>
        </div>
      ) : foods.length === 0 ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <h3 className="mb-3">Chưa có món ăn nào</h3>
            <Link to="/admin/foods/new" className="btn btn-warning fw-semibold">
              Tạo món đầu tiên
            </Link>
          </div>
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Hình ảnh</th>
                  <th>Tên món</th>
                  <th>Mô tả</th>
                  <th>Giá</th>
                  <th>Category</th>
                  <th>Trạng thái</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {foods.map((food) => (
                  <tr key={food.id}>
                    <td>{food.id}</td>
                    <td>
                      {food.imageUrl ? (
                        <img
                          src={food.imageUrl}
                          alt={food.name}
                          style={{
                            width: "64px",
                            height: "64px",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                      ) : (
                        <span className="text-secondary">No image</span>
                      )}
                    </td>
                    <td className="fw-semibold">{food.name}</td>
                    <td className="text-secondary">{food.description || "-"}</td>
                    <td>{formatCurrency(food.price)}</td>
                    <td>{food.category || "-"}</td>
                    <td>
                      <span
                        className={`badge text-bg-${food.available ? "success" : "secondary"}`}
                      >
                        {food.available ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <Link
                          to={`/admin/foods/${food.id}/edit`}
                          className="btn btn-sm btn-outline-primary fw-semibold"
                        >
                          Sửa
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger fw-semibold"
                          onClick={() => handleDelete(food.id, food.name)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminFoodsPage;
