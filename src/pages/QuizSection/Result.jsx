// import React from "react";
// import { PieChart, Pie} from "recharts";
//  // Import for pie chart
// // import "./Result.css"; // Add CSS for styling

// const Result = ({ userCarbonData }) => {
//   // Sample data format: { total: 29.4, categories: { transport: 45, food: 21, flight: 12, shopping: 9 } }

//   const footprintFill = userCarbonData.total / 50 * 100; // Scale to max 100%

//   const pieData = Object.entries(userCarbonData.categories).map(([key, value]) => ({
//     name: key,
//     value: value,
//   }));

//   return (
//     <div className="result-container">
//       <h2>Your Carbon Footprint in Environment</h2>

//       {/* Footprint Representation */}
//       <div className="footprint">
//         <svg viewBox="0 0 200 300" className="footprint-svg">
//           <defs>
//             <mask id="footprint-mask">
//               <rect x="0" y={(100 - footprintFill) * 2.5} width="200" height="300" fill="white" />
//             </mask>
//           </defs>
//           <image
//             href="/footprint-outline.png" // Use an outline footprint image
//             width="200"
//             height="300"
//             mask="url(#footprint-mask)"
//           />
//         </svg>
//       </div>

//       {/* Pie Chart */}
//       <h3>Statistics</h3>
//       <PieChart width={200} height={200}>
//         <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={50} fill="#82ca9d" />
//       </PieChart>

//       {/* Tips Section */}
//       <h3>Tips</h3>
//       <p>Based on your emissions, transportation is a major contributor...</p>
//     </div>
//   );
// };

// export default Result;
