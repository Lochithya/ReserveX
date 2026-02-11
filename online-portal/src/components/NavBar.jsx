import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "./NavBar.css";

const NavBar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">ReserveX</Link>

            <div className="navbar-links">
                {isAuthenticated ? (
                <>
                    <Link to="/home">Home</Link>
                    <Link to="/reserve">Reserve Stall</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
            </div>
        </nav>
    );
};

export default NavBar;