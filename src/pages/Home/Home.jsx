// import React from "react";
// import "./Home.css";
// import { Link } from "react-router-dom";
// import { FaLeaf, FaChartPie, FaGift, FaUsers, FaQuestionCircle, FaGlobe } from "react-icons/fa";
// import { motion } from "framer-motion";

// const Home = () => {
//   return (
//     <div className="home-container">
//       {/* Animated Background */}
//       <div className="animated-bg"></div>
      
//       {/* Hero Section */}
//       <section className="hero">
//       <video autoPlay loop muted playsInline className="hero-video">
//         <source src="earth.mp4" type="video/mp4" />
//       </video>
//       <div className="hero-content">
//         <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
//           Track, Reduce, and Reward Your Carbon Footprint!
//         </motion.h1>
//         <p>Discover your impact on the planet and take steps to make a difference while earning rewards!</p>
//         <div className="hero-buttons">
//           <Link to="/calculate" className="btn primary">Calculate Your Footprint</Link>
//           <a href="#why-it-matters" className="btn secondary">Learn More</a>
//         </div>
//       </div>
//     </section>
      
//       {/* Why It Matters */}
//       <section id="why-it-matters" className="bento-grid">
//         <div className="bento-card">
//           <h2>Why It Matters</h2>
//           <p>Each person emits an average of <strong>X tons</strong> of CO₂ per year! Reducing your footprint makes a difference.</p>
//         </div>
//         <div className="bento-card stat">
//           <FaLeaf className="icon" />
//           <p>Reducing your footprint by <strong>20%</strong> can help save Y trees annually!</p>
//         </div>
//         <div className="bento-card stat">
//           <FaGlobe className="icon" />
//           <p>Every action contributes to a greener planet!</p>
//         </div>
//       </section>
      
//       {/* How It Works */}
//       <section className="how-it-works glass-card">
//         <h2>How It Works</h2>
//         <div className="steps">
//           <div className="step"><FaLeaf /> Answer a Quick Quiz</div>
//           <div className="step"><FaChartPie /> Earn Points</div>
//           <div className="step"><FaGift /> Redeem Rewards</div>
//         </div>
//       </section>
      
//       {/* Gamification Preview */}
//       <section className="gamification bento-grid">
//         <div className="bento-card">
//           <h2>Join the Movement</h2>
//           <p>See how users are making a difference!</p>
//         </div>
//         <div className="bento-card stat">
//           <p>Alex reduced 30% of emissions this month and earned 500 points!</p>
//         </div>
//       </section>
      
//       {/* About Us */}
//       <section className="about glass-card">
//         <h2>About Us</h2>
//         <p>We aim to empower individuals to track and reduce their carbon footprint through an engaging and rewarding experience.</p>
//       </section>
      
//       {/* FAQs */}
//       <section className="faq glass-card">
//         <h2>FAQs</h2>
//         <div className="faq-item">
//           <FaQuestionCircle /> <p><strong>How does this work?</strong> Answer a quiz, earn points, and redeem rewards for eco-friendly actions!</p>
//         </div>
//         <div className="faq-item">
//           <FaQuestionCircle /> <p><strong>Is it free?</strong> Yes! Our platform is completely free to use.</p>
//         </div>
//       </section>
      
//       {/* Call-to-Action */}
//       <section className="cta glass-card">
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


// import React from "react";
// import "./Home.css";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Leaf, Gift, BarChart3, Users, HelpCircle } from "lucide-react";

// const Home = () => {
//   return (
//     <div className="home-container">
//       {/* Hero Section */}
//       <section className="hero">
//         <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
//           Track, Reduce & Earn Rewards for Your Carbon Footprint!
//         </motion.h1>
//         <p>Join thousands in making a difference while earning rewards for sustainable choices.</p>
//         <div className="hero-buttons">
//           <Link to="/calculate" className="btn primary">Start Your Journey</Link>
//           <a href="#why-it-matters" className="btn secondary">Learn More</a>
//         </div>
//       </section>

//       {/* Why It Matters */}
//       <section id="why-it-matters" className="info-section">
//         <h2>Why It Matters</h2>
//         <div className="stats">
//           <div className="stat-card"><BarChart3 size={50} /> An average person emits <strong>4.8 tons</strong> of CO₂ yearly!</div>
//           <div className="stat-card"><Leaf size={50} /> Reducing your footprint by <strong>20%</strong> can save Y trees annually!</div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="how-it-works">
//         <h2>How It Works</h2>
//         <div className="steps">
//           <div className="step"><Leaf size={40} /> Answer a Quick Quiz</div>
//           <div className="step"><Gift size={40} /> Earn Points</div>
//           <div className="step"><Users size={40} /> Redeem Rewards</div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="faq">
//         <h2>Frequently Asked Questions</h2>
//         <div className="faq-item"><HelpCircle size={30} /> <strong>How do I earn points?</strong> Reduce emissions and complete eco-friendly tasks.</div>
//         <div className="faq-item"><HelpCircle size={30} /> <strong>What can I redeem points for?</strong> Discounts, gifts, and eco-friendly products.</div>
//       </section>

