import { useEffect, useState } from "react";
import { CalendarDays, AlertCircle, RefreshCw } from "lucide-react";
import { getSubscriptions, getUpcomingRenewals } from "../../services/subscriptionService";
import "./Subscriptions.css";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptionsData = async () => {
    try {
      setLoading(true);
      const subsData = await getSubscriptions().catch(() => []);
      const upcomingData = await getUpcomingRenewals().catch(() => []);
      setSubscriptions(subsData || []);
      setUpcoming(upcomingData || []);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionsData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 120px)", color: "var(--text-secondary)", fontSize: "15px" }}>
        Loading subscriptions...
      </div>
    );
  }

  const totalMonthlyCost = subscriptions.reduce((sum, sub) => sum + (sub.amount || 0), 0);

  return (
    <div className="subscriptions-page">
      <div className="subscriptions-header">
        <h1>Recurring Subscriptions</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "4px", fontFamily: "var(--font-secondary)" }}>
          Automatically tracked active subscriptions and upcoming renewals.
        </p>
      </div>

      <div className="subscription-summary-card premium-card">
        <div>
          <h2>Monthly Commitment</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "13px", marginTop: "4px" }}>
            Sum of all active detected recurring charges
          </p>
        </div>
        <div className="summary-value number-mono">₹{totalMonthlyCost}</div>
      </div>

      {/* Active Subscriptions */}
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "20px" }}>
          Active Subscriptions ({subscriptions.length})
        </h2>
        
        {subscriptions.length === 0 ? (
          <div className="premium-card empty-state-box" style={{ padding: "32px", textAlign: "center", color: "var(--text-secondary)" }}>
            <AlertCircle size={20} style={{ margin: "0 auto 12px auto", display: "block" }} />
            No recurring subscriptions detected. They appear automatically when expenses repeat.
          </div>
        ) : (
          <div className="subscriptions-grid">
            {subscriptions.map((sub, index) => (
              <div key={index} className="subscription-card premium-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "16px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "600" }}>{sub.title}</h3>
                  <span className="sub-amount number-mono">₹{sub.amount}</span>
                </div>
                
                <div className="sub-meta-item">
                  <span>Occurrences</span>
                  <strong className="number-mono">{sub.occurrences}x</strong>
                </div>

                <div className="sub-meta-item">
                  <span>Last Charged</span>
                  <strong>
                    {new Date(sub.latestDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Upcoming Renewals */}
      <section>
        <h2 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "20px" }}>
          Upcoming Renewals
        </h2>
        
        {upcoming.length === 0 ? (
          <div className="premium-card empty-state-box" style={{ padding: "32px", textAlign: "center", color: "var(--text-secondary)" }}>
            <AlertCircle size={20} style={{ margin: "0 auto 12px auto", display: "block" }} />
            No upcoming renewals detected.
          </div>
        ) : (
          <div className="subscriptions-grid">
            {upcoming.map((renew, index) => (
              <div key={index} className="subscription-card premium-card upcoming-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "16px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "600" }}>{renew.title}</h3>
                  <span className="sub-amount number-mono">₹{renew.amount}</span>
                </div>

                <div className="sub-meta-item">
                  <span>Renewal Date</span>
                  <strong>
                    {new Date(renew.renewalDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </strong>
                </div>

                <div className="sub-meta-item">
                  <span>Renews In</span>
                  <span className="status-chip warning">{renew.renewsIn}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Subscriptions;
