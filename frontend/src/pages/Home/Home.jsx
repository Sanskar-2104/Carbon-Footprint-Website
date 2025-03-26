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
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Leaf, Gift, BarChart3, Users, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";


const Home = () => {
  return (
    <section className="hero">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="hero-video">
        <source src="/assets/earth3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="overlay"></div>

      {/* Hero Content (Now on the left side) */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
        >
          Track Your Carbon Footprint & Make a Difference
        </motion.h1>

        <motion.p
          className="hero-text"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: "easeInOut" }}
        >
          Calculate your daily impact on the environment and take steps towards a cleaner, greener future.
        </motion.p>

        <motion.a
          href="#"
          className="hero-btn"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Home;
