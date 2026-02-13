import { useState } from "react";
import { register } from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await register(formData);
      alert("Registration successful!");
      navigate("/");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Vendor Registration</h1>
        <p className="text-gray-500 mt-2 max-w-md">
          Join Sri Lanka’s largest literary event. Fill the form below to become a registered vendor.
        </p>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="relative">
            <label className="block text-sm mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter Your First Name"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="relative">
            <label className="block text-sm mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Your Last Name"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="relative">
            <label className="block text-sm mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email Address"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="relative">
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Strong Password"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="relative">
            <label className="block text-sm mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter Your Password"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;
