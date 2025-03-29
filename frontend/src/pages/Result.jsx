// import React, { useState } from "react";
// import { useUserInput } from "../context/UserInputContext";

// const Result = () => {
//   const { userData } = useUserInput();
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState(null);

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/footprint/calculate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });
//       if (!res.ok) {
//         throw new Error("Server error: " + data.error || "Unknown error");
//       }
//       const data = await res.json();
//       setResponse(data);
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Result Page</h1>
//       <pre>{JSON.stringify(userData, null, 2)}</pre>
//       <button onClick={handleSubmit} disabled={loading}>
//         {loading ? "Calculating..." : "Calculate Footprint"}
//       </button>
//       {response && (
//         <div>
//           <h2>Carbon Footprint:</h2>
//           <p>🌍 {response.footprint.total} kg CO₂</p>
//           <h3>Breakdown:</h3>
//           <ul>
//             <li>🚗 Transport: {response.footprint.transportEmissions} kg CO₂</li>
//             <li>⚡ Electricity: {response.footprint.electricityEmissions} kg CO₂</li>
//             <li>🍽 Food: {response.footprint.foodEmissions} kg CO₂</li>
//             <li>🛍 Shopping: {response.footprint.shoppingEmissions} kg CO₂</li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Result;




// import React, { useState } from "react";
// import { useUserInput } from "../context/UserInputContext";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
// import { Car, Bolt, Utensils, ShoppingBag } from "lucide-react"; // Import icons
// import FootprintProgress from "./FootprintProgress";

// const Result = () => {
//   const { userData } = useUserInput();
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState(null);

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/footprint/calculate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });
//       if (!res.ok) {
//         throw new Error("Server error: " + (await res.text()));
//       }
//       const data = await res.json();
//       setResponse(data);
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Define chart colors
//   const COLORS = ["#3B322C", "#4E6151", "#5E8C61", "#76B98F"];

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h1>Result Page</h1>
//       <button onClick={handleSubmit} disabled={loading}>
//         {loading ? "Calculating..." : "Calculate Footprint"}
//       </button>

//       {response && (
//         <div>
//           <h2>Total Carbon Footprint: {response.footprint.total} kg CO₂</h2>
          
//           {/* Pie Chart and Breakdown Side by Side */}
//           <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "30px" }}>
            
//             {/* Hollow (Doughnut) Pie Chart */}
//             <PieChart width={350} height={350}>
//               <Pie
//                 data={[
//                   { name: "Transport", value: response.footprint.transportEmissions },
//                   { name: "Electricity", value: response.footprint.electricityEmissions },
//                   { name: "Food", value: response.footprint.foodEmissions },
//                   { name: "Shopping", value: response.footprint.shoppingEmissions },
//                 ]}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={100}
//                 innerRadius={50} // <-- This makes it a doughnut!
//                 fill="#8884d8"
//                 dataKey="value"
//                 label
//               >
//                 {COLORS.map((color, index) => (
//                   <Cell key={`cell-${index}`} fill={color} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>

//             {/* Breakdown List */}
//             <div>
//               <h3>Breakdown:</h3>
//               <ul style={{ listStyle: "none", padding: 0 }}>
//                 <li>
//                   <Car size={18} style={{ marginRight: "8px", verticalAlign: "left" }} />
//                   <b>Transport:</b> {response.footprint.transportEmissions} kg CO₂
//                 </li>
//                 <li>
//                   <Bolt size={18} style={{ marginRight: "8px", verticalAlign: "left" }} />
//                   <b>Electricity:</b> {response.footprint.electricityEmissions} kg CO₂
//                 </li>
//                 <li>
//                   <Utensils size={18} style={{ marginRight: "8px", verticalAlign: "left" }} />
//                   <b>Food:</b> {response.footprint.foodEmissions} kg CO₂
//                 </li>
//                 <li>
//                   <ShoppingBag size={18} style={{ marginRight: "8px", verticalAlign: "left" }} />
//                   <b>Shopping:</b> {response.footprint.shoppingEmissions} kg CO₂
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Result;



import React, { useState, useEffect } from "react";
import { useUserInput } from "../context/UserInputContext";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Car, Bolt, Utensils, ShoppingBag, Bus, Lightbulb, Leaf, RefreshCcw, Plug, ShoppingCart, Wind, Plane } from "lucide-react"; 
import FootprintProgress from "./FootprintProgress"; // Import FootprintProgress

