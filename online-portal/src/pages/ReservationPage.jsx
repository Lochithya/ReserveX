import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Required for navigation
import { getAllStalls } from "../services/stall.service"; // Fixed filename dot
import { createReservation } from "../services/reservation.service";
import StallCard from "../components/StallCard";
import "./ReservationPage.css";

const ReservationPage = () => {
  const navigate = useNavigate(); // Hook for redirection
  const [stalls, setStalls] = useState([]);
  const [selectedStalls, setSelectedStalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStalls();
  }, []);

  const fetchStalls = async () => {
    try {
      const res = await getAllStalls();
      setStalls(res.data);
    } catch (error) {
      alert("Failed to load stalls from the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (stallId) => {
    if (selectedStalls.includes(stallId)) {
      setSelectedStalls(selectedStalls.filter((id) => id !== stallId));
    } else {
      // Logic for the 3-stall maximum limit
      if (selectedStalls.length >= 3) {
        alert("As per guidelines, you can reserve a maximum of 3 stalls per business.");
        return;
      }
      setSelectedStalls([...selectedStalls, stallId]);
    }
  };

  const handleReservation = async () => {
    if (selectedStalls.length === 0) {
      alert("Please select at least one stall to proceed.");
      return;
    }

    // Requirement: A pop-up screen for confirmation
    const confirm = window.confirm(
      `Confirm reservation for ${selectedStalls.length} stall(s)? A QR pass will be sent to your email.`
    );

    if (!confirm) return;

    try {
      await createReservation(selectedStalls);
      alert("Reservation successful! Check your email for the unique QR pass.");
      
      setSelectedStalls([]);
      
      // Requirement: Navigate to Home Screen after confirmation
      navigate("/home"); 
    } catch (error) {
      alert("Reservation failed. Please check your connection.");
    }
  };

  if (loading) return <p className="loading">Loading exhibition map...</p>;

  return (
    <div className="reservation-container">
      <h2 className="reservation-title">Exhibition Stall Reservation</h2>
      <p className="reservation-subtitle">Select up to 3 stalls. Reserved stalls are grayed out.</p>

      <div className="stall-grid">
        {stalls.map((stall) => (
          <StallCard
            key={stall.id}
            stall={stall}
            // Logic to pass selection state to the card
            isSelected={selectedStalls.includes(stall.id)}
            onSelect={handleSelect}
            // Ensure reserved stalls cannot be clicked
            disabled={stall.status === 'reserved'} 
          />
        ))}
      </div>

      <button className="confirm-btn" onClick={handleReservation}>
        Confirm Reservation
      </button>
    </div>
  );
};

export default ReservationPage;