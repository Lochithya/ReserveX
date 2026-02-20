import React, { useState, useEffect } from "react";
import { getAllGenres } from "../services/genre.service";
import { XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const GenreModal = ({ isOpen, onClose, onSave, reservation, isSaving }) => {
  const [availableGenres, setAvailableGenres] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoadingGenres, setIsLoadingGenres] = useState(true);


  useEffect(() => {
    if (isOpen && reservation) {
      loadGenres();
      // Pre-select the genres this reservation already has
      setSelected(reservation.genres || []);
    }
  }, [isOpen, reservation]);

  const loadGenres = async () => {
    setIsLoadingGenres(true);
    try {
      const genres = await getAllGenres();
      console.log("Available genres:", genres);
      setAvailableGenres(genres);
    } catch (error) {
      toast.error(error || "Could not load genre list");
    } finally {
      setIsLoadingGenres(false);
    }
  };

  //Toggle Logic
  const toggleGenre = (genreName) => {
    if (selected.includes(genreName)) {
      setSelected(selected.filter(g => g !== genreName));
    } else {
      setSelected([...selected, genreName]);
    }
  };

  if (!isOpen || !reservation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>


      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-up">


        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-800">Manage Genres</h3>
            <p className="text-xs text-slate-500">
              For Stall: <span className="font-semibold text-blue-600">{reservation.stalls?.map(s => s.name).join(", ")}</span>
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-sm text-slate-500 mb-4">
            Select the categories being sold at this specific stall.
          </p>

          {isLoadingGenres ? (

            <div className="flex gap-2 flex-wrap animate-pulse">
              <div className="h-8 w-20 bg-slate-200 rounded-full"></div>
              <div className="h-8 w-24 bg-slate-200 rounded-full"></div>
              <div className="h-8 w-16 bg-slate-200 rounded-full"></div>
            </div>
          ) : (

            <div className="flex flex-wrap gap-2">
              {availableGenres.map((g) => {
                const isSelected = selected.includes(g.name);
                return (
                  <button
                    key={g.id}
                    onClick={() => toggleGenre(g.name)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                      ${isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
                        : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50"}
                    `}
                  >
                    {g.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="text-sm font-medium text-slate-500 hover:text-slate-700 px-4">
            Cancel
          </button>
          <button
            onClick={() => onSave(reservation.id, selected)}
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2 rounded-lg shadow-sm disabled:opacity-70 flex items-center gap-2"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default GenreModal;