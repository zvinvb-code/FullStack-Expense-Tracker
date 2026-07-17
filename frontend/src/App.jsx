import { Routes, Route, Navigate } from "react-router-dom";

// Authentication Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Dashboard Pages
import Dashboard from "./pages/dashboard/Dashboard";

// Expense Pages
import ExpenseHistory from "./pages/expenses/ExpenseHistory";
import AddExpense from "./pages/expenses/AddExpense";
import EditExpense from "./pages/expenses/EditExpense";

// Analytics
import Analytics from "./pages/analytics/Analytics";

// AI Insights
import AIInsights from "./pages/insights/AIInsights";

// Subscriptions
import Subscriptions from "./pages/subscriptions/Subscriptions";

// Goals
import Goals from "./pages/goals/Goals";

// Streaks
import Streaks from "./pages/streaks/Streaks";

// Settings
import Settings from "./pages/settings/Settings";

import DashboardLayout from "./components/layout/DashboardLayout";

// Protected Route
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Redirect Root */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* ================= PROTECTED ROUTES ================= */}

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Expenses */}
          <Route path="/expenses" element={<ExpenseHistory />} />
          <Route path="/expenses/add" element={<AddExpense />} />
          <Route path="/expenses/edit/:id" element={<EditExpense />} />

          {/* Analytics */}
          <Route path="/analytics" element={<Analytics />} />

          {/* AI Insights */}
          <Route path="/insights" element={<AIInsights />} />

          {/* Subscription Tracker */}
          <Route path="/subscriptions" element={<Subscriptions />} />

          {/* Goals */}
          <Route path="/goals" element={<Goals />} />

          {/* No Spend Streak */}
          <Route path="/streaks" element={<Streaks />} />

          {/* Settings */}
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* ================= 404 PAGE ================= */}

      <Route
        path="*"
        element={
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <h1>404</h1>
            <h3>Page Not Found</h3>
          </div>
        }
      />
    </Routes>
  );
}

export default App;