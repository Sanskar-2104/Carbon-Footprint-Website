import mongoose from 'mongoose';

const AchievementSchema = new mongoose.Schema({
  badgeId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String, // Icon name from lucide-react or emoji
    required: true,
  },
  category: {
    type: String,
    enum: ['footprint', 'consistency', 'reduction', 'community', 'gamification'],
    required: true,
  },
  criteria: {
    type: {
      type: String,
      enum: [
        'first_footprint',
        'low_carbon_day',
        'consecutive_days',
        'total_points',
        'quiz_questions',
        'leaderboard_rank',
        'total_tracking_days',
        'single_day_minimum',
        'food_choice',
        'footprint_reduction',
        'waste_minimum',
      ],
      required: true,
    },
    value: {
      type: Number, // Threshold value for the criteria
    },
  },
  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
    default: 'common',
  },
  points: {
    type: Number,
    default: 10,
  },
  color: {
    type: String,
    default: '#83c5be',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

AchievementSchema.index({ category: 1 });

export default mongoose.model('Achievement', AchievementSchema);
