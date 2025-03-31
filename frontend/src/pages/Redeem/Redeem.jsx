// Supriya
import "./Redeem.css";
import { useEffect,useState } from "react";

const Redeem = () => {
  const [points, setPoints] = useState(0);

  const getPoints = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to redeem points");
        return;
      }
      const response = await fetch("http://localhost:5000/api/gamification/points", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPoints(data.points);
      
    } catch (error) { 
      console.error({ success: false, message: error.message});
    }
  }
  useEffect(() => {
    getPoints();
  })
  return (
    <div className="redeem-container">
      <div className="points-bar full-width">Your points: { points }</div>
      <div className="redeem-section full-width increased-height">
        <h1>LOGO</h1>
        <p>Redeem gift cards for free using points</p>
      </div>
      <div className="cards-container">
        {[3000, 4100, 3500].map((points, index) => (
          <div key={index} className="card larger-card">
            <div className="image-placeholder larger-placeholder"></div>
            <button className="redeem-button">💰 {points}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Redeem;