import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminFoodForm from "../../components/admin/AdminFoodForm";
import { createFood } from "../../services/adminFoodService";

const initialFormData = {
  name: "",
  description: "",
  price: "",
  category: "",
  imageUrl: "",
  available: true,
};

function AdminFoodCreatePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === "available" ? value === "true" : value;

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Tên món không được để trống.";
    }

    if (!formData.category.trim()) {
      nextErrors.category = "Category không được để trống.";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      nextErrors.price = "Giá món phải lớn hơn 0.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    setSubmitError("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createFood({
        ...formData,
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        category: formData.category.trim(),
        imageUrl: formData.imageUrl.trim(),
      });

      navigate("/admin/foods", {
        state: {
          successMessage: "Tạo món ăn thành công.",
        },
      });
    } catch (createError) {
      console.error("Cannot create food:", createError);
      setSubmitError("Tạo món ăn thất bại. Vui lòng kiểm tra dữ liệu và thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Thêm món ăn</h2>
          <p className="text-secondary mb-0">Nhập thông tin món ăn mới cho hệ thống.</p>
        </div>

        <Link to="/admin/foods" className="btn btn-outline-primary fw-semibold">
          Quay lại danh sách
        </Link>
      </div>

      <AdminFoodForm
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Tạo món ăn"
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    </section>
  );
}

export default AdminFoodCreatePage;
