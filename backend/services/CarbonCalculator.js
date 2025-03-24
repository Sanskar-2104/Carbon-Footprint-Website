const calculateEmissions = ({ transport, vehicleType, energy, food, shopping }) => { 
    const EMISSION_FACTORS = {
        transport: {
            petroleumCar: 0.2,
            electricCar: 0.05, 
            motorBike: 0.3,
            bicycle: 0.0,
            bus: 0.1,
            train: 0.08,
            walking: 0.0
        },
        energy: 0.5,
        food: 2,
        shopping: 0.5
    }

    const transportEmissions = transport * (EMISSION_FACTORS.transport[vehicleType] || 0.2);
    const energyEmissions = energy * EMISSION_FACTORS.energy;
    const foodEmissions = food * EMISSION_FACTORS.food;
    const shoppingEmissions = shopping * EMISSION_FACTORS.shopping;

    const total = transportEmissions + energyEmissions + foodEmissions + shoppingEmissions;

    return { transportEmissions, energyEmissions, foodEmissions, shoppingEmissions, total };
}

export default calculateEmissions;