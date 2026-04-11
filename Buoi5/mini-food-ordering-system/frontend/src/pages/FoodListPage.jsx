import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFoods } from "../api/foodApi";
import FoodCard from "../components/FoodCard";
import { useCart } from "../context/CartContext";

function FoodListPage() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart, totalQuantity } = useCart();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getFoods();
        setFoods(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Cannot fetch foods:", err);
        setError("Không thể tải danh sách món ăn. Vui lòng kiểm tra API hoặc thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="fw-bold mb-2">Danh sách món ăn</h1>
          <p className="text-secondary mb-0">
            Chọn món ăn bạn muốn thêm vào giỏ hàng.
          </p>
        </div>

        <div className="d-flex gap-2">
          <Link to="/cart" className="btn btn-outline-primary fw-semibold">
            Xem giỏ hàng
          </Link>
          {totalQuantity > 0 && (
            <Link to="/checkout" className="btn btn-warning fw-semibold">
              Checkout ngay
            </Link>
          )}
        </div>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status" />
          <p className="mt-3 text-secondary">Đang tải danh sách món ăn...</p>
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && foods.length === 0 && (
        <div className="alert alert-info" role="alert">
          Hiện chưa có món ăn nào để hiển thị.
        </div>
      )}

      {!loading && !error && foods.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} onAddToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FoodListPage;
