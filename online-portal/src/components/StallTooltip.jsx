import React from "react";

const StallTooltip = ({ stall, position }) => {
  if (!stall) return null;

  return (
    <div
      className="fixed z-100 animate-fade-in pointer-events-none"
      style={{
        // Desktop - Use cursor coordinates
        left: position.x,
        top: position.y,
      }}
    >
      
      <div className="
        fixed top-24 left-4 right-4 md:static md:w-64
        bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-600
        flex flex-col gap-2
      ">
        
        {/* Header Section */}
        <div className="flex justify-between items-start border-b border-slate-600 pb-2">
          <div>
            <h4 className="font-bold text-green-500 flex items-center gap-2">
              Stall {stall.id}
            </h4>
            <span className="text-sm bg-slate-700 px-2 py-0.5 rounded text-slate-300 uppercase tracking-wide">
              {stall.size} Size
            </span>
          </div>
          <div className="text-right">
            <span className="block font-bold text-white text-lg">
              Rs.{stall.price}
            </span>
            {stall.isConfirmed === 1 ? (
              <span className="text-sm text-red-500 font-bold uppercase">Reserved</span>
            ) : (
              <span className="text-sm text-emerald-400 font-bold uppercase">Available</span>
            )}
          </div>
        </div>

        {/* Body Section */}
        <div className="text-sm text-slate-300">
          <p className="text-sm leading-relaxed opacity-90">
            "{stall?.description || "Standard exhibition stall space with standard amenities."}"
          </p>
        </div>

        {/* Footer (Mobile Only) */}
        <div className="md:hidden pt-2 mt-1 border-t border-slate-700">
          <p className="text-sm text-slate-500 text-center">
            Tap to select this stall
          </p>
        </div>

      </div>
    </div>
  );
};

export default StallTooltip;