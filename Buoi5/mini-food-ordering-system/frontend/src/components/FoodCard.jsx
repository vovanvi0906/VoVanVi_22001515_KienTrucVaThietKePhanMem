import { formatCurrency } from "../utils/formatters";

function FoodCard({ food, onAddToCart }) {
  const hasImage = Boolean(food.imageUrl);

  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm">
        {hasImage ? (
          <img
            src={food.imageUrl}
            alt={food.name}
            className="card-img-top"
            style={{ height: "220px", objectFit: "cover" }}
          />
        ) : (
          <div
            className="d-flex align-items-center justify-content-center bg-light text-secondary fw-semibold"
            style={{ height: "220px" }}
          >
            No Image
          </div>
        )}

        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
            <div>
              <span className="badge text-bg-light border">ID: {food.id}</span>
              <h5 className="card-title mt-2 mb-1">{food.name}</h5>
            </div>
            {food.available === false ? (
              <span className="badge text-bg-secondary">Hết món</span>
            ) : (
              <span className="badge text-bg-success">Sẵn sàng</span>
            )}
          </div>

          <p className="card-text text-secondary flex-grow-1">
            {food.description || "Chưa có mô tả cho món ăn này."}
          </p>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <div className="small text-muted">Giá</div>
              <div className="fw-bold text-danger">{formatCurrency(food.price)}</div>
            </div>

            <button
              type="button"
              className="btn btn-warning fw-semibold"
              onClick={() => onAddToCart(food)}
              disabled={food.available === false}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
