import './Recommendation.css';

const Recommendation = () => {
  return (
    <section className="recommendation-section">
      <div className="recommendation-header">
        <div>
          <p className="section-label">RECOMMENDATION</p>
          <h2>Recommended Action</h2>
        </div>

        <span className="recommendation-badge">
          High Confidence
        </span>
      </div>

      <div className="recommendation-content">
        <h3>Optimize database connection handling</h3>

        <p>
          Review database connection pooling and increase the
          connection pool capacity to reduce latency during high
          request volumes.
        </p>
      </div>

      <div className="recommendation-reason">
        <span>Why this action?</span>

        <p>
          Database latency was identified as the strongest signal
          correlated with the API response-time increase.
        </p>
      </div>
    </section>
  );
};

export default Recommendation;