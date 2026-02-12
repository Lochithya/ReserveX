import React from 'react';
import { Mail, MapPin, Facebook, Twitter, Instagram, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        {/* Column 1: About */}
        <div className="footer-col">
          <h3 className="footer-logo">BOOKFAIR</h3>
          <p className="footer-desc">
            "CIBF 2026" is the premier literary event in Sri Lanka, 
            connecting world-class publishers with passionate readers.
            Join us for an unforgettable experience.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">QUICK LINKS</h4>
          <ul className="footer-links">
            <li>About Us</li>
            <li>Stall Availability</li>
            <li>Floor Map</li>
            <li>Exhibitor Guidelines</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Column 3: Hours */}
        <div className="footer-col">
          <h4 className="footer-heading">EXHIBITION HOURS</h4>
          <ul className="footer-hours">
            <li><span>Mon - Thursday:</span> 08:00 am - 09:00 pm</li>
            <li><span>Friday:</span> 03:00 pm - 09:00 pm</li>
            <li><span>Sat - Sunday:</span> 08:00 am - 10:00 pm</li>
          </ul>
        </div>

        {/* Column 4: Contact & Newsletter */}
        <div className="footer-col">
          <h4 className="footer-heading">CONTACT</h4>
          <div className="contact-info">
            <p><Mail size={16} /> info@cibf2026.lk</p>
            <p><MapPin size={16} /> BMICH, Colombo, Sri Lanka</p>
          </div>
          <h4 className="footer-heading newsletter-title">NEWS LETTER</h4>
          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email" />
            <button className="newsletter-btn">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Copyright 2026 CIBF. All Rights Reserved.</p>
        <div className="footer-socials">
          <Facebook size={18} />
          <Instagram size={18} />
          <Twitter size={18} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;