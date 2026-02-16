import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Fixed this line
import Login from './pages/login'; // Ensure this matches your file name (Capital 'L')
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    // Wrap the entire app in AuthProvider so components can access the login function
    <AuthProvider>
      
      {/* Wrap in Router to enable navigation (useNavigate) */}
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>

    </AuthProvider>
  );
}

export default App;


