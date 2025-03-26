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

const calculateEmissions = ({ vehicleType, fuelAmount, electricityBill, foodType, shoppingAmount, shoppingType, ecoFriendly }) => {
    const EMISSION_FACTORS = {
        transport: {
            car: 0.18,  // kg CO2 per km
            bike: 0.05, // kg CO2 per km (motorcycle)
            bus: 0.07,  // kg CO2 per passenger-km
            train: 0.03, // kg CO2 per passenger-km
            bicycle: 0.0, // No emissions
            walking: 0.0  // No emissions
        },
        energy: {
            electricity: 0.5 // kg CO2 per unit (kWh) of electricity
        },
        food: {
            vegan: 1.0, // kg CO2 per day
            vegetarian: 1.5, 
            non_vegetarian: 3.0
        },
        shopping: {
            low: 2,   // kg CO2 per day
            medium: 5,
            high: 10
        }
    };

    // Transport emissions
    const transportEmissions = (fuelAmount || 0) * (EMISSION_FACTORS.transport[vehicleType] || 0);

    // Energy emissions (electricity bill-based)
    const electricityEmissions = (electricityBill || 0) * EMISSION_FACTORS.energy.electricity;

    // Food emissions
    const foodEmissions = EMISSION_FACTORS.food[foodType] || 0;

    // Shopping emissions with eco-friendly discount
    let shoppingEmissions = (shoppingAmount || 0) * 0.002; // Assuming 2 kg CO2 per $1000 spent
    if (ecoFriendly === "yes") {
        shoppingEmissions *= 0.5; // 50% reduction for eco-friendly purchases
    }

    // Total emissions
    const total = transportEmissions + electricityEmissions + foodEmissions + shoppingEmissions;

    return { transportEmissions, electricityEmissions, foodEmissions, shoppingEmissions, total };
};

export default calculateEmissions;
