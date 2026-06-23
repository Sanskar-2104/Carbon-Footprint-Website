import { calculatePoints } from './carbonCalculator.js';

export { calculatePoints };

export const checkMilestone = (userHistory) => {
  if (userHistory && userHistory.length === 1) {
    return {
      badgeId: 'first_step',
      name: 'First Step',
      description: 'Calculate your first carbon footprint',
    };
  }
  return null;
};

export const canRedeemReward = (userPoints, rewardCost) => {
  return (userPoints || 0) >= (rewardCost || 0);
};

export const applyRedemption = (user, reward) => {
  if (!canRedeemReward(user.points, reward.cost)) {
    throw new Error('Insufficient points');
  }
  user.points -= reward.cost;
  return {
    success: true,
    remainingPoints: user.points,
    redeemedAt: new Date(),
  };
};
