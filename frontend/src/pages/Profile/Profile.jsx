import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  User,
  Signature,
  Mail,
  Calendar,
  ChevronDown,
  ChevronUp,
  Utensils,
  Car,
  Lightbulb,
  ShoppingBag,
  Edit2,
  Save,
  X,
} from 'lucide-react';
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
} from 'recharts';
import Swal from 'sweetalert2';
import './Profile.css';
import { apiUrl } from '../../config/api';
import AchievementBadge from '../../components/AchievementBadge/AchievementBadge';
import { showAchievementNotifications } from '../../components/AchievementNotification/AchievementNotification';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({
    personalInfo: true,
    todayStats: true,
    historyStats: true,
    achievements: true,
  });

  const [user, setUser] = useState(null);
  const [footprints, setFootprints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState([]);

  // Edit Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({ name: '', location: '', carbonGoal: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/auth');
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const [profileRes, historyRes] = await Promise.all([
          fetch(apiUrl('/api/user/profile'), { headers }),
          fetch(apiUrl('/api/footprint/history'), { headers }),
        ]);

        const achievementsRes = await fetch(apiUrl('/api/achievement/all'), { headers });

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setUser(profileData);
          setEditFormData({
            name: profileData.name || '',
            location: profileData.location || '',
            carbonGoal: profileData.carbonGoal || '',
          });
        } else {
          // Token might be invalid
          localStorage.removeItem('token');
          navigate('/auth');
        }

        if (historyRes.ok) {
          const historyData = await historyRes.json();
          setFootprints(historyData.footprints || []);

          if (achievementsRes.ok) {
            const achievementsData = await achievementsRes.json();
            setAchievements(achievementsData);
          }

          // Check for newly earned achievements and notify the user
          try {
            const checkRes = await fetch(apiUrl('/api/achievement/check'), {
              method: 'POST',
              headers,
            });
            if (checkRes.ok) {
              const checkData = await checkRes.json();
              if (checkData.newBadges && checkData.newBadges.length > 0) {
                await showAchievementNotifications(checkData.newBadges);

                // Refresh profile and achievements after awarding badges
                const refreshedProfile = await fetch(apiUrl('/api/user/profile'), { headers });
                if (refreshedProfile.ok) {
                  const refreshedData = await refreshedProfile.json();
                  setUser(refreshedData);
                  setEditFormData({
                    name: refreshedData.name || '',
                    location: refreshedData.location || '',
                    carbonGoal: refreshedData.carbonGoal || '',
                  });
                }

                const refreshedAchievements = await fetch(apiUrl('/api/achievement/all'), {
                  headers,
                });
                if (refreshedAchievements.ok) {
                  const refreshedAchievementsData = await refreshedAchievements.json();
                  setAchievements(refreshedAchievementsData);
                }
              }
            }
          } catch (err) {
            console.error('Error checking achievements:', err);
          }
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(apiUrl('/api/user/profile'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editFormData),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setIsEditing(false);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Profile updated successfully',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: data.message || 'Update failed',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'An error occurred',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-page" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Derived Data
  const today = new Date();
  const todayFootprint = footprints.find((f) => {
    const fDate = new Date(f.date);
    return (
      fDate.getDate() === today.getDate() &&
      fDate.getMonth() === today.getMonth() &&
      fDate.getFullYear() === today.getFullYear()
    );
  }) || { transport: 0, food: 0, energy: 0, shopping: 0, total: 0 };

  const historyData = footprints.slice(-7).map((f) => ({
    name: new Date(f.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    carbon: f.total,
  }));

  const categoryData = [
    { name: 'Transport', value: todayFootprint.transport, fill: '#83c5be' },
    { name: 'Food', value: todayFootprint.food, fill: '#e29578' },
    { name: 'Energy', value: todayFootprint.energy, fill: '#006d77' },
    { name: 'Shopping', value: todayFootprint.shopping, fill: '#ffddd2' },
  ];

  return (
    <div className="profile-page">
      <div className="profile-sidebar">
        <div className="profile-section">
          <div className="avatar">
            <User size={40} />
          </div>
          <h2>{user.name}</h2>
          <div className="username-container">
            <Signature size={18} />
            <span className="username">@{user.name.toLowerCase().replace(/\s/g, '')}</span>
          </div>

          <div className="tab-navigation">
            <button
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={activeTab === 'stats' ? 'active' : ''}
              onClick={() => setActiveTab('stats')}
            >
              Statistics
            </button>
            <button
              className={activeTab === 'achievements' ? 'active' : ''}
              onClick={() => setActiveTab('achievements')}
            >
              Achievements
            </button>
          </div>

          <div className="info">
            <div className="info-item">
              <Mail size={18} />
              <span>{user.email}</span>
            </div>
            {user.location && (
              <div className="info-item">
                <MapPin size={18} />
                <span>{user.location}</span>
              </div>
            )}
            <div className="info-item">
              <Calendar size={18} />
              <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="section-header">
          <h2>Carbon Footprint Dashboard</h2>
          <div className="eco-score">
            <div className="score-circle">{user.points || 0}</div>
            <div className="score-text">
              <h3>Eco Points</h3>
              <p>Keep it up!</p>
            </div>
          </div>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Personal Info Section */}
            <div className="card">
              <div
                className="card-header"
                onClick={() => !isEditing && toggleSection('personalInfo')}
                style={{ cursor: isEditing ? 'default' : 'pointer' }}
              >
                <h3>Personal Information</h3>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {!isEditing && (
                    <button
                      className="edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(true);
                      }}
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                  )}
                  {expandedSections.personalInfo ? (
                    <ChevronUp
                      size={20}
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSection('personalInfo');
                      }}
                    />
                  ) : (
                    <ChevronDown
                      size={20}
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSection('personalInfo');
                      }}
                    />
                  )}
                </div>
              </div>
              {expandedSections.personalInfo && (
                <div className="card-content">
                  {isEditing ? (
                    <form className="edit-profile-form" onSubmit={handleEditSubmit}>
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={editFormData.name}
                          onChange={handleEditChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Location</label>
                        <input
                          type="text"
                          name="location"
                          value={editFormData.location}
                          onChange={handleEditChange}
                          placeholder="e.g. Jakarta, Indonesia"
                        />
                      </div>
                      <div className="form-group">
                        <label>Carbon Goal</label>
                        <input
                          type="text"
                          name="carbonGoal"
                          value={editFormData.carbonGoal}
                          onChange={handleEditChange}
                          placeholder="e.g. Reduce by 30% this year"
                        />
                      </div>
                      <div className="form-actions">
                        <button type="submit" disabled={isSaving} className="save-btn">
                          <Save size={16} /> {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setEditFormData({
                              name: user.name || '',
                              location: user.location || '',
                              carbonGoal: user.carbonGoal || '',
                            });
                          }}
                          className="cancel-btn"
                        >
                          <X size={16} /> Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="personal-info-grid">
                      <div className="info-group">
                        <label>Full Name</label>
                        <p>{user.name}</p>
                      </div>
                      <div className="info-group">
                        <label>Email</label>
                        <p>{user.email}</p>
                      </div>
                      <div className="info-group">
                        <label>Location</label>
                        <p>{user.location || '-'}</p>
                      </div>
                      <div className="info-group">
                        <label>Carbon Goal</label>
                        <p>{user.carbonGoal || '-'}</p>
                      </div>
                      <div className="info-group">
                        <label>Account Status</label>
                        <p>{user.verified ? 'Verified' : 'Pending Verification'}</p>
                      </div>
                      <div className="info-group">
                        <label>Member Since</label>
                        <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Today's Statistics */}
            <div className="card">
              <div className="card-header" onClick={() => toggleSection('todayStats')}>
                <h3>Today's Carbon Footprint</h3>
                {expandedSections.todayStats ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {expandedSections.todayStats && (
                <div className="card-content">
                  <div className="stats-grid">
                    <div className="stat-card">
                      <Car size={24} />
                      <h4>Transport</h4>
                      <p className="stat-value">{todayFootprint.transport.toFixed(2)} kg CO₂</p>
                    </div>
                    <div className="stat-card">
                      <Utensils size={24} />
                      <h4>Food</h4>
                      <p className="stat-value">{todayFootprint.food.toFixed(2)} kg CO₂</p>
                    </div>
                    <div className="stat-card">
                      <Lightbulb size={24} />
                      <h4>Energy</h4>
                      <p className="stat-value">{todayFootprint.energy.toFixed(2)} kg CO₂</p>
                    </div>
                    <div className="stat-card">
                      <ShoppingBag size={24} />
                      <h4>Shopping</h4>
                      <p className="stat-value">{todayFootprint.shopping.toFixed(2)} kg CO₂</p>
                    </div>
                  </div>
                  <div className="today-chart">
                    <h4>Category Distribution</h4>
                    <div className="chart-container">
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={categoryData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={80} />
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
              <div className="card-header" onClick={() => toggleSection('historyStats')}>
                <h3>Carbon Footprint History</h3>
                {expandedSections.historyStats ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
              {expandedSections.historyStats && (
                <div className="card-content">
                  {historyData.length > 0 ? (
                    <div className="history-chart">
                      <h4>Recent Trend</h4>
                      <div className="chart-container">
                        <ResponsiveContainer width="100%" height={250}>
                          <AreaChart data={historyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area
                              type="monotone"
                              dataKey="carbon"
                              stroke="#006d77"
                              fill="#83c5be"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  ) : (
                    <p>No history available yet. Calculate your footprint today!</p>
                  )}
                </div>
              )}
            </div>

            {/* Achievements Section */}
            <div className="card">
              <div className="card-header" onClick={() => toggleSection('achievements')}>
                <h3>Recent Achievements</h3>
                {expandedSections.achievements ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
              {expandedSections.achievements && (
                <div className="card-content">
                  <div className="achievements-list">
                    {achievements.filter((a) => a.isUnlocked).length > 0 ? (
                      achievements
                        .filter((a) => a.isUnlocked)
                        .slice(0, 3)
                        .map((achievement) => (
                          <AchievementBadge
                            key={achievement.badgeId}
                            achievement={achievement}
                            isUnlocked={true}
                          />
                        ))
                    ) : (
                      <p>No achievements yet. Keep tracking to earn badges!</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'stats' && (
          <div className="detailed-stats">
            <h3>Detailed Statistics</h3>
            {historyData.length > 0 ? (
              <div className="history-chart">
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={historyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="carbon" fill="#e29578" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <p>No stats available.</p>
            )}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="all-achievements">
            <h3>All Achievements</h3>
            <div className="achievements-list">
              {achievements.length > 0 ? (
                <>
                  <div className="achievements-section">
                    <h4 className="section-title">Unlocked Achievements</h4>
                    <div className="badges-grid">
                      {achievements.filter((a) => a.isUnlocked).length > 0 ? (
                        achievements
                          .filter((a) => a.isUnlocked)
                          .map((achievement) => (
                            <AchievementBadge
                              key={achievement.badgeId}
                              achievement={achievement}
                              isUnlocked={true}
                            />
                          ))
                      ) : (
                        <p>No unlocked achievements yet.</p>
                      )}
                    </div>
                  </div>
                  <div className="achievements-section">
                    <h4 className="section-title">Locked Achievements</h4>
                    <div className="badges-grid">
                      {achievements
                        .filter((a) => !a.isUnlocked)
                        .map((achievement) => (
                          <AchievementBadge
                            key={achievement.badgeId}
                            achievement={achievement}
                            isUnlocked={false}
                          />
                        ))}
                    </div>
                  </div>
                </>
              ) : (
                <p>No achievements available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
