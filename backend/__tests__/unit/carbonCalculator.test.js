import { jest } from '@jest/globals';
import {
  calculateEmissions,
  getEmissionGrade,
  calculatePoints,
} from '../../utils/carbonCalculator.js';

describe('carbonCalculator utility', () => {
  test('calculates transport emission correctly for car', () => {
    const res = calculateEmissions({
      mode: 'car',
      driveFrequency: 'daily',
      dailyDistance: 10,
    });
    expect(res.transportEmissions).toBeCloseTo(1.8);
  });

  test('handles car mode with falsy driveFrequency', () => {
    const res = calculateEmissions({
      mode: 'car',
      driveFrequency: null,
      dailyDistance: 10,
    });
    expect(res.transportEmissions).toBe(0);
  });

  test('handles car mode with carpool yes and passengerCount <= 0', () => {
    const res = calculateEmissions({
      mode: 'car',
      driveFrequency: 'daily',
      dailyDistance: 10,
      carpool: 'yes',
      noOfPassenger: 0,
    });
    expect(res.transportEmissions).toBeCloseTo(1.8);
  });

  test('calculates electricity emission correctly', () => {
    const res = calculateEmissions({
      energyType: 'fossil',
      electricityBill: 300,
    });
    expect(res.electricityEmissions).toBeCloseTo(6);
  });

  test('calculates food emission correctly', () => {
    const res = calculateEmissions({
      meatFrequency: '2-3',
      dairyFrequency: 'daily',
    });
    expect(res.foodEmissions).toBeCloseTo(8.85);
  });

  test('calculates food emission with meatLover', () => {
    const res = calculateEmissions({
      meatFrequency: '4+',
      meatLover: 3,
      dairyFrequency: 'never',
    });
    expect(res.foodEmissions).toBeCloseTo(9.5 + 3.6); // 9.5 + 3 * 1.2
  });

  test('calculates shopping emission correctly for small_clothing', () => {
    const res = calculateEmissions({
      purchaseCategory: 'small_clothing',
      shoppingFrequency: 'frequently',
      clothingPurchase: 'occasionally',
    });
    expect(res.shoppingEmissions).toBe(15);
  });

  test('calculates shopping emission for electronics', () => {
    const res = calculateEmissions({
      purchaseCategory: 'electronics',
      electronicsReplacement: '1-2 years', // 15
      mediumElectronics: 'occasionally', // 150
    });
    expect(res.shoppingEmissions).toBe(165);
  });

  test('calculates shopping emission for home_goods', () => {
    const res = calculateEmissions({
      purchaseCategory: 'home_goods',
      homeFurniture: 'occasionally', // 30
      applianceReplacement: '5-10 years', // 250
    });
    expect(res.shoppingEmissions).toBe(280);
  });

  test('handles invalid purchase category', () => {
    const res = calculateEmissions({
      purchaseCategory: 'invalid_category',
    });
    expect(res.shoppingEmissions).toBe(0);
  });

  test('proportional scaling: 2x distance = 2x transport emission', () => {
    const res1 = calculateEmissions({ mode: 'car', driveFrequency: 'daily', dailyDistance: 10 });
    const res2 = calculateEmissions({ mode: 'car', driveFrequency: 'daily', dailyDistance: 20 });
    expect(res2.transportEmissions).toBe(res1.transportEmissions * 2);
  });

  test('proportional scaling: 2x electricity bill = 2x energy emission', () => {
    const res1 = calculateEmissions({ energyType: 'fossil', electricityBill: 150 });
    const res2 = calculateEmissions({ energyType: 'fossil', electricityBill: 300 });
    expect(res2.electricityEmissions).toBe(res1.electricityEmissions * 2);
  });

  test('zero input always returns zero emission', () => {
    const res = calculateEmissions({
      dailyDistance: 0,
      electricityBill: 0,
      meatFrequency: 'no',
      dairyFrequency: 'never',
      shoppingFrequency: 'never',
      clothingPurchase: 'never',
    });
    expect(res.total).toBe(0);
  });

  test('eco-friendly choices produce lower emission than high-carbon alternatives', () => {
    const carRes = calculateEmissions({ mode: 'car', driveFrequency: 'daily', dailyDistance: 10 });
    const bikeRes = calculateEmissions({ mode: 'bike', dailyDistance: 10 });
    expect(bikeRes.transportEmissions).toBeLessThan(carRes.transportEmissions);

    const fossilRes = calculateEmissions({ energyType: 'fossil', electricityBill: 100 });
    const renewableRes = calculateEmissions({ energyType: 'renewable', electricityBill: 100 });
    expect(renewableRes.electricityEmissions).toBeLessThan(fossilRes.electricityEmissions);

    const meatRes = calculateEmissions({ meatFrequency: '4+', meatLover: 5 });
    const vegRes = calculateEmissions({ meatFrequency: 'never' });
    expect(vegRes.foodEmissions).toBeLessThan(meatRes.foodEmissions);

    const normalShopping = calculateEmissions({
      purchaseCategory: 'small_clothing',
      shoppingFrequency: 'frequently',
      clothingPurchase: 'frequently',
      ecoFriendly: false,
    });
    const ecoShopping = calculateEmissions({
      purchaseCategory: 'small_clothing',
      shoppingFrequency: 'frequently',
      clothingPurchase: 'frequently',
      ecoFriendly: true, // boolean test
    });
    expect(ecoShopping.shoppingEmissions).toBe(normalShopping.shoppingEmissions * 0.5);
  });

  test('getEmissionGrade() returns correct grade A-F based on total emission value', () => {
    expect(getEmissionGrade(3)).toBe('A');
    expect(getEmissionGrade(7)).toBe('B');
    expect(getEmissionGrade(15)).toBe('C');
    expect(getEmissionGrade(25)).toBe('D');
    expect(getEmissionGrade(45)).toBe('E');
    expect(getEmissionGrade(60)).toBe('F');
  });

  test('calculatePoints() returns non-negative integer, higher emission = fewer points', () => {
    const pointsLow = calculatePoints(10);
    const pointsHigh = calculatePoints(200);
    const pointsExtreme = calculatePoints(10000);

    expect(pointsLow).toBeGreaterThan(pointsHigh);
    expect(Number.isInteger(pointsLow)).toBe(true);
    expect(pointsExtreme).toBe(0);
  });

  test('covers fallback branches for public and bike modes with falsy distance', () => {
    const resPublic = calculateEmissions({
      mode: 'public',
      dailyDistance: null,
    });
    expect(resPublic.transportEmissions).toBe(0);

    const resBike = calculateEmissions({
      mode: 'bike',
      dailyDistance: undefined,
    });
    expect(resBike.transportEmissions).toBe(0);
  });

  test('covers catch block in shopping emission calculation', () => {
    const throwingObj = {
      toString() {
        throw new Error('Simulated throw for lookup key');
      },
    };

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const res = calculateEmissions({
      purchaseCategory: 'small_clothing',
      shoppingFrequency: throwingObj,
    });
    expect(consoleSpy).toHaveBeenCalled();
    expect(res.shoppingEmissions).toBe(0);
    consoleSpy.mockRestore();
  });

  test('covers fallback branches for car mode dailyDistance falsy, and invalid shopping keys', () => {
    // car mode, falsy dailyDistance
    const resCarFalsyDist = calculateEmissions({
      mode: 'car',
      driveFrequency: 'daily',
      dailyDistance: null,
    });
    expect(resCarFalsyDist.transportEmissions).toBe(0);

    // electronics category with missing or invalid keys
    const resElecInvalid = calculateEmissions({
      purchaseCategory: 'electronics',
      electronicsReplacement: 'invalid_key',
      mediumElectronics: null,
    });
    expect(resElecInvalid.shoppingEmissions).toBe(0);

    // home_goods category with missing or invalid keys
    const resHomeInvalid = calculateEmissions({
      purchaseCategory: 'home_goods',
      homeFurniture: 'invalid_key',
      applianceReplacement: null,
    });
    expect(resHomeInvalid.shoppingEmissions).toBe(0);

    // small_clothing category with missing or invalid keys
    const resSmallClothingInvalid = calculateEmissions({
      purchaseCategory: 'small_clothing',
      shoppingFrequency: 'invalid_key',
      clothingPurchase: null,
    });
    expect(resSmallClothingInvalid.shoppingEmissions).toBe(0);
  });
});
