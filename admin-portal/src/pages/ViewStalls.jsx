import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import "./ViewStalls.css";

const SIZE_OPTIONS = [
  { value: "", label: "All sizes" },
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

const HARDCODED_STALLS = [
  { stall_id: 1, stall_name: "Alpha", size: "small", price: 100, is_Confirmed: true },
  { stall_id: 2, stall_name: "Beta", size: "medium", price: 150, is_Confirmed: false },
  { stall_id: 3, stall_name: "Gamma", size: "large", price: 200, is_Confirmed: true },
  { stall_id: 4, stall_name: "Delta", size: "small", price: 100, is_Confirmed: false },
  { stall_id: 5, stall_name: "Epsilon", size: "medium", price: 150, is_Confirmed: true },
  { stall_id: 6, stall_name: "Zeta", size: "large", price: 200, is_Confirmed: false },
  { stall_id: 7, stall_name: "Eta", size: "small", price: 100, is_Confirmed: false },
  { stall_id: 8, stall_name: "Theta", size: "medium", price: 150, is_Confirmed: true },
];

export default function ViewStalls() {
  const [stalls, setStalls] = useState(HARDCODED_STALLS);
  const [sizeFilter, setSizeFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sizeDropdown, setSizeDropdown] = useState("");
  const [orderDropdown, setOrderDropdown] = useState("asc");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/stalls")
      .then((res) => setStalls(res.data))
      .catch((err) => console.error("Error fetching stalls:", err));
  }, []);

  const displayedStalls = useMemo(() => {
    let result = [...stalls];

    if (sizeFilter) {
      const sizeLower = sizeFilter.toLowerCase();
      result = result.filter(
        (stall) => stall.size && String(stall.size).toLowerCase() === sizeLower
      );
    }

    result.sort((a, b) => {
      const aName = (a.stall_name || "").toLowerCase();
      const bName = (b.stall_name || "").toLowerCase();
      const cmp = aName.localeCompare(bName);
      return sortOrder === "asc" ? cmp : -cmp;
    });

    return result;
  }, [stalls, sizeFilter, sortOrder]);

  const applyFilter = () => {
    setSizeFilter(sizeDropdown);
    setSortOrder(orderDropdown);
  };

  const clearFilter = () => {
    setSizeDropdown("");
    setOrderDropdown("asc");
    setSizeFilter("");
    setSortOrder("asc");
  };

  const hasActiveFilter = sizeFilter || sortOrder !== "asc";

  return (
    <div className="view-stalls-page">
      <NavBar />

      <h2 className="view-stalls-title">View Stalls</h2>

      <div className="view-stalls-controls">
        <div className="control-group">
          <label className="control-label">Size</label>
          <select
            className="control-select"
            value={sizeDropdown}
            onChange={(e) => setSizeDropdown(e.target.value)}
          >
            {SIZE_OPTIONS.map((opt) => (
              <option key={opt.value || "all"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="control-group">
          <label className="control-label">Order</label>
          <select
            className="control-select"
            value={orderDropdown}
            onChange={(e) => setOrderDropdown(e.target.value)}
          >
            <option value="asc">A → Z (Ascending)</option>
            <option value="desc">Z → A (Descending)</option>
          </select>
        </div>
        <button type="button" className="filter-btn" onClick={applyFilter}>
          Filter
        </button>
        {hasActiveFilter && (
          <button type="button" className="clear-filter-btn" onClick={clearFilter}>
            Clear
          </button>
        )}
      </div>

      <table className="view-stalls-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Stall Name</th>
            <th>Size</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {displayedStalls.length === 0 ? (
            <tr>
              <td colSpan={5} className="no-data">
                No stalls found.
              </td>
            </tr>
          ) : (
            displayedStalls.map((stall) => (
              <tr key={stall.stall_id}>
                <td>{stall.stall_id}</td>
                <td>{stall.stall_name}</td>
                <td className="capitalize">{stall.size}</td>
                <td>{stall.price}</td>
                <td>
                  <span
                    className={
                      stall.is_Confirmed
                        ? "status-badge reserved"
                        : "status-badge available"
                    }
                  >
                    {stall.is_Confirmed ? "Reserved" : "Available"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
