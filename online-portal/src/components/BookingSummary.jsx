import React from "react";

const BookingSummary = ({ selectedStalls, onReserve, quota }) => {

  if (selectedStalls?.length === 0) return null;

  // Calculate Total Price
  const totalPrice = selectedStalls?.reduce((sum, stall) => sum + stall.price, 0);

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 animate-slide-up">


      <div className="bg-white border-t border-slate-200 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-4 py-4 md:px-8 md:py-6">

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 items-center justify-between">


          <div className="w-full lg:w-3/5">
            <div className="flex justify-between items-center mb-3">
              <p className=" text-slate-600 uppercase tracking-wider">
                Selected Stalls ({selectedStalls?.length})
              </p>
              <div className="text-center mb-2 text-red-500">
                Your Limit: <span className="font-bold text-blue-600">{selectedStalls.length}</span> / {quota} available slots
              </div>
              <span className="text-xs text-slate-400 lg:hidden">
                Scroll right for more
              </span>
            </div>


            <div className="flex gap-4 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
              {selectedStalls?.map((stall) => (
                <div
                  key={stall.id}
                  className="shrink-0 w-70 md:w-[320px] bg-slate-50 border border-slate-200 rounded-xl p-3 flex gap-3 shadow-sm"
                >
                  {/* ID Box */}
                  <div className="flex flex-col items-center justify-center bg-white border border-slate-200 rounded-lg w-12 h-12 shrink-0">
                    <span className="text-blue-600 font-bold text-lg">{stall?.name}</span>
                  </div>

                  {/*Details */}
                  <div className="flex flex-col justify-center overflow-hidden">
                    <div className="flex justify-between items-center gap-2">
                      <span className="font-semibold text-slate-800 text-sm truncate">
                        {stall?.size} Stall
                      </span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Rs. {stall?.price.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 truncate mt-1" title={stall?.description}>
                      {stall?.description || "No description available."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>


          <div className="w-full lg:w-auto flex flex-row lg:flex-row items-center justify-between gap-6 border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0">

            <div className="text-left lg:text-right">
              <p className="text-xs text-slate-500 mb-1 uppercase font-semibold">Total Amount</p>
              <p className="text-2xl md:text-3xl font-bold text-slate-800">
                Rs. {totalPrice.toLocaleString()}
              </p>
            </div>

            <button
              onClick={onReserve}
              className="flex-1 lg:flex-none bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 md:py-4 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Reserve Now
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingSummary;