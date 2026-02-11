import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login("token");
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Vendor Login</h2>

        <form onSubmit={handleSubmit}>
            <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <br />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot password?
          </Link>
          <button type="submit">Login</button>
        </form>

        <p className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
