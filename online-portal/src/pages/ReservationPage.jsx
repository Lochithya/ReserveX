import { useEffect, useState } from "react";
import { getAllStalls } from "../services/stall.service";
import { createReservation } from "../services/reservation.service";
import StallCard from "../components/StallCard";
import "./ReservationPage.css";

const ReservationPage = () => {
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
      alert("Failed to load stalls");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (stallId) => {
    if (selectedStalls.includes(stallId)) {
      setSelectedStalls(selectedStalls.filter((id) => id !== stallId));
    } else {
      if (selectedStalls.length >= 3) {
        alert("You can reserve maximum 3 stalls only.");
        return;
      }
      setSelectedStalls([...selectedStalls, stallId]);
    }
  };

  const handleReservation = async () => {
    if (selectedStalls.length === 0) {
      alert("Please select at least one stall.");
      return;
    }

    const confirm = window.confirm(
      "Are you sure you want to confirm reservation?"
    );

    if (!confirm) return;

    try {
      await createReservation(selectedStalls);
      alert("Reservation successful! Email with QR code sent.");
      setSelectedStalls([]);
      fetchStalls();
    } catch (error) {
      alert("Reservation failed.");
    }
  };

  if (loading) return <p className="loading">Loading stalls...</p>;

  return (
    <div className="reservation-container">
      <h2 className="reservation-title">Stall Reservation</h2>
      <p className="reservation-subtitle">Select up to 3 stalls</p>

      <div className="stall-grid">
        {stalls.map((stall) => (
          <StallCard
            key={stall.id}
            stall={stall}
            isSelected={selectedStalls.includes(stall.id)}
            onSelect={handleSelect}
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
