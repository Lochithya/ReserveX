import React, { useEffect, useState, useMemo, useContext } from "react";
import { mockStalls, mockStalls2, mockStallE } from "../common/mockData";
import BookingSummary from "../components/BookingSummary";
import StallTooltip from "../components/StallToolTip";
import StallGrid from "../components/StallGrid";
import { getAllStalls } from "../services/stall.service";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContext";
import ReservationModal from "../components/ReservationModal";
import { createReservation } from "../services/reservation.service";
import { useNavigate } from "react-router-dom";

const StallMap = () => {

  const { user, login } = useContext(AuthContext);
  const [stalls, setStalls] = useState([]);
  const [selectedStalls, setSelectedStalls] = useState([]);
  const [hoveredStall, setHoveredStall] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReserving, setIsReserving] = useState(false);
  const navigate = useNavigate()
  // console.log(selectedStalls)

  const existingBookings = user?.no_of_current_bookings || 0;
  const REMAINING_QUOTA = 3 - existingBookings;

  const fetchStalls = async () => {
    try {
      setIsLoading(true);
      const data = await getAllStalls();
      setStalls(data);

    } catch (errorMessage) {
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  const handleConfirmReservation = async () => {
    setIsReserving(true);
    try {

      const response = await createReservation(selectedStalls);

      toast.success(response.message || "Reservation Confirmed! QR Code sent to email.");

      setSelectedStalls([]);
      setIsModalOpen(false);
      fetchStalls();

      //increment it manually in the frontend context to be fast
      const updatedUser = {
        ...user,
        no_of_current_bookings: user.no_of_current_bookings + selectedStalls.length
      };
      login(updatedUser, localStorage.getItem("token"));
      navigate("/home")

    } catch (error) {
      toast.error(error || "Reservation Failed. Please try again.");
    } finally {
      setIsReserving(false);
    }

  }



  // const loadData=()=>{
  //   setStalls(mockStalls)
  //   console.log(mockStalls)
  //   setIsLoading(false);
  // }

  useEffect(() => {
    fetchStalls()
  }, [])

  const totalRows = useMemo(() => {
    if (stalls.length === 0) return 10; // Default minimum
    const maxY = Math.max(...stalls.map((s) => s.gridCol));
    return maxY + 1;
  }, [stalls]);

  const stats = useMemo(() => {
    const total = stalls.length
    const reserved = stalls.filter(s => s.reserved === true).length;
    const available = total - reserved;
    return { total, available, reserved };
  }, [stalls]);



  //SELECTION LOGIC
  const handleStallClick = (stall) => {

    if (stall.reserved === true) return;

    const isSelected = selectedStalls.some((s) => s.id === stall.id);

    if (isSelected) {
      setSelectedStalls(selectedStalls.filter((s) => s.id !== stall.id));

    } else {
      // Check stall limits (3 per one user)
      if (selectedStalls.length >= 3) {
        toast.error("You have already reached the limit of 3 reserved stalls.");
        return;
      }

      if (selectedStalls.length >= REMAINING_QUOTA) {
        toast.error(`You have ${existingBookings} active reservations. You can only select ${REMAINING_QUOTA} more.`);
        return;
      }
      setSelectedStalls([...selectedStalls, stall]);
    }
  };


  // Desktop Mouse Handlers-----------
  const handleMouseEnter = (stall, e) => {
    setHoveredStall(stall);
    moveCursor(e);
  };

  const handleMouseMove = (e) => { if (hoveredStall) moveCursor(e); };

  const handleMouseLeave = () => { setHoveredStall(null); };

  const moveCursor = (e) => {
    // Offset by 15px - the tooltip doesn't block the mouse
    setCursorPos({ x: e.clientX + 15, y: e.clientY + 15 });
  };
  //-------------------------------------------


  const handleReserve = () => {
    setIsModalOpen(true); //open pop up
  };



  return (
    <div className="flex flex-col item-center min-h-screen bg-gray-10 p-10 lg:py-5">


      {/* title */}
      <div className="w-full mx-auto px-4 mb-6 flex flex-col md:flex-row md:justify-between items-center gap-4">


        <h3 className="text-blue-900 text-2xl font-bold text-center md:text-left">
          Stall Reservation Map
        </h3>

        <div className="flex flex-wrap justify-center gap-3 text-sm font-medium">
          <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-slate-200 text-slate-600 whitespace-nowrap">
            Total: <strong>{stats.total}</strong>
          </span>
          <span className="bg-emerald-50 px-3 py-1 rounded-full shadow-sm border border-emerald-200 text-emerald-700 whitespace-nowrap">
            Available: <strong>{stats.available}</strong>
          </span>
          <span className="bg-slate-100 px-3 py-1 rounded-full shadow-sm border border-slate-200 text-slate-500 whitespace-nowrap">
            Reserved: <strong>{stats.reserved}</strong>
          </span>
        </div>
      </div>


      {/* map */}

      <div className="lg:flex lg:flex-col lg:justify-center items-center h-full">
        <div className="overflow-auto mb-6 p-5 max-w-5xl w-full max-h-[70vh] h-full border border-slate-200 rounded-lg bg-white">

          {/* --- NEW COMPONENT: STALL GRID --- */}
          <StallGrid
            stalls={stalls}
            isLoading={isLoading}
            totalRows={totalRows}
            selectedStalls={selectedStalls}
            handleStallClick={handleStallClick}
            handleMouseEnter={handleMouseEnter}
            handleMouseMove={handleMouseMove}
            handleMouseLeave={handleMouseLeave}
            setHoveredStall={setHoveredStall}
          />

        </div>
      </div>


      {/* legend */}
      <div className="flex flex-wrap justify-center gap-6 mb-6 p-4 bg-gray-50 rounded-lg">

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-emerald-100 border border-emerald-300"></div>
          <span className="text-slate-600 text-sm">Available</span>
        </div>


        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-slate-100 border border-slate-200"></div>
          <span className="text-slate-600 text-sm">Reserved</span>
        </div>


        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-blue-500 border border-blue-600 shadow-sm"></div>
          <span className="text-slate-600 text-sm">Selected</span>
        </div>
      </div>


      {/*Instructions*/}
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8 mb-6 text-sm text-slate-500">
        <p className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">1</span>
          Tap <span className="font-bold text-emerald-600">Green Stalls</span> to select
        </p>
        <p className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">2</span>
          Select up to <span className="font-bold text-slate-700">3 Stalls</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-xs">3</span>
          Hover for price & details
        </p>
      </div>

      {/* summery */}
      <BookingSummary
        selectedStalls={selectedStalls}
        onReserve={handleReserve}
        quota={REMAINING_QUOTA}
      />

      {/* description- float when hover */}
      <StallTooltip stall={hoveredStall} position={cursorPos} />


      {/* {confirmation box when reserve} */}
      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmReservation}
        selectedStalls={selectedStalls}
        isLoading={isReserving}
      />



    </div>
  );
};

export default StallMap;
