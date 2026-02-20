import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import StallsPieChart from "../components/StallsPieChart";
import NavBar from "../components/NavBar";
import { AuthContext } from "../contexts/AuthContext";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);

  const [stats, _setStats] = useState({
    total: 120,
    reserved: 75,
    available: 45
  });

  const [reservations, _setReservations] = useState([
    { id: 1, business: "ABC Publishers", stall: "A12", size: "Large" },
    { id: 2, business: "Book Hub", stall: "B04", size: "Medium" },
    { id: 3, business: "Readers Point", stall: "C21", size: "Small" }
  ]);

  // 🔹 Replace these with real API calls later
  useEffect(() => {
    // Future API calls will go here
    // For now, dummy data is initialized in useState above
  }, []);

  return (
    <div className="dashboard-container">
      <NavBar />

      <div className="dashboard-header">
        <div className="header-left">
          <p className="greeting"><h2>Hi {user?.sub || user?.email || "Admin"}!</h2></p>
          
        </div>
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <div className="action-cards">
        <Link to="/manage-stalls" className="action-card">
          <span className="action-icon">⚙️</span>
          <h3>Manage Stalls</h3>
          <p>Add, edit, or remove stalls</p>
        </Link>
        <Link to="/view-stalls" className="action-card">
          <span className="action-icon">👁️</span>
          <h3>View Stalls</h3>
          <p>View stall availability and map</p>
        </Link>
        <Link to="/admin-profile" className="action-card">
          <span className="action-icon">👤</span>
          <h3>Admin Profile</h3>
          <p>Update your profile settings</p>
        </Link>
      </div>
      

      {/* ===== STALLS OVERVIEW (heading + chart + stats) ===== */}
      <div className="stalls-overview-section">
        <h2 className="stalls-overview-heading">Stalls Overview</h2>
        <div className="chart-container">
          <div className="chart-with-stats">
            <StallsPieChart available={stats.available} reserved={stats.reserved} />
            <div className="stats-stack">
              <div className="card">
                <h3>Total Stalls</h3>
                <p>{stats.total}</p>
              </div>
              <div className="card reserved">
                <h3>Reserved</h3>
                <p>{stats.reserved}</p>
              </div>
              <div className="card available">
                <h3>Available</h3>
                <p>{stats.available}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== RECENT RESERVATIONS TABLE ===== */}
      <div className="table-container">
        <h2>Recent Reservations</h2>
        <table>
          <thead>
            <tr>
              <th>Business</th>
              <th>Stall</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id}>
                <td>{r.business}</td>
                <td>{r.stall}</td>
                <td>{r.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}