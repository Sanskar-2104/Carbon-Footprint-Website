// // Supriya
// import "./Redeem.css";
// import { useEffect,useState } from "react";

// const Redeem = () => {
//   const [points, setPoints] = useState(0);

//   const getPoints = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("Please login to redeem points");
//         return;
//       }
//       const response = await fetch("http://localhost:5000/api/gamification/points", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//       setPoints(data.points);
      
//     } catch (error) { 
//       console.error({ success: false, message: error.message});
//     }
//   }
//   useEffect(() => {
//     getPoints();
//   })
//   return (
//     <div className="redeem-container">
//       <div className="points-bar full-width">Your points: { points }</div>
//       <div className="redeem-section full-width increased-height">
//         <h1>LOGO</h1>
//         <p>Redeem gift cards for free using points</p>
//       </div>
//       <div className="cards-container">
//         {[3000, 4100, 3500].map((points, index) => (
//           <div key={index} className="card larger-card">
//             <div className="image-placeholder larger-placeholder"></div>
//             <button className="redeem-button">💰 {points}</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Redeem;




import { useEffect, useState } from "react";
import { CreditCard, Gift, Award, Sparkles } from "lucide-react";
import "./Redeem.css";

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
  
  const giftCards = [
    { id: 1, name: "Eco Shopping Voucher", points: 3000, logo: "A" },
    { id: 2, name: "Tree Planting Donation", points: 4100, logo: "S" },
    { id: 3, name: "Zero Waste Kit", points: 3500, logo: "N" },
    { id: 4, name: "Public Transport Pass", points: 2500, logo: "G" }
  ];

  const handleRedeem = async (pointsToRedeem) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("Please login to redeem points");
      return;
    }
  
    if (points >= pointsToRedeem) {
      const updatedPoints = points - pointsToRedeem;
      setPoints(updatedPoints);
  
      try {
        const resp = await fetch("http://localhost:5000/api/gamification/redeem-reward", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ pointsToRedeem }), // ✅ sending as object
        });
  
        if (!resp.ok) {
          const err = await resp.json();
          alert("Failed to redeem: " + (err.message || resp.statusText));
          return;
        }
  
        alert(`Successfully redeemed! You have ${updatedPoints} points remaining.`);
      } catch (error) {
        console.error("Error during redeem:", error);
        alert("Network error while redeeming points.");
      }
    } else {
      alert("Not enough points to redeem this gift card.");
    }
  };
  

  return (
    <div className="redeem-container">
      {/* Header with points display */}
      <div className="redeem-header">
        <div className="points-display">
          <div className="points-icon">
            <Sparkles size={20} />
          </div>
          <div className="points-amount">{points}</div>
          <div className="points-label">POINTS</div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="redeem-hero-section">
        <div className="redeem-hero-content">
          <h1 className="redeem-hero-title">Rewards Center</h1>
          <p className="redeem-hero-subtitle">Turn your points into amazing rewards</p>
          <div className="redeem-hero-decoration">
            <Gift className="redeem-hero-icon" size={38} />
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="cards-section">
        <h2 className="section-title">Available Gift Cards</h2>
        
        <div className="cards-grid">
          {giftCards.map((card) => (
            <div key={card.id} className={`gift-card ${points >= card.points ? '' : 'disabled'}`}>
              <div className="card-logo">
                <span>{card.logo}</span>
              </div>
              <div className="redeem-card-content">
                <h3 className="card-title">{card.name}</h3>
                <div className="card-points">
                  <Award size={16} />
                  <span>{card.points} points</span>
                </div>
              </div>
              <button 
                className="redeem-button"
                disabled={points < card.points}
                onClick={() => handleRedeem(card.points)}
              >
                <CreditCard size={16} />
                <span>Redeem</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Progress Section */}
      <section className="progress-section">
        <h2 className="section-title">Your Progress</h2>
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${Math.min(100, (points / 5000) * 100)}%` }}
            ></div>
          </div>
          <div className="progress-info">
            <span>{points} / 5000 points to next tier</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Redeem;
