import './ImpactAnalysis.css';

const ImpactAnalysis = () => {
  return (
    <section className="impact-analysis">
      <div className="impact-analysis-header">
        <div>
          <p className="section-label">IMPACT ANALYSIS</p>
          <h2>Incident Impact</h2>
        </div>

        <span className="impact-status">
          Under Analysis
        </span>
      </div>

      <div className="impact-summary">

        <div className="impact-item">
          <span className="impact-label">Affected Service</span>
          <strong>Payment Service</strong>
          <p>Primary service affected by the incident</p>
        </div>

        <div className="impact-item">
          <span className="impact-label">Request Impact</span>
          <strong>Elevated Latency</strong>
          <p>API requests are taking longer to complete</p>
        </div>

        <div className="impact-item">
          <span className="impact-label">Customer Impact</span>
          <strong>Potential</strong>
          <p>Some requests may experience delays</p>
        </div>

        <div className="impact-item">
          <span className="impact-label">Dependency Impact</span>
          <strong>Database</strong>
          <p>Database performance is contributing to latency</p>
        </div>

      </div>

      <div className="impact-note">
        <span>Impact Assessment</span>
        <p>
          The incident currently appears limited to increased
          response times in the Payment Service. Further analysis
          is required to determine the full customer impact.
        </p>
      </div>
    </section>
  );
};

export default ImpactAnalysis;