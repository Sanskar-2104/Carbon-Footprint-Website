import React from "react";
import { motion } from "framer-motion";

const FootprintProgress = ({ percentage }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg
        viewBox="0 0 200 400"
        width="100"
        height="200"
        style={{ position: "relative" }}
      >
        {/* Footprint Shape */}
        <path
          d="M100 20 C130 -10, 170 20, 160 60 C180 90, 140 130, 120 160 C160 190, 180 250, 150 300 C120 350, 80 370, 50 310 C20 250, 40 190, 80 160 C60 130, 20 90, 40 60 C30 20, 70 0, 100 20 Z"
          fill="#ccc"
          stroke="#333"
          strokeWidth="4"
        />
        
        {/* Filling Animation */}
        <motion.path
          d="M100 20 C130 -10, 170 20, 160 60 C180 90, 140 130, 120 160 C160 190, 180 250, 150 300 C120 350, 80 370, 50 310 C20 250, 40 190, 80 160 C60 130, 20 90, 40 60 C30 20, 70 0, 100 20 Z"
          fill="rgba(0, 150, 0, 0.7)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: percentage / 100 }}
          transition={{ duration: 1.5 }}
        />
      </svg>
      
      {/* Display Percentage */}
      <p style={{ marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}>
        {percentage}% Carbon Footprint
      </p>
    </div>
  );
};

export default FootprintProgress;
