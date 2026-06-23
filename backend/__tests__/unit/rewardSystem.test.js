import {
  calculatePoints,
  checkMilestone,
  canRedeemReward,
  applyRedemption,
} from '../../utils/rewardSystem.js';

describe('rewardSystem utility', () => {
  test('calculatePoints(): low emission = high points, result is always a non-negative integer', () => {
    const pointsLow = calculatePoints(5); // low emission
    const pointsHigh = calculatePoints(150); // higher emission
    const pointsExtreme = calculatePoints(9999); // extremely high emission

    expect(pointsLow).toBeGreaterThan(pointsHigh);
    expect(Number.isInteger(pointsLow)).toBe(true);
    expect(pointsExtreme).toBe(0); // non-negative
  });

  test('checkMilestone(): returns badge for first calculation, returns null when no milestone met', () => {
    // first calculation
    const historyFirst = [{}];
    const badge = checkMilestone(historyFirst);
    expect(badge).toEqual({
      badgeId: 'first_step',
      name: 'First Step',
      description: 'Calculate your first carbon footprint',
    });

    // not first calculation
    const historyMultiple = [{}, {}];
    const noBadge = checkMilestone(historyMultiple);
    expect(noBadge).toBeNull();
  });

  test('canRedeemReward(): returns true if userPoints >= rewardCost, false otherwise', () => {
    expect(canRedeemReward(100, 50)).toBe(true);
    expect(canRedeemReward(50, 50)).toBe(true);
    expect(canRedeemReward(30, 50)).toBe(false);
  });

  test('applyRedemption(): correctly deducts points, throws if insufficient points, includes transaction timestamp', () => {
    const user = { points: 100 };
    const reward = { cost: 40 };

    const result = applyRedemption(user, reward);

    expect(result.success).toBe(true);
    expect(result.remainingPoints).toBe(60);
    expect(user.points).toBe(60);
    expect(result.redeemedAt).toBeInstanceOf(Date);

    // Insufficient points
    const userPoor = { points: 20 };
    const expensiveReward = { cost: 50 };
    expect(() => applyRedemption(userPoor, expensiveReward)).toThrow('Insufficient points');
  });

  test('canRedeemReward() fallback: handles null or undefined points/cost', () => {
    expect(canRedeemReward(null, 50)).toBe(false);
    expect(canRedeemReward(10, null)).toBe(true);
    expect(canRedeemReward(null, null)).toBe(true);
  });
});
