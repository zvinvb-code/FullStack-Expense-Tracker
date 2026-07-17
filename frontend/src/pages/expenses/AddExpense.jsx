import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../../services/expenseService";
import "./ExpenseForm.css";

const AddExpense = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      await addExpense({
        ...formData,
        amount: Number(formData.amount),
      });
      navigate("/expenses");
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to add expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="expense-form-container">
      <div className="expense-form-card premium-card">
        <h1>Record Expense</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "-16px", marginBottom: "28px" }}>
          Log a new financial transaction detail.
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
              placeholder="e.g. Weekly Groceries"
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
              placeholder="0.00"
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
              placeholder="Optional notes or context..."
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
              disabled={loading}
            >
              {loading ? "Recording..." : "Record Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;