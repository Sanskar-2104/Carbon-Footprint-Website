// import calculateEmissions from "../services/CarbonCalculator.js";
// import Footprint from "../models/Footprint.js";
// import GuestCache from "../services/GuestCache.js";

// export const guestFootprintCalculate = async (req, res) => {
//     try {
//         const { transport, energy, food, shopping } = req.body;

//         // Extract values safely with default fallbacks
//         const mode = transport?.mode || "walking"; // Default to walking
//         const dailyDistance = parseFloat(transport?.dailyDistance) || 0; // Convert to number, default 0 km
//         const carpool = transport?.carpool || "no"; // Default to no carpool
//         const noOfPassenger = transport?.noOfPassenger || 1;
//         const driveFrequency = transport?.driveFrequency || "never"; // Default to never driving
//         const meatFrequency = food?.meatFrequency || "never"; // Default to never eating meat
//         const meatLover = food?.meatLover || "5"; // Default to no meat lover
//         const dairyFrequency = food?.dairyFrequency || "never"; // Default to never eating dairy
//         const restaurantChoice = food?.restaurantChoice || "vegan"; // Default to vegan restaurant

//         const electricityBill = parseFloat(energy?.electricityBill) || 0; // Default 0 if missing
//         const energyType = energy?.energyType || "fossil"; // Default to electricity

//         const shoppingAmount = parseFloat(shopping?.shoppingAmount) || 0; // Default 0 if missing
//         // const shoppingType = shopping?.shoppingType || "low"; // Default to low
//         const ecoFriendly = shopping?.ecoFriendly || "no"; // Default to no

//         // Calculate emissions
//         const footprint = calculateEmissions({
//             mode, carpool,noOfPassenger, driveFrequency, dailyDistance,
//             energyType,  electricityBill,
//             meatFrequency, meatLover, dairyFrequency, restaurantChoice,
//             shoppingAmount,  ecoFriendly
//         });

//         // Store footprint in cache (based on guest IP)
//         const guestId = req.ip;
//         GuestCache[guestId] = footprint;

