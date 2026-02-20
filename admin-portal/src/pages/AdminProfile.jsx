import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminProfile.css";

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@bookfair.lk",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [password, setPassword] = useState({ current: "", new: "", confirm: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handlePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setProfilePicture(URL.createObjectURL(file));
      setMessage("Profile Picture Updated Successfully");
      setMessageType("success");
      setTimeout(() => { setMessage(""); setMessageType(""); }, 3000);
    }
  };

  const handleRemovePicture = () => {
    if (profilePicture) URL.revokeObjectURL(profilePicture);
    setProfilePicture(null);
    setMessage("The Profile Picture Removed Successfully");
    setMessageType("success");
    setTimeout(() => { setMessage(""); setMessageType(""); }, 3000);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setMessage("Profile updated successfully.");
    setMessageType("success");
    setTimeout(() => setMessage(""), 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      setMessage("New passwords do not match.");
      setMessageType("error");
      return;
    }
    setMessage("Password updated successfully.");
    setMessageType("success");
    setPassword({ current: "", new: "", confirm: "" });
    setTimeout(() => { setMessage(""); setMessageType(""); }, 3000);
  };

  return (
    <div className="admin-profile">
      <div className="profile-header">
        <h1>Admin Profile</h1>
        <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
      </div>

      {message && (
        <div className={`profile-message ${messageType === "success" ? "success" : messageType === "error" ? "error" : ""}`}>
          {message}
        </div>
      )}

      <div className="profile-section profile-picture-section">
        <h2>Profile Picture</h2>
        <div className="profile-picture-container">
          <div className="profile-picture-wrapper">
            {profilePicture ? (
              <img src={profilePicture} alt="Admin" className="profile-picture" />
            ) : (
              <div className="profile-picture-placeholder">👤</div>
            )}
          </div>
          <div className="profile-picture-actions">
            <label htmlFor="profile-pic-upload" className="btn btn-outline">
              {profilePicture ? "Change Photo" : "Upload Photo"}
            </label>
            <input
              id="profile-pic-upload"
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              className="profile-pic-input"
            />
            {profilePicture && (
              <button type="button" className="btn btn-outline btn-remove-pic" onClick={handleRemovePicture}>
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="profile-section profile-update-section">
        <div className="profile-forms-row">
          <div className="profile-form-col">
            <h2>Update Profile</h2>
            <form id="profile-form" onSubmit={handleProfileSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">Update Profile</button>
            </form>
          </div>
          <div className="profile-form-col">
            <h2>Change Password</h2>
            <form id="password-form" onSubmit={handlePasswordSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="current">Current Password</label>
                <input
                  type="password"
                  id="current"
                  name="current"
                  value={password.current}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="new">New Password</label>
                <input
                  type="password"
                  id="new"
                  name="new"
                  value={password.new}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm">Confirm New Password</label>
                <input
                  type="password"
                  id="confirm"
                  name="confirm"
                  value={password.confirm}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                />
              </div>
              <button type="submit" className="btn btn-primary">Change Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
