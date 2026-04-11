import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminFoodForm from "../../components/admin/AdminFoodForm";
import { getFoodDetail, updateFood } from "../../services/adminFoodService";

function AdminFoodEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [pageError, setPageError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchFood = async () => {
      setLoading(true);
      setPageError("");

      try {
        const food = await getFoodDetail(id);
        setFormData({
          name: food.name || "",
          description: food.description || "",
          price: food.price || "",
          category: food.category || "",
          imageUrl: food.imageUrl || "",
          available: Boolean(food.available),
        });
      } catch (fetchError) {
        console.error("Cannot fetch food detail:", fetchError);
        setPageError("Không thể tải thông tin món ăn.");
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

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
      await updateFood(id, {
        ...formData,
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        category: formData.category.trim(),
        imageUrl: formData.imageUrl.trim(),
      });

      navigate("/admin/foods", {
        state: {
          successMessage: "Cập nhật món ăn thành công.",
        },
      });
    } catch (updateError) {
      console.error("Cannot update food:", updateError);
      setSubmitError("Cập nhật món ăn thất bại. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Sửa món ăn</h2>
          <p className="text-secondary mb-0">Cập nhật thông tin món ăn theo id.</p>
        </div>

        <Link to="/admin/foods" className="btn btn-outline-primary fw-semibold">
          Quay lại danh sách
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status" />
        </div>
      ) : pageError ? (
        <div className="alert alert-danger" role="alert">
          {pageError}
        </div>
      ) : (
        <AdminFoodForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel="Lưu thay đổi"
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      )}
    </section>
  );
}

export default AdminFoodEditPage;
