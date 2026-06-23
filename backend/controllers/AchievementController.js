import {
  checkAndAwardAchievements,
  getAllAchievementsWithStatus,
  getUserEarnedAchievements,
} from '../services/AchievementService.js';

// Get all achievements with unlock status for the current user
export const getAllAchievements = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const achievements = await getAllAchievementsWithStatus(userId);
    res.json(achievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get user's earned achievements
export const getEarnedAchievements = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const achievements = await getUserEarnedAchievements(userId);
    res.json(achievements);
  } catch (error) {
    console.error('Error fetching earned achievements:', error);
    res.status(500).json({ error: error.message });
  }
};

// Check and award achievements for the current user
export const checkAchievements = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const newBadges = await checkAndAwardAchievements(userId);
    res.json({
      success: true,
      newBadges,
      message:
        newBadges.length > 0
          ? `Congratulations! You earned ${newBadges.length} new badge(s)!`
          : 'No new achievements unlocked yet.',
    });
  } catch (error) {
    console.error('Error checking achievements:', error);
    res.status(500).json({ error: error.message });
  }
};
