import User from '../models/User.js';
import Footprint from '../models/Footprint.js';
import Achievement from '../models/Achievement.js';

// Check and award achievements based on user actions
export const checkAndAwardAchievements = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) return [];

    const achievements = await Achievement.find();
    const newBadges = [];

    // Check each achievement
    for (const achievement of achievements) {
      // Skip if already earned
      if (user.badges && user.badges.includes(achievement.badgeId)) {
        continue;
      }

      const isEarned = await checkAchievementCriteria(userId, achievement);

      if (isEarned) {
        user.badges.push(achievement.badgeId);
        user.points += achievement.points;
        newBadges.push({
          badgeId: achievement.badgeId,
          name: achievement.name,
          points: achievement.points,
        });
      }
    }

    if (newBadges.length > 0) {
      await user.save();
    }

    return newBadges;
  } catch (error) {
    console.error('Error checking achievements:', error);
    return [];
  }
};

// Check individual achievement criteria
const checkAchievementCriteria = async (userId, achievement) => {
  try {
    const { criteria } = achievement;

    switch (criteria.type) {
      case 'first_footprint':
        return await checkFirstFootprint(userId);

      case 'low_carbon_day':
        return await checkLowCarbonDay(userId, criteria.value);

      case 'consecutive_days':
        return await checkConsecutiveDays(userId, criteria.value);

      case 'total_points':
        return await checkTotalPoints(userId, criteria.value);

      case 'quiz_questions':
        return await checkQuizQuestions(userId, criteria.value);

      case 'leaderboard_rank':
        return await checkLeaderboardRank(userId, criteria.value);

      case 'total_tracking_days':
        return await checkTotalTrackingDays(userId, criteria.value);

      case 'single_day_minimum':
        return await checkSingleDayMinimum(userId, criteria.value);

      case 'footprint_reduction':
        return await checkFootprintReduction(userId, criteria.value);

      default:
        return false;
    }
  } catch (error) {
    console.error('Error checking achievement criteria:', error);
    return false;
  }
};

// Achievement Criteria Functions
const checkFirstFootprint = async (userId) => {
  const footprint = await Footprint.findOne({ userId });
  return !!footprint;
};

const checkLowCarbonDay = async (userId, maxEmissions) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayFootprint = await Footprint.findOne({
    userId,
    date: { $gte: today, $lt: tomorrow },
  });

  return todayFootprint && todayFootprint.total <= maxEmissions;
};

const checkConsecutiveDays = async (userId, requiredDays) => {
  const footprints = await Footprint.find({ userId })
    .sort({ date: -1 })
    .limit(requiredDays * 2);

  if (footprints.length < requiredDays) return false;

  let consecutiveCount = 1;
  for (let i = 1; i < footprints.length; i++) {
    const currentDate = new Date(footprints[i].date);
    const previousDate = new Date(footprints[i - 1].date);
    currentDate.setHours(0, 0, 0, 0);
    previousDate.setHours(0, 0, 0, 0);

    const dayDiff = (previousDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);

    if (dayDiff === 1) {
      consecutiveCount++;
      if (consecutiveCount >= requiredDays) return true;
    } else {
      consecutiveCount = 1;
    }
  }

  return false;
};

const checkTotalPoints = async (userId, requiredPoints) => {
  const user = await User.findById(userId);
  return user && user.points >= requiredPoints;
};

const checkQuizQuestions = async () => {
  // This assumes quiz data is stored somewhere - adjust based on your implementation
  // For now, returning false as a placeholder
  return false;
};

const checkLeaderboardRank = async (userId, requiredRank) => {
  const userRank = await User.countDocuments({
    points: { $gt: (await User.findById(userId)).points },
  });

  return userRank < requiredRank;
};

const checkTotalTrackingDays = async (userId, requiredDays) => {
  const footprints = await Footprint.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
          day: { $dayOfMonth: '$date' },
        },
      },
    },
    { $count: 'total' },
  ]);

  return footprints.length > 0 && footprints[0].total >= requiredDays;
};

const checkSingleDayMinimum = async (userId, maxEmissions) => {
  const footprint = await Footprint.findOne({
    userId,
    total: { $lte: maxEmissions },
  }).sort({ total: 1 });

  return !!footprint;
};

const checkFootprintReduction = async (userId, reductionPercentage) => {
  const footprints = await Footprint.find({ userId }).sort({ date: -1 }).limit(60); // Last 60 days

  if (footprints.length < 2) return false;

  const recent30Days = footprints
    .filter((f) => {
      const daysAgo = (Date.now() - f.date.getTime()) / (1000 * 60 * 60 * 24);
      return daysAgo <= 30;
    })
    .reduce((sum, f) => sum + f.total, 0);

  const previous30Days = footprints
    .filter((f) => {
      const daysAgo = (Date.now() - f.date.getTime()) / (1000 * 60 * 60 * 24);
      return daysAgo > 30 && daysAgo <= 60;
    })
    .reduce((sum, f) => sum + f.total, 0);

  if (previous30Days === 0) return false;

  const reduction = ((previous30Days - recent30Days) / previous30Days) * 100;
  return reduction >= reductionPercentage;
};

// Get all achievements with user's unlock status
export const getAllAchievementsWithStatus = async (userId) => {
  try {
    const user = await User.findById(userId);
    const achievements = await Achievement.find().sort({ category: 1 });

    return achievements.map((achievement) => ({
      ...achievement.toObject(),
      isUnlocked: user && user.badges ? user.badges.includes(achievement.badgeId) : false,
    }));
  } catch (error) {
    console.error('Error getting achievements:', error);
    return [];
  }
};