//       {/* Footer */}
//       <footer>
//         <div className="footer-links">
//           <Link to="/about">About</Link>
//           <Link to="/faq">FAQs</Link>
//           <Link to="/contact">Contact</Link>
//         </div>
//         <p className="tip">Sustainability Tip: Switch to LED bulbs & save energy!</p>
//       </footer>
//     </div>
//   );
// };

// export default Home;

// import React, { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import * as THREE from "three";
// import gsap from "gsap";
// import "./Home.css";

// export default function HeroSection() {
//   const earthRef = useRef(null);

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.z = 3;

//     const renderer = new THREE.WebGLRenderer({ alpha: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     earthRef.current.appendChild(renderer.domElement);

//     // Load Earth Texture
//     const textureLoader = new THREE.TextureLoader();
//     const earthTexture = textureLoader.load("https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg");
//     const bumpMap = textureLoader.load("https://www.solarsystemscope.com/textures/download/2k_earth_nightmap.jpg");

//     // Create Earth Sphere
//     const geometry = new THREE.SphereGeometry(1, 64, 64);
//     const material = new THREE.MeshStandardMaterial({
//       map: earthTexture,
//       bumpMap: bumpMap,
//       bumpScale: 0.05,
//     });
//     const earth = new THREE.Mesh(geometry, material);
//     scene.add(earth);

//     // Add Light
//     const light = new THREE.PointLight(0xffffff, 1.5);
//     light.position.set(5, 3, 5);
//     scene.add(light);

//     // Create Smoke Particles
//     const smokeParticles = [];
//     const smokeTexture = textureLoader.load("https://threejs.org/examples/textures/sprites/smoke.png");
//     const smokeMaterial = new THREE.SpriteMaterial({ map: smokeTexture, transparent: true, opacity: 0.3 });

//     for (let i = 0; i < 50; i++) {
//       const smoke = new THREE.Sprite(smokeMaterial);
//       smoke.position.set(
//         (Math.random() - 0.5) * 2, // Random X
//         (Math.random() - 0.5) * 2, // Random Y
//         (Math.random() - 0.5) * 2  // Random Z
//       );
//       smoke.scale.set(0.5, 0.5, 0.5);
//       scene.add(smoke);
//       smokeParticles.push(smoke);
//     }

//     // Animate
//     function animate() {
//       requestAnimationFrame(animate);
//       earth.rotation.y += 0.002;
//       smokeParticles.forEach((smoke) => {
//         smoke.position.y += 0.002; // Smoke rises
//         if (smoke.position.y > 1.5) {
//           smoke.position.y = -1.5; // Reset position
//         }
//       });
//       renderer.render(scene, camera);
//     }
//     animate();

//     // Handle Resizing
//     window.addEventListener("resize", () => {
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//     });

//     return () => {
//       window.removeEventListener("resize", () => {});
//       earthRef.current.removeChild(renderer.domElement);
//     };
//   }, []);

//   return (
//     <div className="hero-container">
//       <div ref={earthRef} className="earth-container"></div>
//       <div className="hero-content">
//         <h1>Calculate Your Carbon Footprint</h1>
//         <p>Take the quiz and discover how you can make a difference in reducing carbon emissions.</p>
//         <div className="hero-buttons">
//           <Link to="/calculate" className="btn primary">Get Started</Link>
//           <Link to="/learn" className="btn secondary">Learn More</Link>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Link } from "react-router-dom";
import "./Home.css";
import Earth from "./RotatingEarth"; // 3D Earth Component

const Hero = () => {
  const [carbonReduction, setCarbonReduction] = useState(12034); // Dummy counter

  useEffect(() => {
    const interval = setInterval(() => {
      setCarbonReduction((prev) => prev + Math.floor(Math.random() * 5 + 1));
    }, 2000); // Increase counter every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero-3d">
        <Canvas>
          <OrbitControls enableZoom={false} autoRotate />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {/* <Stars /> */}
          <Earth />
        </Canvas>
      </div>

      <div className="hero-content">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          Track & Reduce Your Carbon Footprint
        </motion.h1>
        <p>See your impact and take action towards a greener future.</p>

        <div className="carbon-counter">
          🌱 CO₂ Reduced: <span>{carbonReduction} kg</span>
        </div>

        <div className="hero-buttons">
          <Link to="/calculate" className="btn primary">Start Calculating</Link>
          <a href="#why-it-matters" className="btn secondary">Learn More</a>
        </div>
      </div>

      <div className="leaf-animation"></div> {/* Floating Leaf Effect */}
    </section>
  );
};

export default Hero;
