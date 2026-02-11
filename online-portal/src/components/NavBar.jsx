import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "./NavBar.css";

const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 

  const handleLogout = () => {
    logout();
    navigate("/"); 
    setIsOpen(false); 
  };

  return (
    <nav className="navbar">
      
      <Link to="/" className="navbar-logo">
        ReserveX
      </Link>
      <div
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`navbar-links ${isOpen ? "active" : ""}`}>
    
        <Link to="/home" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/reservation" onClick={() => setIsOpen(false)}>Reservation</Link>
        <Link to="/stallmap" onClick={() => setIsOpen(false)}>Stall Map</Link>

        {isAuthenticated ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
