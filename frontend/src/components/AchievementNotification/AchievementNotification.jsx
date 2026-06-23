import { useEffect } from 'react';
import Swal from 'sweetalert2';
import './AchievementNotification.css';

const AchievementNotification = ({ badge, isNewBadge = false }) => {
  useEffect(() => {
    if (!badge || !isNewBadge) return;

    // Show a celebratory notification
    Swal.fire({
      title: '🎉 Achievement Unlocked!',
      html: `
        <div class="achievement-popup">
          <div class="achievement-popup-icon">🏆</div>
          <h3>${badge.name}</h3>
          <p>${badge.description}</p>
          <p class="achievement-points">+${badge.points} Eco Points</p>
        </div>
      `,
      icon: 'success',
      confirmButtonText: 'Awesome!',
      confirmButtonColor: '#4a7c59',
      background: '#f0fdf4',
      allowOutsideClick: false,
      didOpen: (modal) => {
        modal.classList.add('achievement-modal');
      },
    });
  }, [isNewBadge, badge]);

  return null;
};

export default AchievementNotification;

// Utility function to show multiple achievements
export const showAchievementNotifications = async (badges) => {
  if (!badges || badges.length === 0) return;

  for (const badge of badges) {
    await Swal.fire({
      title: '🎉 Achievement Unlocked!',
      html: `
        <div class="achievement-popup">
          <div class="achievement-popup-icon">🏆</div>
          <h3>${badge.name}</h3>
          <p>${badge.description}</p>
          <p class="achievement-points">+${badge.points} Eco Points</p>
        </div>
      `,
      icon: 'success',
      confirmButtonText: 'Next',
      confirmButtonColor: '#4a7c59',
      background: '#f0fdf4',
      allowOutsideClick: false,
    });
  }
};
