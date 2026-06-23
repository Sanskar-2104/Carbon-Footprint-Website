import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userId = user.id || user._id; // JWT payload uses 'id'
    const userProfile = await User.findById(userId).select('-password');
    if (!userProfile) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { name, location, carbonGoal } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, location, carbonGoal },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user: updatedUser, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
