import './ResolvedIncidents.css';

const ResolvedIncidents = () => {
  return (
    <section className="resolved-incidents">
      <div className="resolved-incidents-header">
        <div>
          <p className="section-label">INCIDENT HISTORY</p>
          <h2>Resolved Incidents</h2>
        </div>

        <span className="resolved-total">12 Resolved</span>
      </div>

      <div className="resolved-incidents-list">

        <div className="resolved-incident-row">
          <div className="resolved-incident-main">
            <span className="severity warning">Warning</span>

            <div>
              <h3>Authentication service timeout</h3>
              <p>Auth Service · Resolved 2 hours ago</p>
            </div>
          </div>

          <span className="resolved-status">
            Resolved
          </span>
        </div>

        <div className="resolved-incident-row">
          <div className="resolved-incident-main">
            <span className="severity critical">Critical</span>

            <div>
              <h3>Payment gateway failure</h3>
              <p>Payment Service · Resolved yesterday</p>
            </div>
          </div>

          <span className="resolved-status">
            Resolved
          </span>
        </div>

        <div className="resolved-incident-row">
          <div className="resolved-incident-main">
            <span className="severity warning">Warning</span>

            <div>
              <h3>High memory usage detected</h3>
              <p>Analytics Platform · Resolved 2 days ago</p>
            </div>
          </div>

          <span className="resolved-status">
            Resolved
          </span>
        </div>

      </div>
    </section>
  );
};

export default ResolvedIncidents;