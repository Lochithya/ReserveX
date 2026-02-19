import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="admin-navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <img src="/vite.svg" alt="Logo" className="navbar-logo" />
          <h1 className="navbar-title">Admin Dashboard</h1>
        </div>
        <div className="navbar-right">
          <Link
            to="/manage-stalls"
            className={`navbar-item ${location.pathname === '/manage-stalls' ? 'active' : ''}`}
          >
            <span className="navbar-icon">⚙️</span>
            <span className="navbar-text">Manage Stalls</span>
          </Link>
          <Link
            to="/view-stalls"
            className={`navbar-item ${location.pathname === '/view-stalls' ? 'active' : ''}`}
          >
            <span className="navbar-icon">👁️</span>
            <span className="navbar-text">View Stalls</span>
          </Link>
          <Link
            to="/admin-profile"
            className={`navbar-item ${location.pathname === '/admin-profile' ? 'active' : ''}`}
          >
            <span className="navbar-icon">👤</span>
            <span className="navbar-text">Admin Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;