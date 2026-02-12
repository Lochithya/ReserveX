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
        {!isAuthenticated ? (
          <>
            <Link to="/" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
          </>
        ) : (
          <>
            <Link to="/home" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/stalls" onClick={() => setIsOpen(false)}>Stalls</Link>
            <Link to="/my-reservations" onClick={() => setIsOpen(false)}>My Reservations</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
