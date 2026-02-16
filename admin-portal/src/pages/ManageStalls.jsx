import React, { useState } from "react";
import "./ManageStalls.css";

const STALL_SIZES = ["Small", "Medium", "Large"];
const STALL_STATUSES = ["Available", "Reserved"];

export default function ManageStalls() {
  const [stalls, setStalls] = useState([
    { id: 1, name: "A01", size: "Small", status: "Available" },
    { id: 2, name: "A12", size: "Large", status: "Reserved" },
    { id: 3, name: "B04", size: "Medium", status: "Reserved" },
    { id: 4, name: "C21", size: "Small", status: "Available" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    size: "Small",
    status: "Available",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [removeConfirmId, setRemoveConfirmId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ name: "", size: "Small", status: "Available" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newStall = {
      id: Date.now(),
      name: formData.name.trim(),
      size: formData.size,
      status: formData.status,
    };
    setStalls((prev) => [...prev, newStall]);
    resetForm();
    setSuccessMessage("Stall added successfully");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleEdit = (stall) => {
    setFormData({
      name: stall.name,
      size: stall.size,
      status: stall.status,
    });
    setEditingId(stall.id);
    setShowForm(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setStalls((prev) =>
      prev.map((s) =>
        s.id === editingId
          ? { ...s, name: formData.name.trim(), size: formData.size, status: formData.status }
          : s
      )
    );
    resetForm();
  };

  const handleRemoveClick = (id) => {
    setRemoveConfirmId(id);
  };

  const handleRemoveConfirm = () => {
    if (removeConfirmId != null) {
      setStalls((prev) => prev.filter((s) => s.id !== removeConfirmId));
      if (editingId === removeConfirmId) resetForm();
      setRemoveConfirmId(null);
    }
  };

  const handleRemoveCancel = () => {
    setRemoveConfirmId(null);
  };

  const handleCancel = () => resetForm();

  const filteredStalls = stalls.filter((stall) =>
    stall.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-stalls">
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {removeConfirmId != null && (
        <div className="modal-overlay" onClick={handleRemoveCancel}>
          <div className="modal-confirm" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Remove</h3>
            <p>Are you sure you want to remove this stall?</p>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={handleRemoveCancel}>
                Cancel
              </button>
              <button type="button" className="btn btn-remove" onClick={handleRemoveConfirm}>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="manage-stalls-header">
        <h1>Manage Stalls</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Cancel" : "+ Add Stall"}
        </button>
      </div>

      {showForm && (
        <form
          className="stall-form"
          onSubmit={editingId ? handleUpdate : handleAdd}
        >
          <h2>{editingId ? "Edit Stall" : "Add New Stall"}</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Stall Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. A12, B04"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="size">Size</label>
              <select
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
              >
                {STALL_SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                {STALL_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? "Update Stall" : "Add Stall"}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      <div className="stalls-table-container">
        <div className="table-header-row">
          <h2>All Stalls</h2>
          <div className="search-input-wrapper">
            <svg
              className="search-icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3333 10.3333H10.6267L10.3733 10.0867C11.1733 9.12667 11.6667 7.90667 11.6667 6.58333C11.6667 3.42667 9.07333 0.833333 5.91667 0.833333C2.76 0.833333 0.166667 3.42667 0.166667 6.58333C0.166667 9.74 2.76 12.3333 5.91667 12.3333C7.24 12.3333 8.46 11.84 9.42 11.04L9.66667 11.2933V12L14.1667 16.4867L15.5133 15.14L11.3333 10.3333ZM5.91667 10.3333C3.84 10.3333 2.16667 8.66 2.16667 6.58333C2.16667 4.50667 3.84 2.83333 5.91667 2.83333C7.99333 2.83333 9.66667 4.50667 9.66667 6.58333C9.66667 8.66 7.99333 10.3333 5.91667 10.3333Z"
                fill="#666"
              />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search by stall name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <table className="stalls-table">
          <thead>
            <tr>
              <th>Stall Name</th>
              <th>Size</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStalls.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-message">
                  {stalls.length === 0
                    ? "No stalls yet. Click \"Add Stall\" to create one."
                    : "No stalls found matching your search."}
                </td>
              </tr>
            ) : (
              filteredStalls.map((stall) => (
                <tr key={stall.id}>
                  <td>{stall.name}</td>
                  <td>{stall.size}</td>
                  <td>
                    <span className={`status-badge status-${stall.status.toLowerCase()}`}>
                      {stall.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="btn btn-sm btn-edit"
                      onClick={() => handleEdit(stall)}
                      title="Edit"
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-remove"
                      onClick={() => handleRemoveClick(stall.id)}
                      title="Remove"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
