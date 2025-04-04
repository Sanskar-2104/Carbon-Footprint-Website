import React, { createContext, useContext, useState } from "react";

const UserInputContext = createContext();

export const UserInputProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    transport: { mode: "", carpool: "", driveFrequency: "" , dailyDistance: ""},
    energy: { energyType: "", applianceUsage: "" ,electricityBill: "" },
    food: { meatFrequency: "", meatLover: "", dairyFrequency: "", restaurantChoice: "" },
    shopping: { purchaseCategory:"",shoppingFrequency:"", clothingPurchase: "", electronicsReplacement: "", mediumElectronics: "", homeFurniture: "", applianceReplacement: ""}, // Ensure shopping exists
  });

  const updateUserData = (category, data) => {
    setUserData((prev) => ({
      ...prev,
      [category]: { ...prev[category], ...data }, // Merge new data
    }));
  };

  return (
    <UserInputContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserInputContext.Provider>
  );
};

export const useUserInput = () => useContext(UserInputContext);
