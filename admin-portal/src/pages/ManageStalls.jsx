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
        <h2>All Stalls</h2>
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
            {stalls.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-message">
                  No stalls yet. Click "Add Stall" to create one.
                </td>
              </tr>
            ) : (
              stalls.map((stall) => (
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
