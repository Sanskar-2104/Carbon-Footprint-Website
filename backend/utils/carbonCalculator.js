const EMISSION_FACTORS = {
  transport: {
    car: 0.18,
    public: 0.05, // Average of bus & train emissions
    bike: 0.02,
    walk: 0.0,
  },
  energy: {
    fossil: 0.6, // kg CO2 per kWh
    mixed: 0.4, // kg CO2 per kWh
    renewable: 0.05, // kg CO2 per kWh
  },
  food: {
    '4+': 9.5,
    '2-3': 6.85,
    1: 5.34,
    few: 4.66,
    never: 4.11,
    no: 0, // kg CO2 per day
  },
  dairy: {
    multiple: 3.0,
    daily: 2.0,
    few: 1.0,
    never: 0.0,
  },
  shopping: {
    small_items: { never: 0, rarely: 2, occasionally: 4, frequently: 7 }, // Books, accessories
    clothing: { never: 0, rarely: 4, occasionally: 8, frequently: 15 }, // T-shirts, jeans, shoes
    small_electronics: { rarely: 6, '1-2 years': 15, frequently: 30 }, // Headphones, smartwatches
    medium_electronics: { rarely: 60, occasionally: 150, frequently: 300 }, // Laptops, TVs
    home_furniture: { rarely: 15, occasionally: 30, frequently: 60 }, // Chairs, tables, beds
    large_appliances: { 'when broken': 100, '5-10 years': 250, '3-5 years': 400 }, // Refrigerators, washing machines
  },
};

export const calculateEmissions = ({
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
}) => {
  // 🚗 **Transport Emissions**
  let transportEmissions = 0;
  if (mode === 'car' && driveFrequency) {
    transportEmissions = (dailyDistance || 0) * EMISSION_FACTORS.transport.car;
    const passengerCount = parseInt(noOfPassenger) || 1;
    if (carpool === 'yes' && passengerCount > 0) {
      transportEmissions /= passengerCount;
    }
  } else if (mode === 'public') {
    transportEmissions = (dailyDistance || 0) * EMISSION_FACTORS.transport.public;
  } else if (mode === 'bike') {
    transportEmissions = (dailyDistance || 0) * EMISSION_FACTORS.transport.bike;
  } // No emissions for walk

  // ⚡ **Energy Emissions**
  let electricityEmissions =
    ((electricityBill || 0) * (EMISSION_FACTORS.energy[energyType] || 0)) / 30;

  // 🍗 **Food Emissions**
  let foodEmissions = EMISSION_FACTORS.food[meatFrequency] || 0;
  if (meatFrequency === '4+' && meatLover) {
    foodEmissions += parseFloat(meatLover) * 1.2;
  }
  foodEmissions += EMISSION_FACTORS.dairy[dairyFrequency] || 0;

  // 🛍️ **Shopping Emissions**
  let shoppingEmissions = 0;

  try {
    if (purchaseCategory === 'small_clothing') {
      shoppingEmissions += EMISSION_FACTORS.shopping.small_items[shoppingFrequency] || 0;
      shoppingEmissions += EMISSION_FACTORS.shopping.clothing[clothingPurchase] || 0;
    } else if (purchaseCategory === 'electronics') {
      shoppingEmissions += EMISSION_FACTORS.shopping.small_electronics[electronicsReplacement] || 0;
      shoppingEmissions += EMISSION_FACTORS.shopping.medium_electronics[mediumElectronics] || 0;
    } else if (purchaseCategory === 'home_goods') {
      shoppingEmissions += EMISSION_FACTORS.shopping.home_furniture[homeFurniture] || 0;
      shoppingEmissions += EMISSION_FACTORS.shopping.large_appliances[applianceReplacement] || 0;
    }
  } catch (error) {
    console.log({ message: error.message });
  }

  // Apply eco-friendly reduction
  if (ecoFriendly === 'true' || ecoFriendly === true) {
    shoppingEmissions *= 0.5;
  }

  // 🌍 **Total Carbon Footprint**
  const total = transportEmissions + electricityEmissions + foodEmissions + shoppingEmissions;

  return { transportEmissions, electricityEmissions, foodEmissions, shoppingEmissions, total };
};

export const getEmissionGrade = (total) => {
  if (total <= 5) return 'A';
  if (total <= 10) return 'B';
  if (total <= 20) return 'C';
  if (total <= 35) return 'D';
  if (total <= 50) return 'E';
  return 'F';
};

export const calculatePoints = (total) => {
  return Math.max(0, Math.round(100 - (total / 800) * 100));
};

export default calculateEmissions;
