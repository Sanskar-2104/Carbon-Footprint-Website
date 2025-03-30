import React from "react";
import { MapPin, Linkedin, User, Signature } from "lucide-react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="sidebar">
      <div className="profile-section">
        <div className="avatar">
          <User size={40} />
        </div>
        <h2>Amit Thakur</h2>
        <div className="info-item">
            <Signature size={18} />
            <span>thakuras15</span>
          </div>
        <div className="info">
          <div className="info-item">
            <MapPin size={18} />
            <span>Location</span>
          </div>
          <div className="info-item">
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;