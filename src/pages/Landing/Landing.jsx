import React from 'react'
import './Landing.css';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className='landing-page'>
      <nav className='landing-nav'>
        <div className='brand'>
          <span className='brand-icon'>◉</span>
          <span>Reliability</span>
        </div>

        <div className='nav-links'>
          <a href="#features">Features</a>
          <a href="#platform">Platform</a>
          <a href="#about">About</a>

          <button
            className='login-btn'
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </nav>


      <main className='hero-section'>
        <div className='hero-content'>
          <div className='status-badge'>
            <span>●</span>
            Autonomous Software Reliability
          </div>

          <h1>
            Monitor.
            <br />
            Investigate.
            <br />
            <span>Recover.</span>
          </h1>

          <p>
            Detect production incidents, investigate root causes, and accelerate recovery with an intelligent reliability platform.
          </p>

          <div className='hero-actions'>
            <button
              className='primary-btn'
              onClick={() => navigate('/login')}
            >
              Get Started
              <span>→</span>
            </button>

            <button className='secondary-btn'>
              Explore Platform
            </button>
          </div>

        </div>


        <div className='hero-dashboard'>

          <div className='dashboard-header'>
            <div>
              <span className='dashboard-label'>SYSTEM OVERVIEW</span>
              <h3>Production Health</h3>
            </div>

            <span className='healthy-status'>
             ● Healthy
            </span>
          </div>

          <div className='health-chart'>
            <div className='chart-line'></div>
            <div className='chart-grid'></div>
          </div>

          <div className='service-list'>

            <div className='service'>
              <span>API Gateway</span>
              <span className='service-status'>Operational</span>
            </div>

            <div className='service'>
              <span>Database</span>
              <span className='service-status'>Operational</span>
            </div>

            <div className='service'>
              <span>Background Workers</span>
              <span className='service-status warning'>
                Monitoring
              </span>
            </div>

          </div>

        </div>

      </main>


      <section className='hero-stats'>
        <div>
          <strong>24/7</strong>
          <span>Monitoring</span>
        </div>

        <div>
          <strong>AI</strong>
          <span>Root Cause Analysis</span>
        </div>

        <div>
          <strong>∞</strong>
          <span>Incident History</span>
        </div>
      </section>
      
    </div>
  )
}

export default Landing