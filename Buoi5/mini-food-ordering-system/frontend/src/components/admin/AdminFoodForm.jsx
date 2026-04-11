const defaultFoodForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  imageUrl: "",
  available: true,
};

function AdminFoodForm({
  formData = defaultFoodForm,
  errors = {},
  onChange,
  onSubmit,
  submitLabel = "Save",
  isSubmitting = false,
  submitError = "",
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold" htmlFor="name">
                Tên món
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={formData.name}
                onChange={onChange}
                placeholder="Nhập tên món"
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold" htmlFor="price">
                Giá
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                className={`form-control ${errors.price ? "is-invalid" : ""}`}
                value={formData.price}
                onChange={onChange}
                placeholder="Nhập giá món"
              />
              {errors.price && <div className="invalid-feedback">{errors.price}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold" htmlFor="category">
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                className={`form-control ${errors.category ? "is-invalid" : ""}`}
                value={formData.category}
                onChange={onChange}
                placeholder="Ví dụ: Rice, Drink, Fast Food"
              />
              {errors.category && (
                <div className="invalid-feedback">{errors.category}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold" htmlFor="available">
                Trạng thái
              </label>
              <select
                id="available"
                name="available"
                className="form-select"
                value={String(formData.available)}
                onChange={onChange}
              >
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold" htmlFor="imageUrl">
                Image URL
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="text"
                className="form-control"
                value={formData.imageUrl}
                onChange={onChange}
                placeholder="https://example.com/food.jpg"
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold" htmlFor="description">
                Mô tả
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="form-control"
                value={formData.description}
                onChange={onChange}
                placeholder="Nhập mô tả ngắn cho món ăn"
              />
            </div>
          </div>

          {submitError && (
            <div className="alert alert-danger mt-4 mb-0" role="alert">
              {submitError}
            </div>
          )}

          <div className="d-flex justify-content-end mt-4">
            <button
              type="submit"
              className="btn btn-warning fw-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang xử lý..." : submitLabel}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AdminFoodForm;
