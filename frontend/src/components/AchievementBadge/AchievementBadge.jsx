import React from 'react';
import {
  Footprints,
  Leaf,
  Calendar,
  Trophy,
  Clock,
  Zap,
  TrendingDown,
  Star,
  Lock,
  CheckCircle,
  Trash2,
  Award,
} from 'lucide-react';
import './AchievementBadge.css';

// Map badge icon names to lucide components
const ICON_MAP = {
  Footprints,
  Leaf,
  Calendar,
  Trophy,
  Clock,
  Zap,
  TrendingDown,
  Star,
  Trash2,
  Award,
};

const AchievementBadge = ({ achievement, isUnlocked = false, showProgress = false }) => {
  const IconComponent = ICON_MAP[achievement.icon] || Leaf;

  const getRarityColor = (rarity) => {
    const colors = {
      common: '#a0a0a0',
      uncommon: '#4ade80',
      rare: '#3b82f6',
      epic: '#a855f7',
      legendary: '#f59e0b',
    };
    return colors[rarity] || '#a0a0a0';
  };

  return (
    <div
      className={`achievement-badge ${isUnlocked ? 'unlocked' : 'locked'}`}
      title={achievement.description}
    >
      <div
        className="badge-icon-container"
        style={{ borderColor: getRarityColor(achievement.rarity) }}
      >
        {isUnlocked ? (
          <>
            <div className="icon-wrapper" style={{ color: getRarityColor(achievement.rarity) }}>
              <IconComponent size={32} />
            </div>
            <div className="unlock-indicator">
              <CheckCircle size={16} />
            </div>
          </>
        ) : (
          <>
            <div className="icon-wrapper locked-icon">
              <Lock size={32} />
            </div>
          </>
        )}
      </div>
      <div className="badge-info">
        <h4>{achievement.name}</h4>
        <p className="badge-description">{achievement.description}</p>
        <div className="badge-meta">
          <span className="rarity" style={{ color: getRarityColor(achievement.rarity) }}>
            {achievement.rarity}
          </span>
          <span className="points">+{achievement.points} pts</span>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadge;
