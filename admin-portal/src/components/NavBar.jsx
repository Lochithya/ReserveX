import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
import { AuthContext } from '../contexts/AuthContext';

const NavBar = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const isDashboard = location.pathname === '/dashboard';
  const isManageStalls = location.pathname === '/manage-stalls';
  const isViewStalls = location.pathname === '/view-stalls';
  const isAdminProfile = location.pathname === '/admin-profile';

  return (
    <nav className="admin-navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <img src="/logo.jpeg" alt="Logo" className="navbar-logo" />
          <h1 className="navbar-title reservex-title">ReserveX</h1>
        </div>
        <div className="navbar-right">
          <Link
            to="/dashboard"
            className={`navbar-item ${isDashboard ? 'active-page' : ''}`}
          >
            <span className="navbar-icon">📊</span>
            <span className="navbar-text">Admin Dashboard</span>
          </Link>
          <Link
            to="/manage-stalls"
            className={`navbar-item ${isManageStalls ? 'active-page' : ''}`}
          >
            <span className="navbar-icon">⚙️</span>
            <span className="navbar-text">Manage Stalls</span>
          </Link>
          <Link
            to="/view-stalls"
            className={`navbar-item ${isViewStalls ? 'active-page' : ''}`}
          >
            <span className="navbar-icon">👁️</span>
            <span className="navbar-text">View Stalls</span>
          </Link>
          <Link
            to="/admin-profile"
            className={`navbar-item ${isAdminProfile ? 'active-page' : ''}`}
          >
            <span className="navbar-icon">👤</span>
            <span className="navbar-text">Admin Profile</span>
          </Link>
          <div className="navbar-user-pill">
            <div className="navbar-user-avatar">
              {(user?.username || user?.sub || user?.email || 'A')
                .charAt(0)
                .toUpperCase()}
            </div>
            <div className="navbar-user-meta">
              <span className="navbar-user-label">Signed in as</span>
              <span className="navbar-user-name">
                {user?.username || user?.sub || user?.email || 'Admin'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;