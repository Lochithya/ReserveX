import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {

  const [stats, setStats] = useState({
    total: 0,
    reserved: 0,
    available: 0
  });

  const [reservations, setReservations] = useState([]);

  // 🔹 Replace these with real API calls later
  useEffect(() => {
    // Dummy data for UI testing
    setStats({
      total: 120,
      reserved: 75,
      available: 45
    });

    setReservations([
      { id: 1, business: "ABC Publishers", stall: "A12", size: "Large" },
      { id: 2, business: "Book Hub", stall: "B04", size: "Medium" },
      { id: 3, business: "Readers Point", stall: "C21", size: "Small" }
    ]);
  }, []);

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
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

      {/* ===== STATS CARDS ===== */}
      <div className="stats-grid">
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