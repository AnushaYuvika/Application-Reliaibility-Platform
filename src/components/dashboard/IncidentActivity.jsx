import './IncidentActivity.css';

const IncidentActivity = () => {
  return (
    <section className="incident-activity">

      <div className="incident-header">
        <div>
          <p className="section-label">INCIDENT ACTIVITY</p>
          <h2>Recent Incidents</h2>
        </div>

        <button className="view-all-btn">
          View all
        </button>
      </div>

      <div className="incident-list">

        <div className="incident-row">

          <div className="incident-info">
            <span className="incident-status critical">
              Critical
            </span>

            <div>
              <h3>API response time increased</h3>
              <p>Production API · 12 minutes ago</p>
            </div>
          </div>

          <span className="incident-state">
            Investigating
          </span>

        </div>


        <div className="incident-row">

          <div className="incident-info">
            <span className="incident-status warning">
              Warning
            </span>

            <div>
              <h3>Database connection latency</h3>
              <p>Database Service · 34 minutes ago</p>
            </div>
          </div>

          <span className="incident-state">
            Investigating
          </span>

        </div>


        <div className="incident-row">

          <div className="incident-info">
            <span className="incident-status resolved">
              Resolved
            </span>

            <div>
              <h3>Authentication service timeout</h3>
              <p>Auth Service · 2 hours ago</p>
            </div>
          </div>

          <span className="incident-state resolved-text">
            Resolved
          </span>

        </div>

      </div>

    </section>
  );
};

export default IncidentActivity;