import { useState } from "react";
//import { saveGenres } from "../services/genre.service";
import "./HomePage.css";



const HomePage = () => {
  return (
    <div className="home-container">
      <h2>Add Literary Genres</h2>

      <div className="description">
            <h3>Finalize Your Profile</h3>
            <p>
              To help us organize the floor plan and directory, please list the 
              <strong> literary genres</strong> you will be displaying at your stall. 
              This information will be visible to visitors via the official exhibition app.
            </p>
          </div>

      <div className="genre-input-section">
        <input
          type="text"
          placeholder="Enter genre (e.g., Fiction)"
          value={genreInput}
          onChange={(e) => setGenreInput(e.target.value)}
        />
        <button onClick={handleAddGenre}>Add</button>
      </div>

      <div className="genre-list">
        {genres.map((genre, index) => (
          <div key={index} className="genre-item">
            {genre}
            <span onClick={() => handleRemoveGenre(genre)}>✖</span>
          </div>
        ))}
      </div>

      <button className="save-btn" onClick={handleSubmit}>
        Save Genres
      </button>
    </div>
  );
};

export default HomePage;