const Result = () => {
  const { userData } = useUserInput();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/footprint/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        throw new Error("Server error: " + (await res.text()));
      }
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Define chart colors
  const COLORS = ["#3B322C", "#4E6151", "#5E8C61", "#76B98F"];

  // Sustainability Tips with Icons
  const tipsWithIcons = [
    { text: "Use public transport or carpool to reduce emissions.", icon: <Bus size={24} /> },
    { text: "Switch to energy-efficient appliances to save electricity.", icon: <Lightbulb size={24} /> },
    { text: "Eat more plant-based meals to lower your food footprint.", icon: <Leaf size={24} /> },
    { text: "Reduce, reuse, and recycle to minimize shopping waste.", icon: <RefreshCcw size={24} /> },
    { text: "Unplug devices when not in use to save energy.", icon: <Plug size={24} /> },
    { text: "Choose sustainable brands when shopping.", icon: <ShoppingCart size={24} /> },
    { text: "Dry clothes naturally instead of using a dryer.", icon: <Wind size={24} /> },
    { text: "Limit air travel and opt for virtual meetings.", icon: <Plane size={24} /> },
  ];
  
  // Function to get three random tips
  const getRandomTips = (tipsArray, count = 3) => {
    const shuffled = [...tipsArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  
  const [selectedTips, setSelectedTips] = useState([]);
  
  useEffect(() => {
    setSelectedTips(getRandomTips(tipsWithIcons));
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Result Page</h1>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      <button 
        onClick={handleSubmit} 
        disabled={loading} 
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          background: "#5E8C61",
          color: "#fff",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        {loading ? "Calculating..." : "Calculate Footprint"}
      </button>

      {response && (
        <div>
          <h2>Total Carbon Footprint: {response.footprint.total} kg CO₂</h2>

          {/* Footprint Progress Visualization */}
          <FootprintProgress percentage={(response.footprint.total / 1000) * 100} />

          {/* Pie Chart and Breakdown Side by Side */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "30px", marginTop: "20px" }}>
            
            {/* Hollow (Doughnut) Pie Chart */}
            <PieChart width={350} height={350}>
              <Pie
                data={[
                  { name: "Transport", value: response.footprint.transportEmissions },
                  { name: "Electricity", value: response.footprint.electricityEmissions },
                  { name: "Food", value: response.footprint.foodEmissions },
                  { name: "Shopping", value: response.footprint.shoppingEmissions },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={50} // <-- Doughnut effect!
                fill="#8884d8"
                dataKey="value"
                label
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>

            {/* Breakdown List */}
            <div>
              <h3>Breakdown:</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li><Car size={18} /> <b>Transport:</b> {response.footprint.transportEmissions} kg CO₂</li>
                <li><Bolt size={18} /> <b>Electricity:</b> {response.footprint.electricityEmissions} kg CO₂</li>
                <li><Utensils size={18} /> <b>Food:</b> {response.footprint.foodEmissions} kg CO₂</li>
                <li><ShoppingBag size={18} /> <b>Shopping:</b> {response.footprint.shoppingEmissions} kg CO₂</li>
              </ul>
            </div>
          </div>

          {/* Sustainability Tips Section */}
          <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h2 style={{ marginBottom: "15px" }}>🌱 Sustainability Tips</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {selectedTips.map((tip, index) => (
          <div
            key={index}
            style={{
              width: "260px",
              padding: "20px",
              borderRadius: "15px",
              background: "#fff",
              transition: "0.3s",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "500",
              color: "#333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "10px",
              position: "relative",
              overflow: "hidden",
              border: "2px solid #ddd",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #76b98f, #4E6151)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.boxShadow = "0px 6px 15px rgba(0,0,0,0.3)";
              e.currentTarget.querySelector(".icon").style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#333";
              e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.15)";
              e.currentTarget.querySelector(".icon").style.color = "#4E6151";
            }}
          >
            <div className="icon" style={{ fontSize: "28px", color: "#4E6151" }}>
              {tip.icon}
            </div>
            <p style={{ margin: 0 }}>{tip.text}</p>
          </div>
        ))}
      </div>
    </div>

        </div>
      )}
    </div>
  );
};

export default Result;
