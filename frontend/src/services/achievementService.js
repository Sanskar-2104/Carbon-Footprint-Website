import { apiUrl } from '../config/api';

export const calculateAndSaveFootprint = async (footprintData, token) => {
  try {
    const response = await fetch(apiUrl('/api/footprint/calculate'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(footprintData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to calculate footprint');
    }

    return {
      success: true,
      footprint: data.footprint,
      newBadges: data.newBadges || [],
      achievement: data.achievement,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const checkAchievements = async (token) => {
  try {
    const response = await fetch(apiUrl('/api/achievement/check'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to check achievements');
    }

    return {
      success: data.success,
      newBadges: data.newBadges || [],
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getAllAchievements = async (token) => {
  try {
    const response = await fetch(apiUrl('/api/achievement/all'), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch achievements');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
};

export const getEarnedAchievements = async (token) => {
  try {
    const response = await fetch(apiUrl('/api/achievement/earned'), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch earned achievements');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching earned achievements:', error);
    return [];
  }
};
