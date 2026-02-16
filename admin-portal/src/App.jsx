import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Fixed this line
import Login from './pages/login';
import Dashboard from "./pages/Dashboard";
import AdminProfile from "./pages/AdminProfile";

function App() {
  return (
    // Wrap the entire app in AuthProvider so components can access the login function
    <AuthProvider>
      
      {/* Wrap in Router to enable navigation (useNavigate) */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
        </Routes>
      </Router>

    </AuthProvider>
  );
import { useState } from 'react'
import './App.css'
import ViewStalls from './pages/ViewStalls.jsx'
import ManageStalls from './pages/ManageStalls.jsx'

function App() {
  const [page, setPage] = useState('manage')

  return (
    <>
      {page === 'view' && (
        <nav className="app-nav">
          <button
            className={`nav-link ${page === 'view' ? 'active' : ''}`}
            onClick={() => setPage('view')}
          >
            View Stalls
          </button>
          <button
            className={`nav-link ${page === 'manage' ? 'active' : ''}`}
            onClick={() => setPage('manage')}
          >
            Manage Stalls
          </button>
        </nav>
      )}
      {page === 'view' && <ViewStalls />}
      {page === 'manage' && <ManageStalls />}
    </>
  )
}

export default App;


