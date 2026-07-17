import { useEffect, useState } from "react";
import { Target, Plus, Calendar } from "lucide-react";
import "./Goals.css";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newGoal, setNewGoal] = useState({
    title: "",
    targetAmount: "",
    savedAmount: "",
    deadline: "",
  });

  const fetchGoals = async () => {
    try {
      setLoading(true);
      // Hardcoded mock data mimicking DB models
      setGoals([
        {
          _id: "1",
          title: "Buy Laptop",
          targetAmount: 80000,
          savedAmount: 25000,
          deadline: "2026-12-31",
        },
        {
          _id: "2",
          title: "Emergency Fund",
          targetAmount: 100000,
          savedAmount: 42000,
          deadline: "2027-03-15",
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleChange = (e) => {
    setNewGoal({
      ...newGoal,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate adding goal locally since it's mocked
      const added = {
        _id: String(goals.length + 1),
        title: newGoal.title,
        targetAmount: Number(newGoal.targetAmount),
        savedAmount: Number(newGoal.savedAmount),
        deadline: newGoal.deadline,
      };
      setGoals([...goals, added]);
      setNewGoal({
        title: "",
        targetAmount: "",
        savedAmount: "",
        deadline: "",
      });
      alert("Goal added successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  const calculateProgress = (saved, target) => {
    return Math.min(Math.round((saved / target) * 100), 100);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 120px)", color: "var(--text-secondary)", fontSize: "15px" }}>
        Loading goals...
      </div>
    );
  }

  return (
    <div className="goal-page">
      <div className="goal-header">
        <h1>Financial Goals</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px", fontFamily: "var(--font-secondary)" }}>
          Set targets and track your savings progression.
        </p>
      </div>

      <div className="goal-layout">
        
        {/* Left: Create Goal form */}
        <div className="goal-form-card premium-card">
          <h2>Create New Target</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="title">Goal Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="e.g. Vacation Trip"
                value={newGoal.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="targetAmount">Target Amount (₹)</label>
              <input
                type="number"
                id="targetAmount"
                name="targetAmount"
                placeholder="100000"
                value={newGoal.targetAmount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="savedAmount">Current Savings (₹)</label>
              <input
                type="number"
                id="savedAmount"
                name="savedAmount"
                placeholder="10000"
                value={newGoal.savedAmount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="deadline">Deadline</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={newGoal.deadline}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: "100%", height: "42px", marginTop: "8px" }}>
              <Plus size={16} /> Create Target
            </button>
          </form>
        </div>

        {/* Right: Goals Grid */}
        <div className="goal-grid">
          {goals.map((goal) => {
            const progress = calculateProgress(goal.savedAmount, goal.targetAmount);
            return (
              <div key={goal._id} className="goal-card premium-card">
                <div style={{ display: "flex", justifyItems: "center", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <h2 style={{ fontSize: "16px", fontWeight: "600" }}>{goal.title}</h2>
                  <span className="goal-progress-tag number-mono">{progress}%</span>
                </div>

                <div className="goal-progress-container" style={{ margin: "24px 0" }}>
                  <div style={{ height: "6px", backgroundColor: "var(--bg-primary)", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ width: `${progress}%`, height: "100%", backgroundColor: "var(--accent)", borderRadius: "3px" }} />
                  </div>
                </div>

                <div className="goal-stats">
                  <div>
                    <span>Saved</span>
                    <h4 className="number-mono">₹{goal.savedAmount}</h4>
                  </div>
                  <div>
                    <span>Target</span>
                    <h4 className="number-mono">₹{goal.targetAmount}</h4>
                  </div>
                </div>

                <div className="goal-footer">
                  <Calendar size={14} />
                  <span>
                    Deadline: {new Date(goal.deadline).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Goals;