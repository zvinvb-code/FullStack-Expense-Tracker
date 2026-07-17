import { useEffect, useState } from "react";
import { Flame, Award, Calendar, RotateCcw } from "lucide-react";
import {
  getStreak,
  resetStreak,
} from "../../services/streakService";
import "./Streaks.css";

const Streaks = () => {
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState({
    currentStreak: 0,
    longestStreak: 0,
    lastNoSpendDate: null,
  });

  const fetchStreak = async () => {
    try {
      setLoading(true);
      const data = await getStreak();
      setStreak({
        currentStreak: data.currentStreak || 0,
        longestStreak: data.longestStreak || 0,
        lastNoSpendDate: data.lastNoSpendDate,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStreak();
  }, []);

  const handleReset = async () => {
    const confirmReset = window.confirm("Reset your current streak?");
    if (!confirmReset) return;

    try {
      await resetStreak();
      fetchStreak();
    } catch (error) {
      console.error(error);
      alert("Unable to reset streak.");
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 120px)", color: "var(--text-secondary)", fontSize: "15px" }}>
        Loading streaks...
      </div>
    );
  }

  return (
    <div className="streak-page">
      <div className="streak-header">
        <div>
          <h1>Savings Streaks</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px", fontFamily: "var(--font-secondary)" }}>
            Days where you recorded zero discretionary expenditures.
          </p>
        </div>
        <button className="btn-secondary" onClick={handleReset} style={{ color: "var(--error)" }}>
          <RotateCcw size={14} /> Reset Progress
        </button>
      </div>

      <div className="streak-grid">
        <div className="streak-card premium-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>Current Streak</h3>
            <Flame size={20} style={{ color: "var(--accent)" }} />
          </div>
          <div className="streak-value-container">
            <span className="streak-number number-mono">{streak.currentStreak}</span>
            <span className="streak-label">Days Active</span>
          </div>
        </div>

        <div className="streak-card premium-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>Longest Streak</h3>
            <Award size={20} style={{ color: "var(--warning)" }} />
          </div>
          <div className="streak-value-container">
            <span className="streak-number number-mono">{streak.longestStreak}</span>
            <span className="streak-label">Personal Record</span>
          </div>
        </div>
      </div>

      <div className="streak-info-card premium-card">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Calendar size={18} style={{ color: "var(--text-secondary)" }} />
          <div>
            <h4 style={{ fontSize: "14px", fontWeight: "600" }}>Last Verified No-Spend Day</h4>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "2px" }}>
              {streak.lastNoSpendDate
                ? new Date(streak.lastNoSpendDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "No verified days recorded yet"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Streaks;