import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import StallsPieChart from "../components/StallsPieChart";
import NavBar from "../components/NavBar";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);

  const [stats, setStats] = useState({
    total: 0,
    reserved: 0,
    available: 0,
  });

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stallsRes, reservationsRes] = await Promise.all([
          api.get("/admin/stalls"),
          api.get("/admin/reservations"),
        ]);

        const stalls = stallsRes.data || [];
        const total = stalls.length;
        const reserved = stalls.filter((s) => s.Confirmed).length;                 // Since the json response contains this variable
        const available = total - reserved;

        setStats({ total, reserved, available });

        const allReservations = reservationsRes.data || [];
        const sorted = [...allReservations].sort(
          (a, b) =>
            new Date(b.reservationDate).getTime() -
            new Date(a.reservationDate).getTime()
        );
        setReservations(sorted.slice(0, 3));
      } catch (err) {
        console.error("Failed to load admin dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-background">
      <NavBar />

      <div className="dashboard-header">
        <div className="header-left">
          <p className="greeting">
            
          </p>
          
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
              <th>Reservation ID</th>
              <th>Reservation Date</th>
              <th>Status</th>
              <th>Stalls</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>
                  {r.reservationDate
                    ? new Date(r.reservationDate).toLocaleString()
                    : "-"}
                </td>
                <td>{r.status}</td>
                <td>
                  {r.stalls && r.stalls.length > 0
                    ? r.stalls.map((s) => s.name).join(", ")
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}