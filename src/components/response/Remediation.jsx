import './Remediation.css';

const Remediation = () => {
  return (
    <section className="remediation-section">
      <div className="remediation-header">
        <div>
          <p className="section-label">REMEDIATION</p>
          <h2>Proposed Changes</h2>
        </div>
      </div>

      <div className="remediation-list">

        <div className="remediation-item">
          <span className="remediation-number">01</span>

          <div>
            <h3>Review connection pool configuration</h3>
            <p>
              Inspect the current database connection limits.
            </p>
          </div>
        </div>

        <div className="remediation-item">
          <span className="remediation-number">02</span>

          <div>
            <h3>Increase pool capacity</h3>
            <p>
              Adjust the pool configuration based on traffic.
            </p>
          </div>
        </div>

        <div className="remediation-item">
          <span className="remediation-number">03</span>

          <div>
            <h3>Run verification tests</h3>
            <p>
              Validate that API latency improves after changes.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Remediation;