import React, { useState } from "react";
import "./ReservationPage.css";

function ReservationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: 1,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.pevenDefault();
    console.log("Reservation Date:", formData);
    alert("Reservation Submitted Successfully!");
  };

  return (
    <div className="reservation-container">
      <div className="reservation-card">
        <h2>Make a Reservation</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="guests"
            min="1"
            placeholder="Number of Guests"
            onChange={handleChange}
            required
          />

          <button type="submit">Reserve Now</button>
        </form>
      </div>
    </div>
  );
}

export default ReservationPage;