//         res.json({ success: true, message: "Carbon Footprint Calculated", footprint });

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const footprintCalculate = async (req, res) => {
//     try {
//         const mode = transport?.mode || "walking"; // Default to walking
//         const dailyDistance = parseFloat(transport?.dailyDistance) || 0; // Convert to number, default 0 km
//         const carpool = transport?.carpool || "no"; // Default to no carpool
//         const noOfPassenger = transport?.noOfPassenger || 1;
//         const driveFrequency = transport?.driveFrequency || "never"; // Default to never driving
//         const meatFrequency = food?.meatFrequency || "never"; // Default to never eating meat
//         const meatLover = food?.meatLover || "5"; // Default to no meat lover
//         const dairyFrequency = food?.dairyFrequency || "never"; // Default to never eating dairy
//         const restaurantChoice = food?.restaurantChoice || "vegan"; // Default to vegan restaurant

//         const electricityBill = parseFloat(energy?.electricityBill) || 0; // Default 0 if missing
//         const energyType = energy?.energyType || "fossil"; // Default to electricity

//         const shoppingAmount = parseFloat(shopping?.shoppingAmount) || 0; // Default 0 if missing
//         // const shoppingType = shopping?.shoppingType || "low"; // Default to low
//         const ecoFriendly = shopping?.ecoFriendly || "no"; // Default to no

//         // Calculate emissions
//         const footprint = calculateEmissions({
//             mode, carpool, driveFrequency, dailyDistance,
//             energyType,  electricityBill,
//             meatFrequency, meatLover, dairyFrequency, restaurantChoice,
//             shoppingAmount,  ecoFriendly
//         });

//         res.json({ success: true, message: "Carbon Footprint Calculated", footprint });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

import calculateEmissions from '../services/CarbonCalculator.js';
import Footprint from '../models/Footprint.js';
import User from '../models/User.js';
import GuestCache from '../services/GuestCache.js';
import { v4 as uuidv4 } from 'uuid'; // For generating session IDs
import { checkAndAwardAchievements } from '../services/AchievementService.js';

// 🟢 Guest Carbon Footprint Calculation
export const guestFootprintCalculate = async (req, res) => {
  try {
    const { transport, energy, food, shopping } = req.body;

    // Extract and ensure default values
    const mode = transport?.mode || 'walking';
    const dailyDistance = parseFloat(transport?.dailyDistance) || 0;
    const carpool = transport?.carpool || 'no';
    const noOfPassenger = parseInt(transport?.noOfPassenger) || 1;
    const driveFrequency = transport?.driveFrequency || 'never';

    const meatFrequency = food?.meatFrequency || 'no';
    const meatLover = food?.meatLover || '5';
    const dairyFrequency = food?.dairyFrequency || 'never';
    const restaurantChoice = food?.restaurantChoice || 'vegan';

    const electricityBill = parseFloat(energy?.electricityBill) || 0;
    const energyType = energy?.energyType || 'fossil';

    const purchaseCategory = shopping?.purchaseCategory || 'small_clothing';
    const shoppingFrequency = shopping?.shoppingFrequency || 'never';
    const clothingPurchase = shopping?.clothingPurchase || 'never';
    const electronicsReplacement = shopping?.electronicsReplacement || 'rarely';
    const mediumElectronics = shopping?.mediumElectronics || 'rarely';
    const homeFurniture = shopping?.homeFurniture || 'rarely';
    const applianceReplacement = shopping?.applianceReplacement || 'when broken';
    const ecoFriendly = shopping?.ecoFriendly || 'no';
    // Calculate emissions
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
      restaurantChoice,
      purchaseCategory,
      shoppingFrequency,
      clothingPurchase,
      electronicsReplacement,
      mediumElectronics,
      homeFurniture,
      applianceReplacement,
      ecoFriendly,
    });

    // Store footprint in cache (guest-based tracking)
    const guestId = req.ip || uuidv4(); // Fallback to unique session ID if IP is unavailable
    GuestCache[guestId] = footprint;

    res.json({ success: true, message: 'Carbon Footprint Calculated for Guest', footprint });
  } catch (error) {
    console.error('Error in guestFootprintCalculate:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// 🟢 Registered User Carbon Footprint Calculation (Saved in Database)
export const footprintCalculate = async (req, res) => {
  try {
    const { transport, energy, food, shopping } = req.body;
    const userId = req.user?.id; // req.user is set by authenticateToken

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Extract and ensure default values
    const mode = transport?.mode || 'walking';
    const dailyDistance = parseFloat(transport?.dailyDistance) || 0;
    const carpool = transport?.carpool || 'no';
    const noOfPassenger = parseInt(transport?.noOfPassenger) || 1;
    const driveFrequency = transport?.driveFrequency || 'never';

    const meatFrequency = food?.meatFrequency || 'no';
    const meatLover = food?.meatLover || '5';
    const dairyFrequency = food?.dairyFrequency || 'never';
    const restaurantChoice = food?.restaurantChoice || 'no';

    const electricityBill = parseFloat(energy?.electricityBill) || 0;
    const energyType = energy?.energyType || 'fossil';

    const purchaseCategory = shopping?.purchaseCategory || 'small_clothing';
    const shoppingFrequency = shopping?.shoppingFrequency || 'never';
    const clothingPurchase = shopping?.clothingPurchase || 'never';
    const electronicsReplacement = shopping?.electronicsReplacement || 'rarely';
    const mediumElectronics = shopping?.mediumElectronics || 'rarely';
    const homeFurniture = shopping?.homeFurniture || 'rarely';
    const applianceReplacement = shopping?.applianceReplacement || 'when broken';
    const ecoFriendly = shopping?.ecoFriendly || 'no';
    // Calculate emissions
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
      restaurantChoice,
      purchaseCategory,
      shoppingFrequency,
      clothingPurchase,
      electronicsReplacement,
      mediumElectronics,
      homeFurniture,
      applianceReplacement,
      ecoFriendly,
    });

    // Store data in MongoDB
    const newFootprint = new Footprint({
      userId,
      sessionId: null, // Users don't require session IDs
      date: new Date(),
      transport: footprint.transportEmissions,
      energy: footprint.electricityEmissions,
      food: footprint.foodEmissions,
      shopping: footprint.shoppingEmissions,
      total: footprint.total,
    });

    await newFootprint.save();

    res.json({ success: true, message: 'Carbon Footprint Saved for User', footprint });

    // Check and award achievements
    const newBadges = await checkAndAwardAchievements(userId);
    if (newBadges.length > 0) {
      res.json({
        success: true,
        message: 'Carbon Footprint Saved for User',
        footprint,
        newBadges,
        achievement: `Congratulations! You earned ${newBadges.map((b) => b.name).join(', ')}!`,
      });
    }
  } catch (error) {
    console.error('Error in footprintCalculate:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

// 🟢 Get User Footprint History
export const getUserFootprint = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const footprints = await Footprint.find({ userId }).sort({ date: 1 });
    res.json({ success: true, footprints });
  } catch (error) {
    console.error('Error in getUserFootprint:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
