import React from "react";
import "./ContactPage.css";

const ContactPage = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p className="intro">
        Have questions or want to get in touch? Fill out the form below and we’ll
        get back to you as soon as possible.
      </p>

      <form className="contact-form">
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" placeholder="Enter your full name" />

        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" placeholder="Enter your email" />

        <label htmlFor="message">Message</label>
        <textarea id="message" rows="5" placeholder="Write your message here"></textarea>

        <button type="submit">Send Message</button>
      </form>

      <div className="contact-info">
        <div className="info-card">
          <h3>Email</h3>
          <p>support@reservex.com</p>
        </div>
        <div className="info-card">
          <h3>Phone</h3>
          <p>+94 11 123 4567</p>
        </div>
        <div className="info-card">
          <h3>Address</h3>
          <p>123 Bookfair Street, Colombo, Sri Lanka</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
