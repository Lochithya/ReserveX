import { useState } from "react";
import { register } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert("Registration successfull!");
      navigate("/");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Vendor Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          name="name"
          placeholder="Enter Your First Name"
          onChange={handleChange}
          required
        />
        <br /> <br />
        <label>Last Name</label>
        <input
          name="name"
          placeholder="Enter Your Last Name"
          onChange={handleChange}
          required
        />
        <br /> <br />
        <label>Email Address</label>
        <input
          name="email"
          type="email"
          placeholder="Enter Your Email Address"
          onChange={handleChange}
          required
        />
        <br /> <br />
        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter Strong Password"
          onChange={handleChange}
          required
        />
        <br /> <br />
        <label>Confirm Password</label>
        <input
          name="password"
          type="password"
          placeholder="Re-enter Your Password"
          onChange={handleChange}
          required
        />
        <br /> <br />
        <button type="submit">Register</button>
      </form>

      <p className="login-link">
        Already have an account? <a href="/">Login</a>
      </p>
      </div>
    </div>
  );
};

export default RegisterPage;
