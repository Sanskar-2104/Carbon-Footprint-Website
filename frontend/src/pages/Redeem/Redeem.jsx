// Supriya
import "./Redeem.css";

const Redeem = () => {
  return (
    <div className="redeem-container">
      <div className="points-bar full-width">Your points: 2341</div>
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