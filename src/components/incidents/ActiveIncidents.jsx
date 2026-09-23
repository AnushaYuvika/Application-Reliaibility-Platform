import { useNavigate } from 'react-router-dom';
import './ActiveIncidents.css';

const ActiveIncidents = ({ incidents }) => {
  const navigate = useNavigate();

  const activeIncidents = incidents.filter(
    (incident) => incident.status === 'active'
  );

  return (
    <section className="active-incidents">

      <div className="active-incidents-header">

        <div>
          <p className="section-label">
            ACTIVE INCIDENTS
          </p>

          <h2>Current Incidents</h2>
        </div>

        <span className="incident-total">
          {activeIncidents.length} Active
        </span>

      </div>

      <div className="active-incidents-list">

        {activeIncidents.length === 0 ? (
          <div className="no-incidents">
            <p>
              No active incidents for this project.
            </p>
          </div>
        ) : (
          activeIncidents.map((incident) => (

            <div
              className="active-incident-row"
              key={incident._id}
              onClick={() =>
                navigate(`/incidents/${incident._id}`)
              }
            >

              <div className="active-incident-main">

                <span
                  className={`severity ${
                    incident.severity === 'high'
                      ? 'warning'
                      : incident.severity
                  }`}
                >
                  {incident.severity === 'critical'
                    ? 'Critical'
                    : incident.severity === 'high'
                      ? 'High'
                      : incident.severity}
                </span>

                <div>

                  <h3>
                    {incident.title}
                  </h3>

                  <p>
                    Started{' '}
                    {new Date(
                      incident.startedAt || incident.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

              </div>

              <span className="incident-status-text">
                {incident.status === 'active'
                  ? 'Investigating'
                  : incident.status}
              </span>

            </div>

          ))
        )}

      </div>

    </section>
  );
};

export default ActiveIncidents;