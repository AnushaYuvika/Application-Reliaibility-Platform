import { useNavigate } from 'react-router-dom';
import './ActiveIncidents.css';

const ActiveIncidents = () => {
  const navigate = useNavigate();

  return (
    <section className="active-incidents">

      <div className="active-incidents-header">
        <div>
          <p className="section-label">ACTIVE INCIDENTS</p>
          <h2>Current Incidents</h2>
        </div>

        <span className="incident-total">
          3 Active
        </span>
      </div>


      <div className="active-incidents-list">

        <div className="active-incident-row"
          onClick={() => navigate('/incidents/1')}
        >

          <div className="active-incident-main">

            <span className="severity critical">
              Critical
            </span>

            <div>
              <h3>API response time increased</h3>
              <p>
                Payment Service · Started 12 minutes ago
              </p>
            </div>

          </div>

          <span className="incident-status-text">
            Investigating
          </span>

        </div>


        <div className="active-incident-row"
          onClick={() => navigate('/incidents/2')}
        >

          <div className="active-incident-main">

            <span className="severity warning">
              Warning
            </span>

            <div>
              <h3>Database connection latency</h3>
              <p>
                Database Service · Started 34 minutes ago
              </p>
            </div>

          </div>

          <span className="incident-status-text">
            Investigating
          </span>

        </div>


        <div className="active-incident-row"
          onClick={() => navigate('/incidents/3')}
        >

          <div className="active-incident-main">

            <span className="severity warning">
              Warning
            </span>

            <div>
              <h3>High memory usage detected</h3>
              <p>
                Analytics Platform · Started 1 hour ago
              </p>
            </div>

          </div>

          <span className="incident-status-text">
            Monitoring
          </span>

        </div>

      </div>

    </section>
  );
};

export default ActiveIncidents;