// import React from "react";
// import { MapPin, Linkedin, User, Signature } from "lucide-react";
// import "./Profile.css";

// const Profile = () => {
//   return (
//     <div className="profile-sidebar">
//       <div className="profile-section">
//         <div className="avatar">
//           <User size={40} />
//         </div>
//         <h2>Aadhya Shah</h2>
//         <div className="info-item">
//             <Signature size={18} />
//             <span>shahaadhya21</span>
//           </div>
//         <div className="info">
//           <div className="info-item">
//             <MapPin size={18} />
//             <span>Location</span>
//           </div>
//           <div className="info-item">
//             <Linkedin size={18} />
//             <span>LinkedIn</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;




import React, { useState } from "react";
import { 
  MapPin, 
  Linkedin, 
  User, 
  Signature, 
  Github, 
  Mail, 
  Activity, 
  BarChart4, 
  Leaf, 
  Calendar,
  ChevronDown,
  ChevronUp,
  Heart,
  Car,
  Lightbulb,
  ShoppingBag
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from "recharts";
import "./Profile.css";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSections, setExpandedSections] = useState({
    personalInfo: true,
    todayStats: true,
    historyStats: true,
    achievements: true
  });

  // Sample data for charts
  const weeklyData = [
    { name: 'Mon', carbon: 24 },
    { name: 'Tue', carbon: 18 },
    { name: 'Wed', carbon: 32 },
    { name: 'Thu', carbon: 27 },
    { name: 'Fri', carbon: 19 },
    { name: 'Sat', carbon: 15 },
    { name: 'Sun', carbon: 12 },
  ];

  const monthlyData = [
    { name: 'Week 1', carbon: 85 },
    { name: 'Week 2', carbon: 102 },
    { name: 'Week 3', carbon: 92 },
    { name: 'Week 4', carbon: 76 },
  ];

  const categoryData = [
    { name: 'Transport', value: 35, fill: '#83c5be' },
    { name: 'Food', value: 25, fill: '#e29578' },
    { name: 'Energy', value: 22, fill: '#006d77' },
    { name: 'Shopping', value: 18, fill: '#ffddd2' },
  ];

  const achievements = [
    { id: 1, title: "First Milestone", description: "Reduced carbon footprint by 10%", date: "March 15, 2025", icon: <Leaf size={24} /> },
    { id: 2, title: "Eco-transport", description: "Used public transport for a week", date: "March 20, 2025", icon: <Car size={24} /> },
    { id: 3, title: "Energy Saver", description: "Reduced home energy usage by 15%", date: "March 28, 2025", icon: <Lightbulb size={24} /> },
  ];

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  return (
    <div className="profile-page">
      <div className="profile-sidebar">
        <div className="profile-section">
          <div className="avatar">
            <User size={40} />
          </div>
          <h2>Aadhya Shah</h2>
          <div className="username-container">
            <Signature size={18} />
            <span className="username">shahaadhya21</span>
          </div>
          
          <div className="tab-navigation">
            <button 
              className={activeTab === "overview" ? "active" : ""} 
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button 
              className={activeTab === "stats" ? "active" : ""} 
              onClick={() => setActiveTab("stats")}
            >
              Statistics
            </button>
            <button 
              className={activeTab === "achievements" ? "active" : ""} 
              onClick={() => setActiveTab("achievements")}
            >
              Achievements
            </button>
          </div>

          <div className="info">
            <div className="info-item">
              <MapPin size={18} />
              <span>Mumbai, India</span>
            </div>
            <div className="info-item">
              <Mail size={18} />
              <span>aadhya.shah@example.com</span>
            </div>
            <div className="info-item">
              <Linkedin size={18} />
              <span>linkedin.com/in/aadhyashah</span>
            </div>
            {/* <div className="info-item">
              <Github size={18} />
              <span>github.com/aadhyashah</span>
            </div> */}
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="section-header">
          <h2>Carbon Footprint Dashboard</h2>
          <div className="eco-score">
            <div className="score-circle">82</div>
            <div className="score-text">
              <h3>Eco Score</h3>
              <p>Great progress!</p>
            </div>
          </div>
        </div>

        {activeTab === "overview" && (
          <>
            {/* Personal Info Section */}
            <div className="card">
              <div className="card-header" onClick={() => toggleSection("personalInfo")}>
                <h3>Personal Information</h3>
                {expandedSections.personalInfo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {expandedSections.personalInfo && (
                <div className="card-content">
                  <div className="personal-info-grid">
                    <div className="info-group">
                      <label>Full Name</label>
                      <p>Aadhya Shah</p>
                    </div>
                    <div className="info-group">
                      <label>Username</label>
                      <p>shahaadhya21</p>
                    </div>
                    <div className="info-group">
                      <label>Email</label>
                      <p>aadhya.shah@example.com</p>
                    </div>
                    <div className="info-group">
                      <label>Location</label>
                      <p>Mumbai, India</p>
                    </div>
                    <div className="info-group">
                      <label>Member Since</label>
                      <p>January 15, 2025</p>
                    </div>
                    <div className="info-group">
                      <label>Carbon Goals</label>
                      <p>Reduce by 30% this year</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Today's Statistics */}
            <div className="card">
              <div className="card-header" onClick={() => toggleSection("todayStats")}>
                <h3>Today's Carbon Footprint</h3>
                {expandedSections.todayStats ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {expandedSections.todayStats && (
                <div className="card-content">
                  <div className="stats-grid">
                    <div className="stat-card">
                      <Car size={24} />
                      <h4>Transport</h4>
                      <p className="stat-value">2.5 kg CO₂</p>
                      <p className="stat-change decrease">-15% vs. avg</p>
                    </div>
                    <div className="stat-card">
                      <Heart size={24} />
                      <h4>Food</h4>
                      <p className="stat-value">1.8 kg CO₂</p>
                      <p className="stat-change decrease">-8% vs. avg</p>
                    </div>
                    <div className="stat-card">
                      <Lightbulb size={24} />
                      <h4>Energy</h4>
                      <p className="stat-value">3.2 kg CO₂</p>
                      <p className="stat-change increase">+5% vs. avg</p>
                    </div>
                    <div className="stat-card">
                      <ShoppingBag size={24} />
                      <h4>Shopping</h4>
                      <p className="stat-value">0.8 kg CO₂</p>
                      <p className="stat-change decrease">-12% vs. avg</p>
                    </div>
                  </div>
                  <div className="today-chart">
                    <h4>Category Distribution</h4>
                    <div className="chart-container">
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={categoryData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" />
                          <Tooltip />
                          <Bar dataKey="value" nameKey="name" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* History Chart */}
            <div className="card">
              <div className="card-header" onClick={() => toggleSection("historyStats")}>
                <h3>Carbon Footprint History</h3>
                {expandedSections.historyStats ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {expandedSections.historyStats && (
                <div className="card-content">
                  <div className="history-chart">
                    <h4>Weekly Trend</h4>
                    <div className="chart-container">
                      <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={weeklyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="carbon" stroke="#006d77" fill="#83c5be" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="history-chart">
                    <h4>Monthly Trend</h4>
                    <div className="chart-container">
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="carbon" fill="#e29578" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Achievements Section */}
            <div className="card">
              <div className="card-header" onClick={() => toggleSection("achievements")}>
                <h3>Recent Achievements</h3>
                {expandedSections.achievements ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {expandedSections.achievements && (
                <div className="card-content">
                  <div className="achievements-list">
                    {achievements.map(achievement => (
                      <div className="achievement-item" key={achievement.id}>
                        <div className="achievement-icon">
                          {achievement.icon}
                        </div>
                        <div className="achievement-content">
                          <h4>{achievement.title}</h4>
                          <p>{achievement.description}</p>
                          <div className="achievement-date">
                            <Calendar size={14} />
                            <span>{achievement.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "stats" && (
          <div className="detailed-stats">
            <h3>Detailed Statistics</h3>
            <p>More detailed statistics view goes here...</p>
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="all-achievements">
            <h3>All Achievements</h3>
            <p>Complete achievements view goes here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
