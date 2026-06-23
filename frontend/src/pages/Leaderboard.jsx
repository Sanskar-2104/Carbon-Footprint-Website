import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, TrendingDown } from 'lucide-react';
import '../components/Navbar/Navbar.css';
import { apiUrl } from '../config/api';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(apiUrl('/api/leaderboard'));

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          setLeaders(result.data);
        } else {
          setLeaders([]);
        }
      } catch (error) {
        console.error('Gagal mengambil data leaderboard:', error);
        setLeaders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-container-wrapper">
        {/* Header */}
        <motion.div
          className="leaderboard-header-section"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="leaderboard-title-wrapper">
            <TrendingDown className="title-icon" size={40} />
            <h1 className="leaderboard-title">Carbon Footprint</h1>
            <TrendingDown className="title-icon" size={40} />
          </div>
          <p className="leaderboard-subtitle">Ranking pengguna dengan emisi karbon terendah</p>
        </motion.div>

        {loading ? (
          <div className="leaderboard-loading">
            <div className="spinner-wrapper">
              <div className="spinner"></div>
              <div className="spinner-inner"></div>
            </div>
            <p className="loading-text">Memuat data pahlawan bumi...</p>
          </div>
        ) : (
          <motion.div
            className="leaderboard-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {/* Top 3 Cards */}
            {leaders.slice(0, 3).length > 0 && (
              <div className="top-cards-grid">
                {leaders.slice(0, 3).map((item, index) => {
                  const medals = ['🥇', '🥈', '🥉'];
                  const medalClass = ['gold-medal', 'silver-medal', 'bronze-medal'];

                  return (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className={`top-card group ${medalClass[index]}`}
                      whileHover={{ scale: 1.05, y: -10 }}
                    >
                      <div className="top-card-glow"></div>
                      <div className="top-card-content">
                        <div className="medal-icon">{medals[index]}</div>
                        <h3 className="top-user-name">
                          {item.userId ? item.userId.username || item.userId.name : 'Guest'}
                        </h3>
                        <div className="top-score-wrapper">
                          <Leaf className="leaf-icon" size={20} />
                          <p className="top-score-value">{item.total} kg</p>
                        </div>
                        <div className="progress-bar-container">
                          <div
                            className="progress-bar-fill"
                            style={{
                              width: `${Math.max((item.total / leaders[0].total) * 100, 10)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Rest of Leaderboard */}
            {leaders.length > 0 ? (
              <div className="leaderboard-list">
                {leaders.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="leaderboard-item"
                    whileHover={{ x: 10 }}
                  >
                    <div className="item-glow"></div>
                    <div className="item-content">
                      {/* Rank */}
                      <div className="item-rank">{index + 1}</div>

                      {/* User Info */}
                      <div className="item-user-info">
                        <p className="item-user-name">
                          {item.userId
                            ? item.userId.username || item.userId.name
                            : 'Pengguna Guest'}
                        </p>
                        <p className="item-user-subtitle">Carbon Footprint</p>
                      </div>

                      {/* Score */}
                      <div className="item-score-wrapper">
                        <Leaf className="leaf-icon-small" size={20} />
                        <span className="item-score-value">{item.total}</span>
                        <span className="item-score-unit">kg</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="leaderboard-empty"
              >
                <Leaf className="empty-icon" size={48} />
                <p className="empty-text">Belum ada data jejak karbon yang tersimpan.</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
