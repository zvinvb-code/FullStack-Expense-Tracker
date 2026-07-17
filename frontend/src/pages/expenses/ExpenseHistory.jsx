import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Edit2, Trash2, SlidersHorizontal } from "lucide-react";
import { getExpenses, deleteExpense } from "../../services/expenseService";
import "./ExpenseHistory.css";

const ExpenseHistory = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses();
      // Handle array or object structure
      const list = Array.isArray(data) ? data : data?.expenses || [];
      setExpenses(list);
      setFilteredExpenses(list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const categories = useMemo(() => {
    const list = expenses.map((item) => item.category);
    return ["All", ...new Set(list)];
  }, [expenses]);

  useEffect(() => {
    let result = [...expenses];

    if (search.trim() !== "") {
      result = result.filter((expense) =>
        expense.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      result = result.filter((expense) => expense.category === category);
    }

    setFilteredExpenses(result);
  }, [search, category, expenses]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this expense?");
    if (!confirmDelete) return;

    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (error) {
      console.error(error);
      alert("Unable to delete expense.");
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 120px)", color: "var(--text-secondary)", fontSize: "15px" }}>
        Loading expenses...
      </div>
    );
  }

  return (
    <div className="expense-page">
      <div className="expense-header">
        <div>
          <h1>Transactions</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px", fontFamily: "var(--font-secondary)" }}>
            Review and manage all recorded items.
          </p>
        </div>
        <button className="btn-primary" onClick={() => navigate("/expenses/add")}>
          <Plus size={16} /> Add Expense
        </button>
      </div>

      {/* Filter and search block */}
      <div className="expense-filters">
        <div className="search-box">
          <Search size={16} strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <SlidersHorizontal size={16} strokeWidth={1.5} />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            {categories.filter(cat => cat !== "All").map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table block */}
      {filteredExpenses.length === 0 ? (
        <div className="empty-state-card">
          <h3>No transactions found</h3>
          <p>Try clearing your filters or create a new expense entry.</p>
          <button className="btn-secondary" onClick={() => navigate("/expenses/add")} style={{ marginTop: "16px" }}>
            Create Entry
          </button>
        </div>
      ) : (
        <div className="premium-table-wrapper">
          <table className="premium-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense._id}>
                  <td style={{ fontWeight: "500", color: "var(--text-primary)" }}>{expense.title}</td>
                  <td>
                    <span className="category-tag">{expense.category}</span>
                  </td>
                  <td className="number-mono" style={{ fontWeight: "600", color: "var(--text-primary)" }}>
                    ₹{expense.amount}
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>
                    {new Date(expense.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "8px" }}>
                      <button
                        className="action-btn edit"
                        onClick={() => navigate(`/expenses/edit/${expense._id}`)}
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(expense._id)}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpenseHistory;