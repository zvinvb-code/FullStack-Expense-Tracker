import { useEffect, useState } from "react";
import { getAnalytics } from "../../services/analyticsService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import "./Analytics.css";

const COLORS = [
  "#2F6F62", // Forest Green
  "#4B6B8A", // Muted Blue
  "#D8A13D", // Warm Ochre
  "#C95A4A", // Muted Rust
  "#6D6D6D", // Slate Gray
  "#90A4AE", // Muted Silver
];

const Analytics = () => {
  const [loading, setLoading] = useState(true);

  const [analytics, setAnalytics] = useState({
    totalExpenses: 0,
    monthlyExpense: 0,
    totalTransactions: 0,
    categoryBreakdown: [],
    monthlyTrend: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await getAnalytics();
        setAnalytics({
          totalExpenses: data.totalExpenses || 0,
          monthlyExpense: data.currentMonthSpending || data.monthlyExpense || 0,
          totalTransactions: data.totalTransactions || 0,
          categoryBreakdown: data.categoryBreakdown || [],
          monthlyTrend: data.monthlyTrend || [],
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 120px)", color: "var(--text-secondary)", fontSize: "15px" }}>
        Loading charts...
      </div>
    );
  }

  // Format category breakdown to match recharts requirement if it's empty
  const formattedCategoryData = analytics.categoryBreakdown.length > 0 
    ? analytics.categoryBreakdown 
    : [{ category: "No Data", amount: 0 }];

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1>Analytics Overview</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px", fontFamily: "var(--font-secondary)" }}>
          Visual insight into your spending patterns over time.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="analytics-cards">
        <div className="analytics-card premium-card">
          <h3>Total Expenses</h3>
          <h2 className="number-mono">₹{analytics.totalExpenses}</h2>
        </div>

        <div className="analytics-card premium-card">
          <h3>This Month</h3>
          <h2 className="number-mono">₹{analytics.monthlyExpense}</h2>
        </div>

        <div className="analytics-card premium-card">
          <h3>Total Transactions</h3>
          <h2 className="number-mono">{analytics.totalTransactions}</h2>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Category breakdown */}
        <div className="chart-card premium-card">
          <h2>Category Concentration</h2>
          <div style={{ width: "100%", height: 320, marginTop: "24px" }}>
            {analytics.categoryBreakdown.length === 0 ? (
              <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
                No category data recorded yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formattedCategoryData}
                    dataKey="amount"
                    nameKey="category"
                    outerRadius={100}
                    innerRadius={60}
                    paddingAngle={3}
                  >
                    {formattedCategoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "var(--bg-surface)", 
                      borderColor: "var(--border-color)",
                      borderRadius: "8px"
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Monthly Expense Trend */}
        <div className="chart-card premium-card">
          <h2>Monthly Spend Trend</h2>
          <div style={{ width: "100%", height: 320, marginTop: "24px" }}>
            {analytics.monthlyTrend.length === 0 ? (
              <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
                No historical trend data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: "var(--text-secondary)", fontSize: 11 }}
                    axisLine={{ stroke: "var(--border-color)" }}
                  />
                  <YAxis 
                    tick={{ fill: "var(--text-secondary)", fontSize: 11 }}
                    axisLine={{ stroke: "var(--border-color)" }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "var(--bg-surface)", 
                      borderColor: "var(--border-color)",
                      borderRadius: "8px"
                    }} 
                  />
                  <Legend iconType="circle" />
                  <Bar
                    dataKey="amount"
                    fill="var(--accent)"
                    radius={[4, 4, 0, 0]}
                    name="Amount Spend"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;