import { useEffect, useState } from "react";
import { Sparkles, RefreshCw, CheckCircle2, Lightbulb } from "lucide-react";
import {
  getAIInsights,
  refreshAIInsights,
} from "../../services/insightService";
import "./AIInsights.css";

const AIInsights = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [insights, setInsights] = useState({
    score: 0,
    summary: "",
    recommendations: [],
    savingsTips: [],
    spendingPattern: "",
  });

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const data = await getAIInsights();
      setInsights({
        score: data.score || 0,
        summary: data.summary || "",
        recommendations: data.recommendations || [],
        savingsTips: data.savingsTips || [],
        spendingPattern: data.spendingPattern || "",
      });
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to load AI insights.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await refreshAIInsights();
      await fetchInsights();
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to refresh insights.");
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 120px)", color: "var(--text-secondary)", fontSize: "15px" }}>
        Analyzing financial pattern...
      </div>
    );
  }

  return (
    <div className="ai-page">
      <div className="ai-header">
        <div>
          <h1>AI Financial Insights</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px", fontFamily: "var(--font-secondary)" }}>
            Personalized intelligence based on your spending habits.
          </p>
        </div>
        <button
          className="btn-secondary"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw size={14} className={refreshing ? "spin-icon" : ""} />
          {refreshing ? "Refreshing..." : "Refresh Insights"}
        </button>
      </div>

      {/* Main Grid: Score on left, Pattern details on right */}
      <div className="ai-grid">
        
        {/* Left: Score Card */}
        <div className="score-card premium-card">
          <h3>Health Score</h3>
          <div className="score-number-wrapper">
            <span className="score-value number-mono">{insights.score}</span>
            <span className="score-total">/100</span>
          </div>
          <p className="score-summary">{insights.summary}</p>
        </div>

        {/* Right: Spending Pattern Card */}
        <div className="pattern-card premium-card">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Sparkles size={18} style={{ color: "var(--accent)" }} />
            <h2 style={{ fontSize: "16px", fontWeight: "600" }}>Spending Cohort Analysis</h2>
          </div>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", fontSize: "14px" }}>
            {insights.spendingPattern || "No spending pattern detected yet. Add more expense transactions to let the AI build your profile."}
          </p>
        </div>

      </div>

      {/* Bottom suggestions lists */}
      <div className="insights-lists-grid">
        
        {/* Recommendations */}
        <div className="insight-list-card premium-card">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <CheckCircle2 size={18} style={{ color: "var(--success)" }} />
            <h2 style={{ fontSize: "16px", fontWeight: "600" }}>Actions Recommended</h2>
          </div>
          {insights.recommendations.length === 0 ? (
            <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>No custom actions recommended currently.</p>
          ) : (
            <ul>
              {insights.recommendations.map((item, index) => (
                <li key={index}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Savings Tips */}
        <div className="insight-list-card premium-card">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <Lightbulb size={18} style={{ color: "var(--warning)" }} />
            <h2 style={{ fontSize: "16px", fontWeight: "600" }}>Saving Micro-Tips</h2>
          </div>
          {insights.savingsTips.length === 0 ? (
            <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>No tips compiled yet.</p>
          ) : (
            <ul>
              {insights.savingsTips.map((tip, index) => (
                <li key={index}>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default AIInsights;