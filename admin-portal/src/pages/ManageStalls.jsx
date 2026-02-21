import React, { useEffect, useState, useCallback } from "react";
import NavBar from "../components/NavBar";
import {
  fetchStalls,
  checkStallName,
  addStall,
  updateStall,
  deleteStall,
} from "../services/manageStalls.service";
import "./ManageStalls.css";

const STALL_SIZES = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

const getReservedStatus = (stall) =>
  stall?.reserved === true ||
  stall?.confirmed === true ||
  stall?.is_Confirmed === true;

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debouncedValue;
}

export default function ManageStalls() {
  const [stalls, setStalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    size: "small",
    price: 0,
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [removeConfirmId, setRemoveConfirmId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [nameTaken, setNameTaken] = useState(false);
  const [nameChecking, setNameChecking] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedName = useDebounce(formData.name, 400);

  const loadStalls = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchStalls();
      setStalls(data || []);
    } catch (err) {
      console.error("Error loading stalls:", err);
      setStalls([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStalls();
  }, [loadStalls]);

  useEffect(() => {
    if (!showForm || !debouncedName.trim()) {
      setNameTaken(false);
      return;
    }
    let cancelled = false;
    setNameChecking(true);
    checkStallName(debouncedName, editingId)
      .then((res) => {
        if (!cancelled) setNameTaken(res?.taken ?? false);
      })
      .catch(() => {
        if (!cancelled) setNameTaken(false);
      })
      .finally(() => {
        if (!cancelled) setNameChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedName, editingId, showForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
  };

  const resetForm = () => {
    setFormData({ name: "", size: "small", price: 0 });
    setEditingId(null);
    setShowForm(false);
    setNameTaken(false);
    setErrorMessage("");
  };

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    if (nameTaken) {
      setErrorMessage("Stall name already exists. Please choose a different name.");
      return;
    }
    setSubmitLoading(true);
    setErrorMessage("");
    try {
      await addStall({
        name: formData.name.trim(),
        size: formData.size,
        price: Number(formData.price) || 0,
      });
      showSuccess("Stall added successfully");
      resetForm();
      loadStalls();
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to add stall.";
      setErrorMessage(msg);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = (stall) => {
    setFormData({
      name: stall.name ?? stall.stall_name ?? "",
      size: (stall.size ?? "small").toLowerCase(),
      price: stall.price ?? 0,
    });
    setEditingId(stall.id ?? stall.stall_id);
    setShowForm(true);
    setErrorMessage("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !editingId) return;
    if (nameTaken) {
      setErrorMessage("Stall name already exists. Please choose a different name.");
      return;
    }
    setSubmitLoading(true);
    setErrorMessage("");
    try {
      await updateStall(editingId, {
        name: formData.name.trim(),
        size: formData.size,
        price: Number(formData.price) || 0,
      });
      showSuccess("Stall updated successfully");
      resetForm();
      loadStalls();
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to update stall.";
      setErrorMessage(msg);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleRemoveClick = (id) => {
    setRemoveConfirmId(id);
  };

  const handleRemoveConfirm = async () => {
    if (removeConfirmId == null) return;
    setSubmitLoading(true);
    try {
      await deleteStall(removeConfirmId);
      showSuccess("Stall removed successfully");
      if (editingId === removeConfirmId) resetForm();
      setRemoveConfirmId(null);
      loadStalls();
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to remove stall.";
      setSuccessMessage("");
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(""), 4000);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleRemoveCancel = () => {
    setRemoveConfirmId(null);
  };

  const handleCancel = () => resetForm();

  const hasNameError = nameTaken && formData.name.trim().length > 0;
  const canSubmit = !hasNameError && !nameChecking && !submitLoading && formData.name.trim();

  const filteredStalls = stalls.filter((stall) => {
    const name = stall.name ?? stall.stall_name ?? "";
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="manage-stalls-background">
      <NavBar />

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}

      {removeConfirmId != null && (
        <div className="modal-overlay" onClick={handleRemoveCancel}>
          <div className="modal-confirm" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Remove</h3>
            <p>Are you sure you want to remove this stall? If it is reserved, the vendor will be notified by email.</p>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={handleRemoveCancel}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-remove"
                onClick={handleRemoveConfirm}
                disabled={submitLoading}
              >
                {submitLoading ? "Removing..." : "Remove"}
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
          className="stall-form stall-form-clean"
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
                className={hasNameError ? "input-error" : ""}
              />
              {nameChecking && (
                <span className="field-hint">Checking availability...</span>
              )}
              {hasNameError && (
                <span className="field-error">This stall name is already in use.</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="size">Size</label>
              <select id="size" name="size" value={formData.size} onChange={handleChange}>
                {STALL_SIZES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="price">Price (LKR)</label>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!canSubmit}
            >
              {submitLoading
                ? "Saving..."
                : editingId
                ? "Update Stall"
                : "Add Stall"}
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
            <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        {loading ? (
          <p className="table-loading">Loading stalls...</p>
        ) : (
          <table className="stalls-table">
            <thead>
              <tr>
                <th>Stall Name</th>
                <th>Size</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStalls.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-message">
                    {stalls.length === 0
                      ? "No stalls yet. Click \"Add Stall\" to create one."
                      : "No stalls found matching your search."}
                  </td>
                </tr>
              ) : (
                filteredStalls.map((stall) => {
                  const stallId = stall.id ?? stall.stall_id;
                  const stallName = stall.name ?? stall.stall_name;
                  const reserved = getReservedStatus(stall);
                  return (
                    <tr key={stallId}>
                      <td>{stallName}</td>
                      <td className="capitalize">{String(stall.size || "").toLowerCase()}</td>
                      <td>{stall.price != null ? stall.price : "—"}</td>
                      <td>
                        <span
                          className={`status-badge status-${reserved ? "reserved" : "available"}`}
                        >
                          {reserved ? "Reserved" : "Available"}
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
                          onClick={() => handleRemoveClick(stallId)}
                          title="Remove"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
