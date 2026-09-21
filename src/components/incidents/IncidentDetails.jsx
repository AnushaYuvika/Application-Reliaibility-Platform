import Sidebar from '../../components/dashboard/Sidebar';
import './IncidentDetails.css';

const IncidentDetails = () => {
  return (
    <div className="incident-details-layout">
      <Sidebar />

      <main className="incident-details-main">
        <header className="incident-details-topbar">
          <div>
            <p className="incident-details-eyebrow">INCIDENT DETAILS</p>
            <h1>API response time increased</h1>
          </div>

          <span className="incident-detail-severity">
            Critical
          </span>
        </header>

        <section className="incident-details-content">

          <div className="incident-summary">
            <div>
              <p>Affected Service</p>
              <h3>Payment Service</h3>
            </div>

            <div>
              <p>Status</p>
              <h3 className="investigating-text">Investigating</h3>
            </div>

            <div>
              <p>Started</p>
              <h3>12 minutes ago</h3>
            </div>

            <div>
              <p>Incident ID</p>
              <h3>INC-1024</h3>
            </div>
          </div>

          <div className="incident-detail-card">
            <div className="incident-detail-header">
              <div>
                <p className="section-label">INCIDENT OVERVIEW</p>
                <h2>What happened?</h2>
              </div>
            </div>

            <p className="incident-description">
              The Payment Service is experiencing increased API
              response times. Requests are taking longer than the
              configured performance threshold.
            </p>
          </div>

          <div className="incident-detail-card">
            <div className="incident-detail-header">
              <div>
                <p className="section-label">INCIDENT TIMELINE</p>
                <h2>Recent Activity</h2>
              </div>
            </div>

            <div className="incident-timeline">

              <div className="timeline-item">
                <span className="timeline-dot"></span>

                <div>
                  <h3>Incident detected</h3>
                  <p>
                    API response time crossed the configured threshold.
                  </p>
                  <small>12 minutes ago</small>
                </div>
              </div>

              <div className="timeline-item">
                <span className="timeline-dot"></span>

                <div>
                  <h3>Monitoring alert triggered</h3>
                  <p>
                    Monitoring system detected abnormal API latency.
                  </p>
                  <small>11 minutes ago</small>
                </div>
              </div>

              <div className="timeline-item">
                <span className="timeline-dot"></span>

                <div>
                  <h3>Investigation started</h3>
                  <p>
                    Incident is ready for root cause investigation.
                  </p>
                  <small>8 minutes ago</small>
                </div>
              </div>

            </div>
          </div>

        </section>
      </main>
    </div>
  );
};

export default IncidentDetails;