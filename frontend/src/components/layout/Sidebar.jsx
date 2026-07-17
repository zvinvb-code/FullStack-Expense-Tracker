import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  BarChart3,
  Sparkles,
  Target,
  Flame,
  CalendarDays,
  Settings,
  LogOut
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} strokeWidth={1.5} />,
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: <Wallet size={20} strokeWidth={1.5} />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <BarChart3 size={20} strokeWidth={1.5} />,
    },
    {
      name: "AI Insights",
      path: "/insights",
      icon: <Sparkles size={20} strokeWidth={1.5} />,
    },
    {
      name: "Goals",
      path: "/goals",
      icon: <Target size={20} strokeWidth={1.5} />,
    },
    {
      name: "Streaks",
      path: "/streaks",
      icon: <Flame size={20} strokeWidth={1.5} />,
    },
    {
      name: "Subscriptions",
      path: "/subscriptions",
      icon: <CalendarDays size={20} strokeWidth={1.5} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={20} strokeWidth={1.5} />,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">🍃</span>
        <span className="brand-text">ExpenseFlow</span>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <span className="menu-icon"><LogOut size={20} strokeWidth={1.5} /></span>
        <span className="menu-text">Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;