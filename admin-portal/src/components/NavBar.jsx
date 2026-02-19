import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();
  const isManageStalls = location.pathname === '/manage-stalls';
  const isViewStalls = location.pathname === '/view-stalls';
  const isManageOrViewStalls = isManageStalls || isViewStalls;

  return (
    <nav className="admin-navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <img src="/vite.svg" alt="Logo" className="navbar-logo" />
          {isManageStalls ? (
            <h1 className="navbar-title">Manage Stalls</h1>
          ) : isViewStalls ? (
            <h1 className="navbar-title">View Stalls</h1>
          ) : (
            <h1 className="navbar-title">Admin Dashboard</h1>
          )}
        </div>
        <div className="navbar-right">
          {isManageStalls ? (
            <>
              <Link
                to="/dashboard"
                className="navbar-item back-button"
                title="Back to Dashboard"
              >
                <span className="navbar-icon">⬅️</span>
                <span className="navbar-text">Dashboard</span>
              </Link>
              <Link
                to="/view-stalls"
                className="navbar-item"
              >
                <span className="navbar-icon">👁️</span>
                <span className="navbar-text">View Stalls</span>
              </Link>
              <Link
                to="/admin-profile"
                className="navbar-item"
              >
                <span className="navbar-icon">👤</span>
                <span className="navbar-text">Admin Profile</span>
              </Link>
            </>
          ) : isViewStalls ? (
            <>
              <Link
                to="/dashboard"
                className="navbar-item back-button"
                title="Back to Dashboard"
              >
                <span className="navbar-icon">⬅️</span>
                <span className="navbar-text">Dashboard</span>
              </Link>
              <Link
                to="/manage-stalls"
                className="navbar-item"
              >
                <span className="navbar-icon">⚙️</span>
                <span className="navbar-text">Manage Stalls</span>
              </Link>
              <Link
                to="/admin-profile"
                className="navbar-item"
              >
                <span className="navbar-icon">👤</span>
                <span className="navbar-text">Admin Profile</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/manage-stalls"
                className="navbar-item"
              >
                <span className="navbar-icon">⚙️</span>
                <span className="navbar-text">Manage Stalls</span>
              </Link>
              <Link
                to="/view-stalls"
                className="navbar-item"
              >
                <span className="navbar-icon">👁️</span>
                <span className="navbar-text">View Stalls</span>
              </Link>
              <Link
                to="/admin-profile"
                className="navbar-item"
              >
                <span className="navbar-icon">👤</span>
                <span className="navbar-text">Admin Profile</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;