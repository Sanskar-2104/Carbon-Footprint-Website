import React, { useState, useEffect } from 'react';
import { Leaf, Info, ArrowDown, ArrowUp, ChevronDown, Moon, Sun } from 'lucide-react';
import './CarbonInfo.css';

const CarbonInfo = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [visible, setVisible] = useState({});
  const [scrollY, setScrollY] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  useEffect(() => {
    // Apply dark mode class to body
    document.body.classList.toggle('dark-theme', darkMode);
  }, [darkMode]);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`carbon-info-container ${darkMode ? 'dark-theme' : ''}`}>
      {/* <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button> */}

      <div className="carbon-info-hero">
        <div className="carbon-hero-content">
          <h1>
          Understanding<span className="title-highlight">Carbon Footprint</span> 
          </h1>
          <p>Learn about carbon emissions, their impact, and how we can reduce them.</p>
          <div className="scroll-indicator" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
            <span>Explore</span>
            <ArrowDown size={24} className="scroll-arrow" />
          </div>
        </div>
      </div>

      {/* <div className="bento-grid-container">
        <div className="bento-grid">
          <div className="bento-card emission">
            <div className="card-icon">
              <Info size={24} />
            </div>
            <h3>Carbon Emission</h3>
            <p>
              Carbon emissions refer to the release of carbon dioxide into the atmosphere, 
              primarily from burning fossil fuels. These emissions drive climate change.
            </p>
          </div>
          
          <div className="bento-card footprint">
            <div className="card-icon">
              <Leaf size={24} />
            </div>
            <h3>Carbon Footprint</h3>
            <p>
              A carbon footprint is the total greenhouse gases emitted by an individual or 
              organization, expressed in equivalent tons of CO₂.
            </p>
          </div>
          
          <div className="bento-card renewable">
            <div className="card-icon">
              <Sun size={24} />
            </div>
            <h3>Renewable Energy</h3>
            <p>
              Switch to solar, wind, or other renewable energy sources to 
              dramatically reduce your carbon emissions.
            </p>
          </div>
          
          <div className="bento-card lifestyle">
            <div className="card-icon">
              <div className="icon-custom transport"></div>
            </div>
            <h3>Eco-Transportation</h3>
            <p>
              Choose walking, cycling, public transport, or electric vehicles to 
              minimize transportation emissions.
            </p>
          </div>
          
          <div className="bento-card diet">
            <div className="card-icon">
              <div className="icon-custom diet"></div>
            </div>
            <h3>Sustainable Diet</h3>
            <p>
              Adopting a plant-based diet can significantly reduce the carbon 
              footprint associated with food production.
            </p>
          </div>
          
          <div className="bento-card recycle">
            <div className="card-icon">
              <div className="icon-custom recycle"></div>
            </div>
            <h3>Reduce & Recycle</h3>
            <p>
              Minimize waste, reuse items, and properly recycle materials to reduce 
              landfill emissions and resource consumption.
            </p>
          </div>
        </div>
      </div> */}

      <div className="carbon-info-content">
        <section id="emission" className={`animate-on-scroll carbon-section ${visible.emission ? 'visible' : ''}`}>
          <div className="section-icon">
            <div className="icon-circle">
              <Info size={32} />
            </div>
          </div>
          <div className="section-content">
            <h2>What is Carbon Emission?</h2>
            <p>
              Carbon emissions refer to the release of carbon dioxide (CO₂) into the atmosphere,
              primarily from burning fossil fuels. These emissions are a major driver of climate change,
              leading to global warming and severe weather events.
            </p>
            <div className="info-graphic">
              <div className="emission-source">
                <div className="source-icon factory"></div>
                <span>Industry</span>
              </div>
              <div className="emission-source">
                <div className="source-icon car"></div>
                <span>Transport</span>
              </div>
              <div className="emission-source">
                <div className="source-icon energy"></div>
                <span>Energy</span>
              </div>
            </div>
          </div>
        </section>

        <section id="footprint" className={`animate-on-scroll carbon-section ${visible.footprint ? 'visible' : ''}`}>
          <div className="section-icon">
            <div className="icon-circle">
              <Leaf size={32} />
            </div>
          </div>
          <div className="section-content">
            <h2>What is Carbon Footprint?</h2>
            <p>
              A carbon footprint is the total amount of greenhouse gases (GHG) emitted directly or
              indirectly by an individual, organization, event, or product, usually expressed in
              equivalent tons of CO₂. It includes all activities from energy consumption to food choices.
            </p>
            <div className="footprint-meter">
              <div className="meter-scale">
                <div className="scale-marker low">Low</div>
                <div className="scale-marker medium">Medium</div>
                <div className="scale-marker high">High</div>
              </div>
              <div className="meter-indicator" style={{ left: '20%' }}>
                <div className="indicator-dot"></div>
                <span>Goal</span>
              </div>
              <div className="meter-indicator" style={{ left: '65%' }}>
                <div className="indicator-dot"></div>
                <span>Average</span>
              </div>
            </div>
          </div>
        </section>

        <section id="reduce" className={`animate-on-scroll carbon-section ${visible.reduce ? 'visible' : ''}`}>
          <div className="section-icon">
            <div className="icon-circle">
              <ArrowDown size={32} />
            </div>
          </div>
          <div className="section-content">
                <h2>How to Reduce Your Carbon Footprint</h2>
          </div>
          
        </section>

        <div className="bento-grid-container">
        <div className="bento-grid">
          <div className="bento-card emission">
            <div className="card-icon">
              <Info size={24} />
            </div>
            <h3>Carbon Emission</h3>
            <p>
              Carbon emissions refer to the release of carbon dioxide into the atmosphere, 
              primarily from burning fossil fuels. These emissions drive climate change.
            </p>
          </div>
          
          <div className="bento-card footprint">
            <div className="card-icon">
              <Leaf size={24} />
            </div>
            <h3>Carbon Footprint</h3>
            <p>
              A carbon footprint is the total greenhouse gases emitted by an individual or 
              organization, expressed in equivalent tons of CO₂.
            </p>
          </div>
          
          <div className="bento-card renewable">
            <div className="card-icon">
              <Sun size={24} />
            </div>
            <h3>Renewable Energy</h3>
            <p>
              Switch to solar, wind, or other renewable energy sources to 
              dramatically reduce your carbon emissions.
            </p>
          </div>
          
          <div className="bento-card lifestyle">
            <div className="card-icon">
              <div className="icon-custom transport"></div>
            </div>
            <h3>Eco-Transportation</h3>
            <p>
              Choose walking, cycling, public transport, or electric vehicles to 
              minimize transportation emissions.
            </p>
          </div>
          
          <div className="bento-card diet">
            <div className="card-icon">
              <div className="icon-custom diet"></div>
            </div>
            <h3>Sustainable Diet</h3>
            <p>
              Adopting a plant-based diet can significantly reduce the carbon 
              footprint associated with food production.
            </p>
          </div>
          
          <div className="bento-card recycle">
            <div className="card-icon">
              <div className="icon-custom recycle"></div>
            </div>
            <h3>Reduce & Recycle</h3>
            <p>
              Minimize waste, reuse items, and properly recycle materials to reduce 
              landfill emissions and resource consumption.
            </p>
          </div>
        </div>
      </div>

        <section id="faq" className={`animate-on-scroll carbon-section ${visible.faq ? 'visible' : ''}`}>
          <div className="section-content full-width">
            <h2>Common Questions About Carbon Footprint</h2>
            <div className="faq-list">
              <div className={`faq-item ${activeFAQ === 1 ? 'active' : ''}`} onClick={() => toggleFAQ(1)}>
                <div className="faq-question">
                  <h3>What causes a large carbon footprint?</h3>
                  <ChevronDown size={24} className="faq-icon" />
                </div>
                <div className="faq-answer">
                  <p>Large carbon footprints are primarily caused by:</p>
                  <ul>
                    <li>High energy consumption from fossil fuels</li>
                    <li>Frequent air travel and use of gas-powered vehicles</li>
                    <li>Consumption of meat and dairy products</li>
                    <li>Excessive waste generation and poor recycling habits</li>
                    <li>Use of products with high embodied carbon</li>
                  </ul>
                </div>
              </div>
              <div className={`faq-item ${activeFAQ === 2 ? 'active' : ''}`} onClick={() => toggleFAQ(2)}>
                <div className="faq-question">
                  <h3>How can I calculate my carbon footprint?</h3>
                  <ChevronDown size={24} className="faq-icon" />
                </div>
                <div className="faq-answer">
                  <p>You can calculate your carbon footprint by:</p>
                  <ul>
                    <li>Using online carbon calculators provided by environmental organizations</li>
                    <li>Tracking your monthly energy bills and transportation habits</li>
                    <li>Logging your food consumption patterns and waste generation</li>
                    <li>Considering your shopping habits and product choices</li>
                    <li>Using specialized apps designed to track carbon emissions</li>
                  </ul>
                </div>
              </div>
              <div className={`faq-item ${activeFAQ === 3 ? 'active' : ''}`} onClick={() => toggleFAQ(3)}>
                <div className="faq-question">
                  <h3>Can reducing my carbon footprint really make a difference?</h3>
                  <ChevronDown size={24} className="faq-icon" />
                </div>
                <div className="faq-answer">
                  <p>Yes, individual actions do make a difference:</p>
                  <ul>
                    <li>Collective small actions add up to significant global impact</li>
                    <li>Individual choices influence businesses and policy makers</li>
                    <li>Personal examples inspire others in your community</li>
                    <li>Reducing consumption directly decreases resource extraction</li>
                    <li>Supporting sustainable products drives market innovation</li>
                  </ul>
                </div>
              </div>
              <div className={`faq-item ${activeFAQ === 4 ? 'active' : ''}`} onClick={() => toggleFAQ(4)}>
                <div className="faq-question">
                  <h3>What's the difference between carbon neutral and carbon negative?</h3>
                  <ChevronDown size={24} className="faq-icon" />
                </div>
                <div className="faq-answer">
                  <p><strong>Carbon neutral</strong> means balancing carbon emissions with carbon removal or simply eliminating carbon emissions altogether.</p>
                  <p><strong>Carbon negative</strong> (or climate positive) means removing more carbon from the atmosphere than you emit, creating a net environmental benefit.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="carbon-footer">
        <div className="footer-content">
          <h2>Join the Movement</h2>
          <p>Together, we can make a difference and create a sustainable future for our planet.</p>
          <div className="footer-cta">
            <button className="cta-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Back to Top <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CarbonInfo;
