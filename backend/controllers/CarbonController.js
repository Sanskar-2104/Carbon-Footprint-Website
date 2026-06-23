import {
  calculateEmissions,
  getEmissionGrade,
  calculatePoints,
} from '../utils/carbonCalculator.js';
import Footprint from '../models/Footprint.js';

export const calculate = async (req, res) => {
  try {
    const { transport, energy, food, shopping } = req.body;

    const dailyDistance =
      transport?.dailyDistance !== undefined ? parseFloat(transport.dailyDistance) : 0;
    const electricityBill =
      energy?.electricityBill !== undefined ? parseFloat(energy.electricityBill) : 0;
    const noOfPassenger =
      transport?.noOfPassenger !== undefined ? parseInt(transport.noOfPassenger) : 1;
    const meatLover = food?.meatLover !== undefined ? parseFloat(food.meatLover) : 0;

    if (dailyDistance < 0 || electricityBill < 0 || noOfPassenger < 0 || meatLover < 0) {
      return res.status(400).json({ success: false, message: 'Negative values are not allowed' });
    }

    const mode = transport?.mode || 'walking';
    const carpool = transport?.carpool || 'no';
    const driveFrequency = transport?.driveFrequency || 'never';
    const meatFrequency = food?.meatFrequency || 'no';
    const dairyFrequency = food?.dairyFrequency || 'never';

    const energyType = energy?.energyType || 'fossil';
    const purchaseCategory = shopping?.purchaseCategory || 'small_clothing';
    const shoppingFrequency = shopping?.shoppingFrequency || 'never';
    const clothingPurchase = shopping?.clothingPurchase || 'never';
    const electronicsReplacement = shopping?.electronicsReplacement || 'rarely';
    const mediumElectronics = shopping?.mediumElectronics || 'rarely';
    const homeFurniture = shopping?.homeFurniture || 'rarely';
    const applianceReplacement = shopping?.applianceReplacement || 'when broken';
    const ecoFriendly = shopping?.ecoFriendly || 'no';

    const footprint = calculateEmissions({
      mode,
      carpool,
      noOfPassenger,
      driveFrequency,
      dailyDistance,
      energyType,
      electricityBill,
      meatFrequency,
      meatLover,
      dairyFrequency,
      purchaseCategory,
      shoppingFrequency,
      clothingPurchase,
      electronicsReplacement,
      mediumElectronics,
      homeFurniture,
      applianceReplacement,
      ecoFriendly,
    });

    const grade = getEmissionGrade(footprint.total);
    const points = calculatePoints(footprint.total);

    return res.status(200).json({
      success: true,
      totalEmission: footprint.total,
      breakdown: {
        food: footprint.foodEmissions,
        transport: footprint.transportEmissions,
        shopping: footprint.shoppingEmissions,
        electricity: footprint.electricityEmissions,
      },
      grade,
      points,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const history = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const footprints = await Footprint.find({ userId: req.user.id }).sort({ date: 1 });
    const formatted = footprints.map((f) => ({
      createdAt: f.createdAt || f.date,
      totalEmission: f.total,
    }));
    return res.status(200).json(formatted);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const summary = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const footprints = await Footprint.find({ userId: req.user.id });
    const totalSum = footprints.reduce((sum, f) => sum + f.total, 0);
    const averageEmission = footprints.length > 0 ? totalSum / footprints.length : 0;
    return res.status(200).json({ averageEmission });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const save = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const {
      transportEmissions,
      electricityEmissions,
      foodEmissions,
      shoppingEmissions,
      totalEmission,
    } = req.body;

    const newFootprint = new Footprint({
      userId: req.user.id,
      date: new Date(),
      transport: transportEmissions || 0,
      energy: electricityEmissions || 0,
      food: foodEmissions || 0,
      shopping: shoppingEmissions || 0,
      total: totalEmission || 0,
    });

    await newFootprint.save();
    return res.status(201).json({
      success: true,
      message: 'Carbon footprint saved successfully',
      footprint: newFootprint,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
