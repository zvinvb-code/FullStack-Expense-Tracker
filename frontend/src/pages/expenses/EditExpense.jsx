import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getExpenseById,
  updateExpense,
} from "../../services/expenseService";
import "./ExpenseForm.css";

const EditExpense = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const categories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Education",
    "Others",
  ];

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        setLoading(true);
        const data = await getExpenseById(id);
        setFormData({
          title: data.title || "",
          amount: data.amount || "",
          category: data.category || "",
          description: data.description || "",
          date: data.date ? data.date.split("T")[0] : "",
        });
      } catch (error) {
        console.error(error);
        alert(error.message || "Unable to load expense.");
        navigate("/expenses");
      } finally {
        setLoading(false);
      }
    };

    fetchExpense();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.amount ||
      !formData.category ||
      !formData.date
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true);
      await updateExpense(id, {
        ...formData,
        amount: Number(formData.amount),
      });
      navigate("/expenses");
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to update expense.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="expense-loading" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 120px)", color: "var(--text-secondary)", fontSize: "15px" }}>
        Loading Expense Details...
      </div>
    );
  }

  return (
    <div className="expense-form-container">
      <div className="expense-form-card premium-card">
        <h1>Edit Expense</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "-16px", marginBottom: "28px" }}>
          Modify the transaction details below.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Expense title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount (₹) *</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter Amount"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write description..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="button-group">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/expenses")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={saving}
            >
              {saving ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpense;