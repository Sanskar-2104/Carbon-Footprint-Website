import React, { useEffect } from "react";
import "./About.css";
import { Globe, Zap, Trophy, RefreshCw, Mail } from "lucide-react";

const About = () => {
  useEffect(() => {
    // Add scroll animation for sections
    const sections = document.querySelectorAll('.about-section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="about-container">
      <div className="about-background"></div>
      
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <h1 className="title-gradient">About Our Carbon Footprint Calculator</h1>
          <div className="subtitle-container">
            <p>Empowering you to track and reduce your carbon footprint effortlessly.</p>
            <div className="about-hero-decoration"></div>
          </div>
        </div>
      </div>

      {/* Main content with sections */}
      <div className="sections-container">
        {/* What is This Project About? */}
        <section className="about-section" id="about">
          <div className="section-inner">
            <div className="section-icon">
              <Globe size={32} strokeWidth={1.5} />
            </div>
            <h2>What is This Project About?</h2>
            <div className="section-content">
              <p>
                Our tool helps individuals and businesses calculate their carbon footprint
                based on daily activities like food consumption, transportation, electricity use, 
                and shopping habits. Take action towards a sustainable future!
              </p>
            </div>
            <div className="section-bg section-bg-1"></div>
          </div>
        </section>

        {/* Key Features */}
        <section className="about-section" id="features">
          <div className="section-inner">
            <div className="section-icon">
              <Zap size={32} strokeWidth={1.5} />
            </div>
            <h2>Key Features</h2>
            <div className="section-content">
              <ul className="feature-list">
                <li>
                  <span className="feature-icon"><Zap size={20} /></span>
                  <span className="feature-text">Easy-to-use carbon calculator</span>
                </li>
                <li>
                  <span className="feature-icon"><RefreshCw size={20} /></span>
                  <span className="feature-text">Personalized insights and recommendations</span>
                </li>
                <li>
                  <span className="feature-icon"><Trophy size={20} /></span>
                  <span className="feature-text">Gamification with rewards system</span>
                </li>
                <li>
                  <span className="feature-icon"><Zap size={20} /></span>
                  <span className="feature-text">Seamless user experience with interactive UI</span>
                </li>
              </ul>
            </div>
            <div className="section-bg section-bg-2"></div>
          </div>
        </section>

        {/* How It Works */}
        <section className="about-section" id="how-it-works">
          <div className="section-inner">
            <div className="section-icon">
              <RefreshCw size={32} strokeWidth={1.5} />
            </div>
            <h2>How It Works</h2>
            <div className="section-content">
              <ol className="steps-list">
                <li>
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Input your data</h3>
                    <p>Answer a quick quiz about your lifestyle.</p>
                  </div>
                </li>
                <li>
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Get instant results</h3>
                    <p>See your carbon footprint score.</p>
                  </div>
                </li>
                <li>
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Take action</h3>
                    <p>Learn ways to reduce your impact and earn rewards.</p>
                  </div>
                </li>
              </ol>
            </div>
            <div className="section-bg section-bg-3"></div>
          </div>
        </section>

        {/* Contact */}
        <section className="about-section" id="contact">
          <div className="section-inner">
            <div className="section-icon">
              <Mail size={32} strokeWidth={1.5} />
            </div>
            <h2>Get Involved</h2>
            <div className="section-content">
              <p>
                Join us in making a difference! Contact us at <a href="mailto:hello@carbonease.org" className="highlight-link">hello@carbonease.org</a>.
              </p>
              <button className="cta-button">Join Our Community</button>
            </div>
            <div className="section-bg section-bg-4"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;