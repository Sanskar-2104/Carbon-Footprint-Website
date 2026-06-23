import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp } from 'lucide-react';
import '../components/Navbar/Navbar.css';
import { apiUrl } from '../config/api';
import './Leaderboard.css';

const QuizLeaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizLeaderboard = async () => {
      try {
        const response = await fetch(apiUrl('/api/leaderboard/quiz'));

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
        console.error('Gagal mengambil data quiz leaderboard:', error);
        setLeaders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizLeaderboard();
  }, []);

  const maxPoints = leaders.length > 0 ? Math.max(...leaders.map((l) => l.points || 0)) || 1 : 1;

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
            <TrendingUp className="quiz-title-icon" size={40} />
            <h1 className="quiz-leaderboard-title">Quiz Champions</h1>
            <TrendingUp className="quiz-title-icon" size={40} />
          </div>
          <p className="leaderboard-subtitle">Ranking pengguna dengan poin quiz tertinggi</p>
        </motion.div>

        {loading ? (
          <div className="leaderboard-loading">
            <div className="spinner-wrapper">
              <div className="quiz-spinner"></div>
              <div className="spinner-inner"></div>
            </div>
            <p className="quiz-loading-text">Memuat data quiz champions...</p>
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
                      <div className="quiz-top-card-glow"></div>
                      <div className="top-card-content">
                        <div className="medal-icon">{medals[index]}</div>
                        <h3 className="top-user-name">
                          {item.username || item.name || 'Quiz Master'}
                        </h3>
                        <div className="top-score-wrapper">
                          <Zap className="quiz-icon" size={20} />
                          <p className="quiz-score-value">{item.points || 0} pts</p>
                        </div>
                        <div className="progress-bar-container">
                          <div
                            className="quiz-progress-bar-fill"
                            style={{
                              width: `${Math.max(((item.points || 0) / maxPoints) * 100, 10)}%`,
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
                    className="quiz-leaderboard-item"
                    whileHover={{ x: 10 }}
                  >
                    <div className="quiz-item-glow"></div>
                    <div className="item-content">
                      {/* Rank */}
                      <div className="quiz-item-rank">{index + 1}</div>

                      {/* User Info */}
                      <div className="item-user-info">
                        <p className="item-user-name">
                          {item.username || item.name || 'Quiz Master'}
                        </p>
                        <p className="item-user-subtitle">Quiz Points</p>
                      </div>

                      {/* Score */}
                      <div className="item-score-wrapper">
                        <Zap className="quiz-icon" size={20} />
                        <span className="quiz-item-score-value">{item.points || 0}</span>
                        <span className="item-score-unit">pts</span>
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
                <Zap className="empty-icon" size={48} />
                <p className="empty-text">Belum ada data poin quiz yang tersimpan.</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuizLeaderboard;
