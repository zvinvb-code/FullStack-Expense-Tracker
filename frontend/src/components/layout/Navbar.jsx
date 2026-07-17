import { useState, useEffect } from "react";
import { Search, Bell, Sun, Moon, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useAuth();
  
  // Theme State
  const [darkMode, setDarkMode] = useState(
    document.body.classList.contains("dark-theme")
  );

  // Notifications States
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Welcome to ExpenseFlow! Start tracking your transactions to compile AI insights.",
      time: "Just now",
    },
    {
      id: 2,
      message: "Subscription alert: Netflix commitment renewal is due in 3 days.",
      time: "1 hour ago",
    },
    {
      id: 3,
      message: "Goal reminder: Buy Laptop target is currently at 31%. Keep saving!",
      time: "Today",
    },
  ]);

  const toggleTheme = () => {
    const isDark = document.body.classList.toggle("dark-theme");
    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  // Sync theme status on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
      setDarkMode(true);
    }
  }, []);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <header className="navbar">
      {/* Search Input */}
      <div className="navbar-search">
        <Search className="search-icon" size={18} strokeWidth={1.5} />
        <input type="text" placeholder="Search transactions..." />
      </div>

      {/* Action Controls & Profile */}
      <div className="navbar-right">
        {/* Theme Toggle Button */}
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {darkMode ? (
            <Sun size={20} strokeWidth={1.5} />
          ) : (
            <Moon size={20} strokeWidth={1.5} />
          )}
        </button>

        {/* Notifications Wrapper */}
        <div className="notification-container">
          <button
            className={`notification-wrapper icon-btn ${showNotifications ? "active" : ""}`}
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={1.5} />
            {notifications.length > 0 && <span className="notification-badge" />}
          </button>

          {showNotifications && (
            <div className="notification-dropdown premium-card">
              <div className="notification-dropdown-header">
                <h3>Notifications</h3>
                {notifications.length > 0 && (
                  <button onClick={clearNotifications} className="clear-all-btn">
                    Clear All
                  </button>
                )}
              </div>
              <div className="notification-dropdown-list">
                {notifications.length === 0 ? (
                  <div className="empty-notifications">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div key={notif.id} className="notification-item">
                      <div className="notification-bullet" />
                      <div className="notification-content">
                        <p>{notif.message}</p>
                        <span>{notif.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Card */}
        <div className="navbar-user">
          <div className="avatar-placeholder">
            <User size={18} strokeWidth={1.5} />
          </div>
          <div className="user-details">
            <h4>{user?.name || "User"}</h4>
            <p>Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;