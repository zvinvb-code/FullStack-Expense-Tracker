import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="dashboard-main">

        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="dashboard-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;