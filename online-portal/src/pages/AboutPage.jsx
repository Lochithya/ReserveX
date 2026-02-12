import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <h2>About Colombo International Bookfair</h2>
      <p>
        Colombo International Bookfair is the largest book exhibition in Sri
        Lanka, organized by the Sri Lanka Book Publishers’ Association.
      </p>

      <div className="about-section">
        <h3>Our Mission</h3>
        <p>
          To promote reading culture and provide a platform for publishers, authors
          and readers to connect and explore.
        </p>
      </div>

      <div className="about-section">
        <h3>Events & Activities</h3>
        <p>
          Workshops, author meetups, storytelling sessions and book launches
          are conducted every year to engage the public.
        </p>
      </div>

      <div className="about-section">
        <h3>Visitors & Exhibitors</h3>
        <p>
          Thousands of visitors from Sri Lanka and abroad attend annually,
          making it a truly international experience.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
