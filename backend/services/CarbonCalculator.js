// const calculateEmissions = ({ transport, vehicleType, energy, food, shopping }) => { 
//     const EMISSION_FACTORS = {
//         transport: {
//             petroleumCar: 0.2,
//             electricCar: 0.05, 
//             motorBike: 0.3,
//             bicycle: 0.0,
//             bus: 0.1,
//             train: 0.08,
//             walking: 0.0
//         },
//         energy: 0.5,
//         food: 2,
//         shopping: 0.5
//     }

//     const transportEmissions = transport * (EMISSION_FACTORS.transport[vehicleType] || 0.2);
//     const energyEmissions = energy * EMISSION_FACTORS.energy;
//     const foodEmissions = food * EMISSION_FACTORS.food;
//     const shoppingEmissions = shopping * EMISSION_FACTORS.shopping;

//     const total = transportEmissions + energyEmissions + foodEmissions + shoppingEmissions;

//     return { transportEmissions, energyEmissions, foodEmissions, shoppingEmissions, total };
// }

// const calculateEmissions = ({ vehicleType, distanceTravelled , electricityBill, foodType, shoppingAmount, shoppingType, ecoFriendly }) => {
//     const EMISSION_FACTORS = {
//         transport: {
//             car: 0.18,  // kg CO2 per km
//             bike: 0.05, // kg CO2 per km (motorcycle)
//             bus: 0.07,  // kg CO2 per passenger-km
//             train: 0.03, // kg CO2 per passenger-km
//             bicycle: 0.0, // No emissions
//             walking: 0.0  // No emissions
//         },
//         energy: {
//             electricity: 0.5 // kg CO2 per unit (kWh) of electricity
//         },
//         food: {
//             vegan: 4.11, // kg CO2 per day
//             vegetarian: 4.66, 
//             non_vegetarian: 6.85
//         },
//         shopping: {
//             low: 2,   // kg CO2 per day
//             medium: 5,
//             high: 10
//         }
//     };

//     // Transport emissions
//     const transportEmissions = (distanceTravelled || 0) * (EMISSION_FACTORS.transport[vehicleType] || 0);

//     // Energy emissions (electricity bill-based)
//     const electricityEmissions = (electricityBill || 0) * EMISSION_FACTORS.energy.electricity;

//     // Food emissions
//     const foodEmissions = EMISSION_FACTORS.food[foodType] || 0;

//     // Shopping emissions with eco-friendly discount
//     let shoppingEmissions = (shoppingAmount || 0) * 0.002; // Assuming 2 kg CO2 per $1000 spent
//     if (ecoFriendly === "yes") {
//         shoppingEmissions *= 0.5; // 50% reduction for eco-friendly purchases
//     }

//     // Total emissions
//     const total = transportEmissions + electricityEmissions + foodEmissions + shoppingEmissions;

//     return { transportEmissions, electricityEmissions, foodEmissions, shoppingEmissions, total };
// };

// export default calculateEmissions;


const calculateEmissions = ({ 
    mode, carpool, noOfPassenger, driveFrequency, dailyDistance, 
    energyType, electricityBill, 
    meatFrequency, meatLover, dairyFrequency,
    purchaseCategory, shoppingFrequency, clothingPurchase,
    electronicsReplacement, mediumElectronics, homeFurniture, applianceReplacement,
    ecoFriendly
}) => {
    
    const EMISSION_FACTORS = {
        transport: {
            car: 0.18,
            public: 0.05, // Average of bus & train emissions
            bike: 0.02,
            walk: 0.0
        },
        energy: {
            fossil: 0.6,   // kg CO2 per kWh
            mixed: 0.4,    // kg CO2 per kWh
            renewable: 0.05 // kg CO2 per kWh
        },
        food: {
            "4+": 9.5, "2-3": 6.85, "1": 5.34, "few": 4.66, "never": 4.11, "no":0,// kg CO2 per day
        },
        dairy: {
            multiple: 3.0, daily: 2.0, few: 1.0, never: 0.0
        },
        shopping: {
            small_items: { never: 0,rarely: 2, occasionally: 5, frequently: 10 }, // Books, accessories
            clothing: { never: 0,rarely: 5, occasionally: 10, frequently: 20 }, // T-shirts, jeans, shoes
            small_electronics: { rarely: 5, "1-2 years": 20, frequently: 50 }, // Headphones, smartwatches
            medium_electronics: { rarely: 200, occasionally: 350, frequently: 500 }, // Laptops, TVs
            home_furniture: { rarely: 20, occasionally: 50, frequently: 100 }, // Chairs, tables, beds
            large_appliances: { "when broken": 200, "5-10 years": 350, "3-5 years": 500 } // Refrigerators, washing machines
        }
    };

    // 🚗 **Transport Emissions**
    let transportEmissions = 0;
    if (mode === "car" && driveFrequency) {
        transportEmissions = (dailyDistance || 0) * (EMISSION_FACTORS.transport.car || 0);
        if (carpool === "yes") transportEmissions /= noOfPassenger; // 50% reduction for carpooling
    } else if (mode === "public") {
        transportEmissions = (dailyDistance || 0) * EMISSION_FACTORS.transport.public;
    } else if (mode === "bike") {
        transportEmissions = (dailyDistance || 0) * EMISSION_FACTORS.transport.bike;
    } // No emissions for walk

    // ⚡ **Energy Emissions**
    let electricityEmissions = (electricityBill || 0) * (EMISSION_FACTORS.energy[energyType] || 0);

    // 🍗 **Food Emissions**
    let foodEmissions = EMISSION_FACTORS.food[meatFrequency] || 0;
    if (meatFrequency === "4+" && meatLover) {
        foodEmissions += meatLover * 1.2; // Additional emissions for extra meat intake
    }
    foodEmissions += EMISSION_FACTORS.dairy[dairyFrequency] || 0;

    // 🛍️ **Shopping Emissions**
    let shoppingEmissions = 0;
    console.log("Here");
    
    try {
        if (purchaseCategory === "small_clothing") {
            console.log("Here small clothing");
            shoppingEmissions += (EMISSION_FACTORS.shopping.small_items[shoppingFrequency] || 0);
            shoppingEmissions += (EMISSION_FACTORS.shopping.clothing[clothingPurchase] || 0);
        }
        if (purchaseCategory === "electronics") {
            console.log("Here electroniscs");
            shoppingEmissions += (EMISSION_FACTORS.shopping.small_electronics[electronicsReplacement] );
            shoppingEmissions += (EMISSION_FACTORS.shopping.medium_electronics[mediumElectronics] );
        }
        if (purchaseCategory === "home_goods") {
            shoppingEmissions += (EMISSION_FACTORS.shopping.home_furniture[homeFurniture] || 0);
            shoppingEmissions += (EMISSION_FACTORS.shopping.large_appliances[applianceReplacement] || 0);
        }
    } catch (error) { 
        console.log({message:error.message});
    }

    // Apply eco-friendly reduction
    if (ecoFriendly === "true") {
        shoppingEmissions *= 0.5;
    }


    // 🌍 **Total Carbon Footprint**
    const total = transportEmissions + electricityEmissions + foodEmissions + shoppingEmissions;

    return { transportEmissions, electricityEmissions, foodEmissions, shoppingEmissions, total };
};

export default calculateEmissions;

