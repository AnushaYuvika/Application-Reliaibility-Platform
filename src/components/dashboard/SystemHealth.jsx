import './SystemHealth.css';

const SystemHealth = ({ incidents }) => {

  const activeIncidents = incidents.filter(
    (incident) => incident.status === 'active'
  );

  const criticalIncidents = activeIncidents.filter(
    (incident) => incident.severity === 'critical'
  );

  const isHealthy =
    activeIncidents.length === 0;

  return (
    <section className="system-health">

      <div className="health-header">

        <div>

          <p className="section-label">
            SYSTEM HEALTH
          </p>

          <h2>
            Service Performance
          </h2>

        </div>

        <span className="health-period">
          Current status
        </span>

      </div>


      <div className="health-content">

        <div className="health-score">

          <div className="health-circle">

            <span>
              {isHealthy ? 'OK' : '—'}
            </span>

          </div>

          <div>

            <h3>
              {isHealthy
                ? 'Healthy'
                : 'Attention Required'}
            </h3>

            <p>
              {isHealthy
                ? 'No active incidents detected'
                : `${activeIncidents.length} active incident${
                    activeIncidents.length > 1
                      ? 's'
                      : ''
                  } detected`}
            </p>

          </div>

        </div>


        <div className="service-status">

          <div className="service-row">

            <div>

              <span className="status-dot"></span>

              Active Incidents

            </div>

            <span>
              {activeIncidents.length}
            </span>

          </div>


          <div className="service-row">

            <div>

              <span className="status-dot"></span>

              Critical Incidents

            </div>

            <span>
              {criticalIncidents.length}
            </span>

          </div>


          <div className="service-row">

            <div>

              <span className="status-dot"></span>

              Resolved Incidents

            </div>

            <span>
              {
                incidents.filter(
                  (incident) =>
                    incident.status === 'resolved'
                ).length
              }
            </span>

          </div>


          <div className="service-row">

            <div>

              <span className="status-dot"></span>

              Monitoring

            </div>

            <span>
              Connected
            </span>

          </div>

        </div>

      </div>

    </section>
  );
};

export default SystemHealth;