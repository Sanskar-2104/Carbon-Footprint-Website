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


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Gift, BarChart3, Users, HelpCircle, ArrowDown, ArrowUp, Medal, Trophy, BadgeCheck } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "./Home.css";

// Sample data for charts
const savingsData = [
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
  const [activeFeature, setActiveFeature] = useState(null);

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const slideIn = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
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
            Track Your <span className="text-gradient">Carbon Footprint</span> & Make a Difference
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

      {/* Stats Overview Section */}
      <section className="stats-section">
        <motion.div 
          className="stats-container"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            { label: "CO₂ Saved", value: "1,240 kg", icon: <ArrowDown size={20} className="stats-icon" /> },
            { label: "Energy Saved", value: "320 kWh", icon: <ArrowDown size={20} className="stats-icon" /> },
            { label: "Trees Planted", value: "24", icon: <ArrowUp size={20} className="stats-icon" /> },
            { label: "Community Rank", value: "#42", icon: <Medal size={20} className="stats-icon" /> }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={fadeIn}
              className="stat-card"
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-header">
                {stat.icon}
                <span className="stat-label">{stat.label}</span>
              </div>
              <span className="stat-value">{stat.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Analytics Section with Bento Grid */}
      <section className="bento-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          Real-Time Analytics
        </motion.h2>

        <div className="bento-grid">
          {/* Graph Section - Large */}
          <motion.div
            className="graph-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <h3>Your Carbon Reduction Progress</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={savingsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid #333' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="saved" 
                    stroke="#4CAF50" 
                    strokeWidth={3}
                    dot={{ stroke: '#4CAF50', strokeWidth: 2, r: 4, fill: '#000' }}
                    activeDot={{ stroke: '#4CAF50', strokeWidth: 2, r: 8, fill: '#000' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Feature Cards */}
          {[
            { icon: <Leaf size={40} />, title: "Eco-Friendly Insights", description: "Understand your carbon footprint in detail" },
            { icon: <BarChart3 size={40} />, title: "Data-Driven Tracking", description: "Monitor your progress in real-time" },
            { icon: <Users size={40} />, title: "Community Impact", description: "See your contribution to global sustainability" },
            { icon: <Gift size={40} />, title: "Rewards & Challenges", description: "Earn rewards for sustainability" },
            { icon: <HelpCircle size={40} />, title: "Expert Guidance", description: "Get tips from sustainability experts" }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className={`feature-box ${activeFeature === index ? 'feature-active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Carbon Impact Section */}
      <section className="carbon-impact">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Visualize Your Impact
        </motion.h2>

        <div className="impact-container">
          {/* Before & After Animation */}
          <motion.div
            className="impact-animation"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="image-container">
              <AnimatePresence mode="wait">
                <motion.img
                  key={showGreenWorld ? "green" : "polluted"}
                  src={showGreenWorld ? "/assets/earth-green.jpg" : "/assets/earth-polluted.jpg"}
                  alt="World Impact"
                  className="impact-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              
              <div className="image-caption">
                <h3>{showGreenWorld ? "A Greener Tomorrow" : "Current Environmental Challenge"}</h3>
                <p>
                  {showGreenWorld 
                    ? "By reducing your carbon footprint, you contribute to a healthier planet"
                    : "Our current carbon emissions lead to pollution and climate change"
                  }
                </p>
              </div>
            </div>
            
            <motion.button 
              className="toggle-btn"
              onClick={() => setShowGreenWorld(!showGreenWorld)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show {showGreenWorld ? "Current Reality" : "Potential Future"}
            </motion.button>
          </motion.div>

          {/* Interactive CO₂ Savings Chart */}
          <motion.div 
            className="impact-metrics"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { title: "Reduce CO₂ Emissions", metric: "324 kg", description: "Amount of CO₂ you can save monthly" },
              { title: "Plant Trees", metric: "8 trees", description: "Equivalent environmental impact per month" },
              { title: "Save Water", metric: "1,200 gallons", description: "Water saved through sustainable practices" },
              { title: "Reduce Waste", metric: "85%", description: "Potential waste reduction through recycling" }
            ].map((metric, index) => (
              <motion.div
                key={index}
                className="metric-card"
                variants={slideIn}
                whileHover={{ scale: 1.03 }}
              >
                <h3>{metric.title}</h3>
                <div className="metric-value">{metric.metric}</div>
                <p>{metric.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="gamification">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Compete with Friends, Unlock Green Rewards!
        </motion.h2>

        <div className="gamification-container">
          {/* Leaderboard */}
          <motion.div 
            className="leaderboard"
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
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

          {/* Achievements */}
          <motion.div 
            className="achievements"
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
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

        {/* Call to Action */}
        <motion.a 
          href="#" 
          className="join-now-btn"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          viewport={{ once: true }}
        >
          Join Now
        </motion.a>
      </section>
    </div>
  );
};

export default Home;