// Get user's earned achievements with details
export const getUserEarnedAchievements = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user || !user.badges) return [];

    const achievements = await Achievement.find({
      badgeId: { $in: user.badges },
    }).sort({ createdAt: -1 });

    return achievements;
  } catch (error) {
    console.error('Error getting user achievements:', error);
    return [];
  }
};

// Initialize default achievements (run once)
export const initializeDefaultAchievements = async () => {
  try {
    const defaultAchievements = [
      {
        badgeId: 'first_step',
        name: 'First Step',
        description: 'Calculate your first carbon footprint',
        icon: 'Footprints',
        category: 'footprint',
        criteria: { type: 'first_footprint' },
        rarity: 'common',
        points: 10,
        color: '#83c5be',
      },
      {
        badgeId: 'eco_warrior',
        name: 'Eco Warrior',
        description: 'Achieve under 5kg CO2 in a single day',
        icon: 'Leaf',
        category: 'footprint',
        criteria: { type: 'low_carbon_day', value: 5 },
        rarity: 'uncommon',
        points: 25,
        color: '#2d6a4f',
      },
      {
        badgeId: 'consistent_tracker',
        name: 'Consistent Tracker',
        description: 'Track your carbon footprint for 7 consecutive days',
        icon: 'Calendar',
        category: 'consistency',
        criteria: { type: 'consecutive_days', value: 7 },
        rarity: 'uncommon',
        points: 30,
        color: '#1b4332',
      },
      {
        badgeId: 'eco_champion',
        name: 'Eco Champion',
        description: 'Earn 100 eco points',
        icon: 'Trophy',
        category: 'gamification',
        criteria: { type: 'total_points', value: 100 },
        rarity: 'rare',
        points: 50,
        color: '#ffd60a',
      },
      {
        badgeId: 'month_master',
        name: 'Month Master',
        description: 'Track your footprint for 30 days',
        icon: 'Clock',
        category: 'consistency',
        criteria: { type: 'total_tracking_days', value: 30 },
        rarity: 'rare',
        points: 60,
        color: '#ffb703',
      },
      {
        badgeId: 'minimalist',
        name: 'Minimalist',
        description: 'Achieve under 3kg CO2 in a single day',
        icon: 'Zap',
        category: 'reduction',
        criteria: { type: 'single_day_minimum', value: 3 },
        rarity: 'rare',
        points: 40,
        color: '#fb5607',
      },
      {
        badgeId: 'carbon_cutter',
        name: 'Carbon Cutter',
        description: 'Reduce your carbon footprint by 20% in 30 days',
        icon: 'TrendingDown',
        category: 'reduction',
        criteria: { type: 'footprint_reduction', value: 20 },
        rarity: 'epic',
        points: 80,
        color: '#d62828',
      },
      {
        badgeId: 'zero_waste_hero',
        name: 'Zero Waste Hero',
        description: 'Achieve very low waste emissions in a single day',
        icon: 'Trash2',
        category: 'reduction',
        criteria: { type: 'waste_minimum', value: 0.5 },
        rarity: 'rare',
        points: 40,
        color: '#ffb703',
      },
      {
        badgeId: 'eco_leader',
        name: 'Eco Leader',
        description: 'Reach top 10 on the leaderboard',
        icon: 'Star',
        category: 'community',
        criteria: { type: 'leaderboard_rank', value: 10 },
        rarity: 'epic',
        points: 100,
        color: '#ff006e',
      },
      {
        badgeId: 'quiz_master',
        name: 'Quiz Master',
        description: 'Earn 150 eco points through active tracking',
        icon: 'Award',
        category: 'gamification',
        criteria: { type: 'total_points', value: 150 },
        rarity: 'epic',
        points: 50,
        color: '#9d4edd',
      },
      {
        badgeId: 'half_century',
        name: 'Half Century',
        description: 'Earn 50 eco points',
        icon: 'Award',
        category: 'gamification',
        criteria: { type: 'total_points', value: 50 },
        rarity: 'uncommon',
        points: 20,
        color: '#ff9f1c',
      },
      {
        badgeId: 'century_club',
        name: 'Century Club',
        description: 'Track your footprint for 100 days',
        icon: 'Calendar',
        category: 'consistency',
        criteria: { type: 'total_tracking_days', value: 100 },
        rarity: 'epic',
        points: 100,
        color: '#e71d36',
      },
      {
        badgeId: 'super_saver',
        name: 'Super Saver',
        description: 'Reduce your carbon footprint by 50% in 30 days',
        icon: 'TrendingDown',
        category: 'reduction',
        criteria: { type: 'footprint_reduction', value: 50 },
        rarity: 'legendary',
        points: 150,
        color: '#011627',
      },
      {
        badgeId: 'top_3',
        name: 'Podium Finish',
        description: 'Reach top 3 on the leaderboard',
        icon: 'Trophy',
        category: 'community',
        criteria: { type: 'leaderboard_rank', value: 3 },
        rarity: 'legendary',
        points: 200,
        color: '#fdffb6',
      },
      {
        badgeId: 'streak_master',
        name: 'Streak Master',
        description: 'Track for 30 consecutive days',
        icon: 'Clock',
        category: 'consistency',
        criteria: { type: 'consecutive_days', value: 30 },
        rarity: 'epic',
        points: 100,
        color: '#2ec4b6',
      },
    ];

    for (const achievement of defaultAchievements) {
      await Achievement.updateOne(
        { badgeId: achievement.badgeId },
        { $set: achievement },
        { upsert: true }
      );
    }
    console.log('Default achievements initialized and updated');
  } catch (error) {
    console.error('Error initializing default achievements:', error);
  }
};
