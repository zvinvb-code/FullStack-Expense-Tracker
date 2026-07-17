import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { User, ShieldAlert, Sliders, LogOut } from "lucide-react";
import "./Settings.css";

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    reminders: true,
    aiInsights: true,
  });

  const [darkMode, setDarkMode] = useState(
    document.body.classList.contains("dark-theme")
  );

  useEffect(() => {
    setDarkMode(document.body.classList.contains("dark-theme"));
  }, []);

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationChange = (e) => {
    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked,
    });
  };

  const toggleDarkMode = () => {
    const isDark = document.body.classList.toggle("dark-theme");
    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    if (password.newPassword !== password.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Password updated successfully!");
    setPassword({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Preferences & Settings</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px", fontFamily: "var(--font-secondary)" }}>
          Manage your personal details, credentials, and notification settings.
        </p>
      </div>

      <div className="settings-layout">
        
        {/* Profile Card */}
        <div className="settings-card premium-card">
          <div className="settings-card-header">
            <User size={18} style={{ color: "var(--accent)" }} />
            <h2>Profile Details</h2>
          </div>
          
          <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ height: "42px", marginTop: "8px" }}>
              Save Profile
            </button>
          </form>
        </div>

        {/* Security Card */}
        <div className="settings-card premium-card">
          <div className="settings-card-header">
            <ShieldAlert size={18} style={{ color: "var(--error)" }} />
            <h2>Change Password</h2>
          </div>

          <form onSubmit={handlePasswordUpdate} style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                placeholder="••••••••"
                value={password.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="••••••••"
                value={password.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                value={password.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ height: "42px", marginTop: "8px" }}>
              Update Password
            </button>
          </form>
        </div>

        {/* Preferences / Toggles Card */}
        <div className="settings-card premium-card" style={{ gridColumn: "span 2" }}>
          <div className="settings-card-header" style={{ marginBottom: "24px" }}>
            <Sliders size={18} style={{ color: "var(--info)" }} />
            <h2>Preferences</h2>
          </div>

          <div className="preference-list">
            <div className="preference-row">
              <div>
                <h4>Dark Mode</h4>
                <p>Switch interface to dark visual theme</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="preference-row">
              <div>
                <h4>Email Alerts</h4>
                <p>Receive summaries of recurring commitments</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="email"
                  checked={notifications.email}
                  onChange={handleNotificationChange}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="preference-row">
              <div>
                <h4>Expense Reminders</h4>
                <p>Remind me to log daily expenses before bedtime</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="reminders"
                  checked={notifications.reminders}
                  onChange={handleNotificationChange}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="preference-row">
              <div>
                <h4>AI Insights</h4>
                <p>Allow system to alert me on spending anomalies</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  name="aiInsights"
                  checked={notifications.aiInsights}
                  onChange={handleNotificationChange}
                />
                <span className="toggle-slider" />
              </label>
            </div>
          </div>
        </div>

        {/* Action Logout Card */}
        <div className="settings-card premium-card" style={{ gridColumn: "span 2", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(201, 90, 74, 0.2)" }}>
          <div>
            <h4 style={{ fontSize: "14px", fontWeight: "600" }}>Account Session</h4>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "2px" }}>Sign out of your active ExpenseFlow session.</p>
          </div>
          <button className="btn-secondary" onClick={handleLogout} style={{ color: "var(--error)", borderColor: "rgba(201, 90, 74, 0.2)" }}>
            <LogOut size={14} /> Log Out Account
          </button>
        </div>

      </div>
    </div>
  );
};

export default Settings;