import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { saveGenres } from "../services/genre.service";
import "./HomePage.css";



const HomePage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();   // stop refresh

    navigate("/reserve");   // go to ReservationPage
  };

  return (
    <div className="home-wrapper">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>BOOK FAIR STALL RESERVATION</h1>
          <p>Stall Booking</p>
        </div>
      </section>

      {/* RESERVATION FORM SECTION */}
      <section className="reservation-section">
        <h2>RESERVE YOUR STALL</h2>
        <p className="subtitle">
          Reserve your exhibition stall for the upcoming Book Fair event.
        </p>

        <form className="reservation-form" onSubmit={handleSubmit}>
          <div className="form-grid">

            <input type="date" placeholder="Event Date" />
            <input type="text" placeholder="Organization / Publisher Name" />

            <input type="email" placeholder="Email Address" />
            <input type="number" placeholder="Number of Stalls (Max 3)" />

            <input type="time" placeholder="Arrival Time" />
            <input type="text" placeholder="Phone Number" />

          </div>

          <textarea
            placeholder="Description (Books category, special requirements etc.)"
            maxLength="1000"
          ></textarea>

          <button type="submit" className="book-btn">
            RESERVE STALL →
          </button>
        </form>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section">
        <h2>CONTACT US</h2>
        <p className="subtitle">
          For inquiries about stall reservations and book fair participation.
        </p>

        <div className="contact-grid">

          <div className="contact-card">
            <h4>Email Us</h4>
            <p>info@bookfair.lk</p>
            <p>support@bookfair.lk</p>
          </div>

          <div className="contact-card">
            <h4>Call Us</h4>
            <p>+94 71 234 5678</p>
            <p>+94 11 345 6789</p>
          </div>

          <div className="contact-card">
            <h4>Visit Us</h4>
            <p>BMICH Exhibition Hall</p>
            <p>Colombo, Sri Lanka</p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomePage;

