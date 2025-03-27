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
import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Gift, BarChart3, Users, HelpCircle } from "lucide-react";
import { Medal, Trophy, BadgeCheck } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", saved: 10 },
  { month: "Feb", saved: 30 },
  { month: "Mar", saved: 50 },
  { month: "Apr", saved: 70 },
  { month: "May", saved: 90 },
  { month: "Jun", saved: 120 },
  { month: "Jul", saved: 150 },
  { month: "Aug", saved: 180 },
  { month: "Sep", saved: 210 },
  { month: "Oct", saved: 250 },
  { month: "Nov", saved: 280 },
  { month: "Dec", saved: 300 },
];

const leaderboardData = [
  { rank: 1, name: "Alice Green", points: 1200 },
  { rank: 2, name: "John Eco", points: 1100 },
  { rank: 3, name: "Sophie Earth", points: 1050 },
  { rank: 4, name: "Mark Solar", points: 980 },
  { rank: 5, name: "Liam Nature", points: 950 },
];

const achievements = [
  { icon: <Medal size={32} />, title: "Eco Warrior", description: "Completed 10 green actions" },
  { icon: <Trophy size={32} />, title: "Carbon Saver", description: "Reduced 50kg CO₂" },
  { icon: <BadgeCheck size={32} />, title: "Sustainability Champ", description: "Top 10 leaderboard" },
];

const Home = () => {
  const [showGreenWorld, setShowGreenWorld] = useState(false);
  return (
    <>
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        {/* Background Video */}
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/assets/earth3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="overlay"></div>

        {/* Hero Content */}
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
            Calculate your daily impact on the environment and take steps
            towards a cleaner, greener future.
          </motion.p>

          <motion.a
            href="/calculate"
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

      

      <section className="bento-container">
      <motion.h2
        className="title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        Live Data Analytics
      </motion.h2>

      <div className="bento-grid">
        {/* Graph Section - Large */}
        <motion.div
          className="graph-box"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: "easeInOut" }}
        >
          📊 Graph Here
        </motion.div>

        {/* Feature 1 */}
        <motion.div className="feature-box" whileHover={{ scale: 1.05 }}>
          <Leaf size={40} />
          <h3>Eco-Friendly Insights</h3>
          <p>Understand your carbon footprint.</p>
        </motion.div>

        {/* Feature 2 */}
        <motion.div className="feature-box" whileHover={{ scale: 1.05 }}>
          <BarChart3 size={40} />
          <h3>Data-Driven Tracking</h3>
          <p>Monitor your progress in real time.</p>
        </motion.div>

        {/* Feature 3 */}
        <motion.div className="feature-box" whileHover={{ scale: 1.05 }}>
          <Users size={40} />
          <h3>Community Engagement</h3>
          <p>Join a global impact community.</p>
        </motion.div>

        {/* Feature 4 */}
        <motion.div className="feature-box" whileHover={{ scale: 1.05 }}>
          <Gift size={40} />
          <h3>Rewards & Challenges</h3>
          <p>Earn rewards for sustainability.</p>
        </motion.div>

        {/* Feature 5 */}
        <motion.div className="feature-box" whileHover={{ scale: 1.05 }}>
          <HelpCircle size={40} />
          <h3>Expert Guidance</h3>
          <p>Get sustainability tips from experts.</p>
        </motion.div>
      </div>
    </section>

    {/* <section className="gamification">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        Compete with Friends, Unlock Green Rewards!
      </motion.h2>

      <div className="gamification-container">
        {/* Leaderboard *
        <motion.div 
          className="leaderboard"
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <h3>Leaderboard</h3>
          <ul>
            {leaderboardData.map((player, index) => (
              <motion.li 
                key={index}
                className={`leaderboard-item ${index < 3 ? "top-rank" : ""}`}
                whileHover={{ scale: 1.05 }}
              >
                <span className="rank">#{player.rank}</span>
                <span className="name">{player.name}</span>
                <span className="points">{player.points} pts</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Achievements *
        <motion.div 
          className="achievements"
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <h3>Achievements</h3>
          <div className="achievement-grid">
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index} 
                className="achievement-card"
                whileHover={{ scale: 1.05 }}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <h4>{achievement.title}</h4>
                <p>{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Call to Action *
      <motion.a 
        href="#" 
        className="join-now-btn"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Join Now
      </motion.a>
    </section> */}

       <section className="carbon-impact">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
          >
            Track Your CO₂ Savings
          </motion.h2>

          <div className="impact-container">
            {/* Before & After Animation */}
            <motion.div
              className="impact-animation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.img
                src={showGreenWorld ? "/assets/earth-green.jpg" : "/assets/earth-polluted.jpg"}
                alt="World Impact"
                className="impact-image"
                key={showGreenWorld ? "green" : "polluted"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              <motion.button 
                className="toggle-btn"
                onClick={() => setShowGreenWorld(!showGreenWorld)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showGreenWorld ? "See Polluted World" : "See Green World"}
              </motion.button>
            </motion.div>

            {/* Interactive CO₂ Savings Chart */}
            <motion.div 
              className="impact-chart"
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="saved" stroke="#4CAF50" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </section>

    
      </div>
    </>
  );
};

export default Home;
