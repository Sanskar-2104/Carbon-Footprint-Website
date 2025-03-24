// import React from "react";
// import "./Home.css";
// import { Link } from "react-router-dom";
// import { FaLeaf, FaChartPie, FaGift } from "react-icons/fa";
// import { motion } from "framer-motion";

// const Home = () => {
//   return (
//     <div className="home-container">
//       {/* Hero Section */}
//       <section className="hero">
//         <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
//           Track, Reduce, and Reward Your Carbon Footprint!
//         </motion.h1>
//         <p>Discover your impact on the planet and take steps to make a difference while earning rewards!</p>
//         <div className="hero-buttons">
//           <Link to="/calculate" className="btn primary">Calculate Your Footprint</Link>
//           <a href="#why-it-matters" className="btn secondary">Learn More</a>
//         </div>
//       </section>
      
//       {/* Why It Matters */}
//       <section id="why-it-matters" className="info-section">
//         <h2>Why It Matters</h2>
//         <div className="stats">
//           <div className="stat-card">An average person emits <strong>X tons</strong> of CO₂ per year!</div>
//           <div className="stat-card">Reducing your footprint by <strong>20%</strong> can help save Y trees annually!</div>
//         </div>
//       </section>
      
//       {/* How It Works */}
//       <section className="how-it-works">
//         <h2>How It Works</h2>
//         <div className="steps">
//           <div className="step"><FaLeaf /> Answer a Quick Quiz</div>
//           <div className="step"><FaChartPie /> Earn Points</div>
//           <div className="step"><FaGift /> Redeem Rewards</div>
//         </div>
//       </section>
      
//       {/* Gamification Preview */}
//       <section className="gamification">
//         <h2>Join the Movement</h2>
//         <p>See how users are making a difference!</p>
//         <div className="footprint-visual">
//           <p>Alex reduced 30% of emissions this month and earned 500 points!</p>
//         </div>
//       </section>
      
//       {/* Call-to-Action */}
//       <section className="cta">
//         <h2>Ready to Make a Difference?</h2>
//         <Link to="/calculate" className="btn primary">Start Now</Link>
//       </section>
      
//       {/* Footer */}
//       <footer>
//         <div className="footer-links">
//           <Link to="/about">About</Link>
//           <Link to="/faq">FAQs</Link>
//           <Link to="/contact">Contact</Link>
//         </div>
//         <p className="tip">Sustainability Tip: Turn off lights when not in use to save energy!</p>
//       </footer>
//     </div>
//   );
// };

// export default Home;



import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Gift, BarChart3, Users, HelpCircle } from "lucide-react";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          Track, Reduce & Earn Rewards for Your Carbon Footprint!
        </motion.h1>
        <p>Join thousands in making a difference while earning rewards for sustainable choices.</p>
        <div className="hero-buttons">
          <Link to="/calculate" className="btn primary">Start Your Journey</Link>
          <a href="#why-it-matters" className="btn secondary">Learn More</a>
        </div>
      </section>

      {/* Why It Matters */}
      <section id="why-it-matters" className="info-section">
        <h2>Why It Matters</h2>
        <div className="stats">
          <div className="stat-card"><BarChart3 size={50} /> An average person emits <strong>4.8 tons</strong> of CO₂ yearly!</div>
          <div className="stat-card"><Leaf size={50} /> Reducing your footprint by <strong>20%</strong> can save Y trees annually!</div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step"><Leaf size={40} /> Answer a Quick Quiz</div>
          <div className="step"><Gift size={40} /> Earn Points</div>
          <div className="step"><Users size={40} /> Redeem Rewards</div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item"><HelpCircle size={30} /> <strong>How do I earn points?</strong> Reduce emissions and complete eco-friendly tasks.</div>
        <div className="faq-item"><HelpCircle size={30} /> <strong>What can I redeem points for?</strong> Discounts, gifts, and eco-friendly products.</div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/faq">FAQs</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <p className="tip">Sustainability Tip: Switch to LED bulbs & save energy!</p>
      </footer>
    </div>
  );
};

export default Home;