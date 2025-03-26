import React, { useState } from "react";
import { useUserInput } from "../context/UserInputContext";

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
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Result Page</h1>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Calculating..." : "Calculate Footprint"}
      </button>
      {response && (
        <div>
          <h2>Carbon Footprint:</h2>
          <p>{response.total} kg CO₂</p>
        </div>
      )}
    </div>
  );
};

export default Result;
