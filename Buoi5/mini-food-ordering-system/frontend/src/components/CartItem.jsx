import { formatCurrency } from "../utils/formatters";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const itemTotal = item.price * item.quantity;

  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body">
        <div className="row align-items-center g-3">
          <div className="col-md-2 col-4">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="img-fluid rounded"
                style={{ height: "100px", width: "100%", objectFit: "cover" }}
              />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center bg-light rounded text-secondary fw-semibold"
                style={{ height: "100px" }}
              >
                No Image
              </div>
            )}
          </div>

          <div className="col-md-4 col-8">
            <h5 className="mb-2">{item.name}</h5>
            <div className="text-secondary">Đơn giá: {formatCurrency(item.price)}</div>
            <div className="text-secondary">Mã món: {item.id}</div>
          </div>

          <div className="col-md-3">
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => onDecrease(item.id)}
              >
                -
              </button>
              <span className="fw-semibold px-2">{item.quantity}</span>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => onIncrease(item.id)}
              >
                +
              </button>
            </div>
          </div>

          <div className="col-md-2">
            <div className="fw-bold text-danger">{formatCurrency(itemTotal)}</div>
          </div>

          <div className="col-md-1 text-md-end">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => onRemove(item.id)}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
