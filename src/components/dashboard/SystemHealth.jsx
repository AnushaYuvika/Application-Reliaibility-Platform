import './SystemHealth.css';

const SystemHealth = () => {
  return (
    <section className="system-health">

      <div className="health-header">
        <div>
          <p className="section-label">SYSTEM HEALTH</p>
          <h2>Service Performance</h2>
        </div>

        <span className="health-period">
          Last 24 hours
        </span>
      </div>

      <div className="health-content">

        <div className="health-score">
          <div className="health-circle">
            <span>98.7%</span>
          </div>

          <div>
            <h3>Healthy</h3>
            <p>
              Overall system reliability
            </p>
          </div>
        </div>


        <div className="service-status">

          <div className="service-row">
            <div>
              <span className="status-dot"></span>
              API Gateway
            </div>

            <span>99.9%</span>
          </div>

          <div className="service-row">
            <div>
              <span className="status-dot"></span>
              Authentication
            </div>

            <span>99.8%</span>
          </div>

          <div className="service-row">
            <div>
              <span className="status-dot"></span>
              Database
            </div>

            <span>99.7%</span>
          </div>

          <div className="service-row">
            <div>
              <span className="status-dot"></span>
              Background Jobs
            </div>

            <span>98.9%</span>
          </div>

        </div>

      </div>

    </section>
  );
};

export default SystemHealth;