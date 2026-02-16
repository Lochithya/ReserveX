import React from "react";
import { 
  ShieldCheckIcon, 
  CalendarDaysIcon, 
  MapPinIcon, 
  InformationCircleIcon, 
  XMarkIcon 
} from "@heroicons/react/24/outline";

const ReservationModal = ({ isOpen, onClose, onConfirm, selectedStalls, isLoading }) => {
  if (!isOpen) return null;

  // Calculate Total
  const totalPrice = selectedStalls.reduce((sum, stall) => sum + stall.price, 0);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      
      {/* 1. Backdrop (Blurry & Dark) */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-up">
        

        {/* Close Button (Top Right) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <XMarkIcon className="w-7 h-7 font-bold" />
        </button>

        <div className="p-8">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full mb-4">
              <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Review Your Reservation</h2>
            <p className="text-slate-500 text-sm mt-1">
              Please double-check your selected stalls before confirming.
            </p>
          </div>

          {/* Stall List Container */}
          <div className="bg-slate-50 rounded-xl border border-slate-100 p-5 mb-6">
            
            <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              <span>Stall Details</span>
              <span>Amount</span>
            </div>

            <div className="space-y-3 mb-4">
              {selectedStalls.map((stall) => (
                <div key={stall.id} className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3">
                    {/* ID Badge */}
                    <div className="w-8 h-8 rounded bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm p-3">
                      {stall?.id} 
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700 text-sm">{stall.stall_name}</p>
                      <p className="text-xs text-slate-400">{stall?.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                     <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200 uppercase font-medium">
                        {stall.size}
                     </span>
                     <span className="font-semibold text-slate-700 text-sm">
                        Rs. {stall.price.toLocaleString()}
                     </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Line */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-200 border-dashed">
              <span className="font-bold text-slate-700">Total Investment</span>
              <span className="font-bold text-blue-600 text-xl">
                Rs. {totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        

          {/* Footer Note */}
          <div className="flex gap-2 text-sm text-slate-400 mb-8 bg-blue-50/50 p-3 rounded-lg">
            <InformationCircleIcon className="w-4 h-4 shrink-0 text-blue-400" />
            <p>
              By confirming, you agree to the Exhibitor Terms & Conditions. An invoice with QR Code will be sent to your email.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition text-sm"
            >
              Modify Selection
            </button>
            <button 
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 flex justify-center items-center gap-2 text-sm"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>Confirm & Reserve</>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReservationModal;