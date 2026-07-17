import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAnalytics } from "../../services/analyticsService";
import {
  Utensils,
  Car,
  ShoppingBag,
  Receipt,
  Film,
  HeartPulse,
  GraduationCap,
  CircleEllipsis,
  Sparkles,
  Plus,
  ArrowRight,
  ShieldCheck,
  TrendingDown
} from "lucide-react";

// Category Icon Mapper
const getCategoryIcon = (category) => {
  switch (category?.toLowerCase()) {
    case "food":
      return <Utensils size={18} strokeWidth={1.5} />;
    case "travel":
      return <Car size={18} strokeWidth={1.5} />;
    case "shopping":
      return <ShoppingBag size={18} strokeWidth={1.5} />;
    case "bills":
      return <Receipt size={18} strokeWidth={1.5} />;
    case "entertainment":
      return <Film size={18} strokeWidth={1.5} />;
    case "health":
      return <HeartPulse size={18} strokeWidth={1.5} />;
    case "education":
      return <GraduationCap size={18} strokeWidth={1.5} />;
    default:
      return <CircleEllipsis size={18} strokeWidth={1.5} />;
  }
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [analytics, setAnalytics] = useState({
    totalExpenses: 0,
    totalTransactions: 0,
    highestCategory: "None",
    monthlyExpense: 0,
    recentTransactions: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getAnalytics();
        setAnalytics({
          totalExpenses: data.totalExpenses || 0,
          totalTransactions: data.totalTransactions || 0,
          highestCategory: data.highestCategory || "None",
          monthlyExpense: data.currentMonthSpending || data.monthlyExpense || 0,
          recentTransactions: data.recentTransactions || [],
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 72px)", fontSize: "var(--fs-body)", color: "var(--text-secondary)", fontFamily: "var(--font-secondary)" }}>
        Fetching financial story...
      </div>
    );
  }

  // Calculate greeting
  const hr = new Date().getHours();
  const greeting = hr < 12 ? "Good morning" : hr < 17 ? "Good afternoon" : "Good evening";

  // Mock Goals progress (matching database model or frontend mock)
  const goalsMock = [
    { title: "Buy Laptop", saved: 25000, target: 80000 },
    { title: "Emergency Fund", saved: 42000, target: 100000 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* 1. Header briefing */}
      <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <h1 style={{ fontSize: "var(--fs-large-heading)", fontWeight: "600", letterSpacing: "-0.03em" }}>
          {greeting}, {user?.name || "Abbas"}
        </h1>
        <p style={{ fontSize: "16px", color: "var(--text-secondary)", maxWidth: "800px", lineHeight: "1.6", fontFamily: "var(--font-secondary)" }}>
          Today is <span style={{ color: "var(--text-primary)", fontWeight: "500" }}>{new Date().toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' })}</span>. 
          So far this month, you have spent <span className="number-mono" style={{ color: "var(--accent)", fontWeight: "600" }}>₹{analytics.monthlyExpense}</span> across <span style={{ color: "var(--text-primary)", fontWeight: "500" }}>{analytics.totalTransactions}</span> transactions. 
          Your highest expense concentration is in <span style={{ textTransform: "capitalize", color: "var(--text-primary)", fontWeight: "500" }}>{analytics.highestCategory}</span>.
        </p>
      </section>

      {/* 2. Top Story Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "32px", alignItems: "start" }}>
        
        {/* Left: Financial health narrative & narrative cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          
          <div className="premium-card" style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "var(--accent-light)", color: "var(--accent)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <ShieldCheck size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>Financial Control: Excellent</h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.4" }}>
                Your health score is <span className="number-mono" style={{ color: "var(--accent)", fontWeight: "600" }}>82/100</span>. You have kept your discretionary spending 12% lower than last month, putting you on track to meet your targets.
              </p>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div style={{ display: "flex", gap: "16px" }}>
            <button className="btn-primary" onClick={() => navigate("/expenses/add")}>
              <Plus size={16} /> Record Expense
            </button>
            <button className="btn-secondary" onClick={() => navigate("/insights")}>
              <Sparkles size={16} /> Ask AI Insights
            </button>
          </div>
        </div>

        {/* Right: Goals Summary */}
        <div className="premium-card" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "15px", color: "var(--text-secondary)", fontWeight: "600" }}>Active Targets</h3>
            <span style={{ cursor: "pointer", color: "var(--accent)", fontSize: "13px", fontWeight: "500", display: "inline-flex", alignItems: "center", gap: "4px" }} onClick={() => navigate("/goals")}>
              All Goals <ArrowRight size={14} />
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {goalsMock.map((goal, idx) => {
              const pct = Math.round((goal.saved / goal.target) * 100);
              return (
                <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                    <span style={{ fontWeight: "500" }}>{goal.title}</span>
                    <span className="number-mono" style={{ color: "var(--text-secondary)" }}>{pct}%</span>
                  </div>
                  <div style={{ height: "4px", backgroundColor: "var(--border-color)", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", backgroundColor: "var(--accent)", borderRadius: "2px" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. Bottom Row: Recent Feed */}
      <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "var(--fs-section-title)", fontWeight: "600" }}>Recent Activities</h2>
          <span style={{ cursor: "pointer", color: "var(--accent)", fontSize: "13px", fontWeight: "500", display: "inline-flex", alignItems: "center", gap: "4px" }} onClick={() => navigate("/expenses")}>
            Full History <ArrowRight size={14} />
          </span>
        </div>

        <div className="premium-card" style={{ padding: "0" }}>
          {analytics.recentTransactions.length === 0 ? (
            <div style={{ padding: "32px", textAlign: "center", color: "var(--text-secondary)" }}>
              No recent transactions found. Add expenses to populate your history feed.
            </div>
          ) : (
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {analytics.recentTransactions.map((tx, idx) => (
                <li
                  key={tx._id || idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 24px",
                    borderBottom: idx === analytics.recentTransactions.length - 1 ? "none" : "var(--border-width) solid var(--border-color)",
                    transition: "background-color 0.15s ease",
                  }}
                  className="tx-feed-item"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "8px",
                      backgroundColor: "var(--bg-primary)",
                      color: "var(--text-secondary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "var(--border-width) solid var(--border-color)"
                    }}>
                      {getCategoryIcon(tx.category)}
                    </div>
                    <div>
                      <h4 style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>{tx.title}</h4>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                        {tx.category} • {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div className="number-mono" style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-primary)" }}>
                    - ₹{tx.amount}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Embedded CSS for hover effects */}
      <style>{`
        .tx-feed-item:hover {
          background-color: var(--bg-primary);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;