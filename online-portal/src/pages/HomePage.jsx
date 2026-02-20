import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TicketIcon,
  BuildingStorefrontIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  PlusIcon,
  ClockIcon,
  DocumentArrowDownIcon,
  UserIcon,
  PencilSquareIcon
} from "@heroicons/react/24/outline";
import { AuthContext } from "../contexts/AuthContext";
import { getMyReservations, updateReservationGenres } from "../services/reservation.service"
import toast from "react-hot-toast";
import GenreModal from "../components/GenreModal";

const HomePage = () => {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingRes, setEditingRes] = useState(null); // Which reservation are we editing?
  const [saving, setSaving] = useState(false);



  useEffect(() => {
    loadDashboard()
    console.log(user)
  }, [])

  const loadDashboard = async () => {
    try {
      const data = await getMyReservations();
      setReservations(data);
      console.log(data)
    } catch (error) {
      console.log(error)
      toast.error(error || "Failed to load reservations");
    } finally {
      setLoadingData(false);
    }
  };

  const handleEditClick = (reservation) => {
    setEditingRes(reservation); // Store the whole object (id, current genres, stall name)
    setModalOpen(true);
  };

  const handleSaveGenres = async (reservationId, newGenres) => {
    setSaving(true);
    try {

      const response = await updateReservationGenres(reservationId, newGenres);

      //Optimistic Update (Update UI immediately without reloading)
      const updatedList = reservations.map((res) =>
        res.id === reservationId
          ? { ...res, genres: newGenres } // Update just this row
          : res
      );

      setReservations(updatedList);
      toast.success(response.message || "Genres updated successfully!");
      setModalOpen(false); // Close Modal

    } catch (error) {
      console.error(error);
      toast.error(error || "Failed to save genres");
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* HERO SECTION START */}
      <div className="relative bg-slate-900 text-white overflow-hidden">

        <div
          className="absolute inset-0 z-0 opacity-100 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-blue-900/80"></div>


        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-16">


          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-slate-700/50 pb-8">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-500/30">
                Official Vendor Portal
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
                Colombo International Book Fair
              </h1>
              <p className="text-slate-400 text-sm md:text-base max-w-2xl">
                Organized by the <span className="text-white font-medium">Sri Lanka Book Publishers’ Association</span>.
                The largest exhibition in Sri Lanka, connecting millions of readers with publishers like you.
              </p>
            </div>


            {/* <div className="flex gap-3">
               <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition border border-white/10">
                  <DocumentArrowDownIcon className="w-4 h-4" />
                  Floor Plan.pdf
               </button>
            </div> */}
          </div>


          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-slate-400 text-sm mb-1">Signed in as</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">
                  <UserIcon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white leading-none">{user?.businessName}</h2>
                  <p className="text-xs text-blue-300 mt-1 flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
                    Account Active
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/stallMap")}
              className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg shadow-blue-900/50 transition-all hover:scale-105 active:scale-95"
            >
              <PlusIcon className="w-6 h-6 group-hover:rotate-90 transition-transform" />
              New Reservation
            </button>
          </div>

        </div>
      </div>

      {/* 2. DASHBOARD CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Active Reservations"
            value={user.noOfCurrentBookings}
            icon={<TicketIcon className="w-6 h-6 text-blue-600" />}
            bg="bg-blue-50"
          />
          <StatCard
            title="Total Stalls (Lifetime)"
            value="3"
            icon={<BuildingStorefrontIcon className="w-6 h-6 text-emerald-600" />}
            bg="bg-emerald-50"
          />
          <StatCard
            title="Selected Genres"
            value={selectedGenres.length}
            icon={<BookOpenIcon className="w-6 h-6 text-purple-600" />}
            bg="bg-purple-50"
          />
        </div>



        <div className="max-w-7xl mx-auto px-6 py-8 -mt-8 relative z-20">

          {/* Reservation Table Card */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-semibold text-slate-800">Your Reservations & Genres</h3>
            </div>

            {reservations.length === 0 && !loadingData ? (
              //EMPTY STATE UI
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
                  <TicketIcon className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">No reservations yet</h3>
                <p className="text-slate-500 max-w-sm mx-auto mb-6">
                  You haven't booked any stalls for the upcoming book fair. Secure your spot now!
                </p>
                <button
                  onClick={() => navigate("/stallMap")}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <PlusIcon className="w-5 h-5" />
                  Book a Stall
                </button>
              </div>)
              : (<div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Res ID</th>
                      <th className="px-6 py-3 font-semibold">Stall</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                      <th className="px-6 py-3 font-semibold">Genres Displayed</th>
                      <th className="px-6 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reservations.map((res) => (
                      <tr key={res.id} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-4 font-mono text-slate-500">#{res.id}</td>

                        <td className="px-6 py-4 font-semibold text-slate-700">
                          {res.stalls?.map(s => s.name).join(", ")}
                        </td>

                        <td className="px-6 py-4">
                          <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold border border-emerald-200">
                            {res.status}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          {res.genres && res.genres.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {res.genres.slice(0, 3).map(g => (
                                <span key={g} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100">
                                  {g}
                                </span>
                              ))}
                              {res.genres.length > 3 && (
                                <span className="text-slate-400 pl-1">+{res.genres.length - 3} more</span>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400 italic">No genres added</span>
                          )}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleEditClick(res)}
                            className="text-blue-600 hover:text-blue-800 flex items-center justify-end gap-1 ml-auto"
                          >
                            <PencilSquareIcon className="w-5 h-5" />
                            Select Genres
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>)}
          </div>

        </div>

      </div>

      <GenreModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveGenres}
        reservation={editingRes}
        isLoading={saving}
      />

    </div>
  );
};

//SUB-COMPONENTS

const StatCard = ({ title, value, icon, bg }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
    </div>
    <div className={`p-3 rounded-lg ${bg} bg-opacity-50`}>
      {icon}
    </div>
  </div>
);




export default HomePage;