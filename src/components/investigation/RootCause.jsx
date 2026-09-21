import './RootCause.css';

const RootCause = () => {
  return (
    <section className="root-cause-section">
      <div className="root-cause-header">
        <div>
          <p className="section-label">ROOT CAUSE ANALYSIS</p>
          <h2>Probable Root Cause</h2>
        </div>

        <span className="analysis-status">
          Analysis Complete
        </span>
      </div>

      <div className="root-cause-content">

        <div className="root-cause-main">
          <div className="root-cause-icon">AI</div>

          <div>
            <h3>Database connection latency</h3>

            <p>
              Increased database response time is the most likely
              cause of the API latency observed in the incident.
            </p>
          </div>
        </div>

        <div className="confidence-section">
          <div className="confidence-header">
            <span>Analysis Confidence</span>
            <strong>87%</strong>
          </div>

          <div className="confidence-bar">
            <span></span>
          </div>
        </div>

        <div className="root-cause-evidence">
          <p className="section-label">SUPPORTING EVIDENCE</p>

          <div className="cause-evidence-item">
            <span>Database latency increased before API failures</span>
            <strong>Strong</strong>
          </div>

          <div className="cause-evidence-item">
            <span>API response time correlated with DB latency</span>
            <strong>Strong</strong>
          </div>

          <div className="cause-evidence-item">
            <span>No recent application deployment detected</span>
            <strong>Moderate</strong>
          </div>
        </div>

      </div>
    </section>
  );
};

export default RootCause;