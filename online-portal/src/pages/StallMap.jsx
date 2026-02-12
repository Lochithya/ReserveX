import React, { useEffect, useState,useMemo } from "react";
import { mockStalls ,mockStalls2} from "../common/mockData";


const StallMap = () => {

  const [stalls,setStalls]= useState([]);
  const [selectedStalls, setSelectedStalls] = useState([]);

  const loadStalls = ()=>{
    setStalls(mockStalls2)
  }

  const totalRows = useMemo(() => {
    if (stalls.length === 0) return 10; // Default minimum
    const maxY = Math.max(...stalls.map((s) => s.gridCol));
    return maxY + 1; 
  }, [stalls]);

  const stats = useMemo(() => {
    const total = stalls.length;
    const reserved = stalls.filter(s => s.isConfirmed === 1).length;
    const available = total - reserved;
    return { total, available, reserved };
  }, [stalls]);

  const getSizeSpans = (size) => {
    switch (size) {
      case "Large": return "col-span-4 row-span-4";  // spans 4 cells wide, 4 high
      case "Medium": return "col-span-2 row-span-2"; // spans 2 cells wide, 2 high
      case "Small": return "col-span-1 row-span-1";  // spans 1 cell
      default: return "col-span-1 row-span-1";
  }}

  useEffect(()=>{
    loadStalls()
  },[])

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

      <div className="lg:flex lg:flex-col lg:justify-center items-center  h-full">
        <div className="overflow-auto mb-6 p-5 max-w-5xl w-full max-h-[70vh] h-full border border-slate-200 rounded-lg bg-white">
              <div className="grid gap-2 min-w-max lg:gap-5" 
                style={{
                      gridAutoColumns: "50px",  // Width of 1 small block
                      gridAutoRows: "50px",     // Height of 1 small block
                      width: "max-content"      // Ensures the grid doesn't shrink
                }}

              >

            {/* ROW LABELS (A, B, C...) */}
            {Array.from({ length: totalRows }).map((_, index) => {
              const rowLetter = String.fromCharCode(65 + index); // 65 = 'A'
              return (
                <div
                  key={`row-label-${index}`}
                  style={{
                    gridColumnStart: 1, // Stick to Column 1
                    gridRowStart: index +1,
                  }}
                  className="flex items-center justify-center font-bold text-slate-400 lg:text-lg"
                >
                  {rowLetter}
                </div>
              );
             })}

                {/* //render stall cards */}
                 {
                    stalls.map((stall)=>{
                      const sizeClass = getSizeSpans(stall.size)   //Not worked when stalls are shrink
                      const isReserved = stall?.isConfirmed === 1

                      return(
                        <div 
                          key={stall.id}
                          style={{
                            gridColumnStart: stall?.gridRow + 1,
                            gridRowStart: stall?.gridCol
                          }}
                          className={`
                            
                            ${isReserved? "bg-slate-200 text-slate-400 border-slate-500 border ":
                              "bg-green-100 text-green-800 border border-green-400 hover:bg-green-500 hover:text-white cursor-pointer hover:shadow-md hover:scale-105"}
                            
                            w-12 h-12 lg:w-15 lg:h-15 rounded-lg
                            
                            flex flex-col items-center justify-center text-xs font-bold transition-all shadow-sm`}
                        >
                              <span className="font-bold text-sm md:text-base leading-none mb-1">{stall.id}</span>
                              <span className="opacity-80 uppercase font-normal">{stall.size}</span>
                        </div>

                      )

                    })
                 }
              </div>
              
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



      {/* summery */}
      <div>
        
                {/* selected stalls - add when clicked*/}
                {/* Reserve Button */}
        
        
      </div>

      {/* description- float when hover */}

      {/* {confirmation box when reserve} */}

      
      
    </div>
  );
};

export default StallMap;
