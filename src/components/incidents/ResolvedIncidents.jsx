import { useNavigate } from 'react-router-dom';
import './ResolvedIncidents.css';

const ResolvedIncidents = ({ incidents }) => {

  const navigate = useNavigate();

  const resolvedIncidents = incidents.filter(
    (incident) => incident.status === 'resolved'
  );

  return (
    <section className="resolved-incidents">

      <div className="resolved-incidents-header">

        <div>
          <p className="section-label">
            RESOLVED INCIDENTS
          </p>

          <h2>Recently Resolved</h2>
        </div>

        <span className="incident-total">
          {resolvedIncidents.length} Resolved
        </span>

      </div>

      <div className="resolved-incidents-list">

        {resolvedIncidents.length === 0 ? (
          <div className="no-resolved-incidents">
            <p>No resolved incidents for this project.</p>
          </div>
        ) : (
          resolvedIncidents.map((incident) => (

            <div
              className="resolved-incident-row"
              key={incident.id}
              onClick={() =>
                navigate(`/incidents/${incident.id}`)
              }
            >

              <div className="resolved-incident-main">

                <span className="resolved-badge">
                  Resolved
                </span>

                <div>
                  <h3>{incident.title}</h3>

                  <p>
                    Resolved incident ·{' '}
                    {new Date(
                      incident.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

              </div>

              <span className="incident-status-text">
                {incident.status}
              </span>

            </div>

          ))
        )}

      </div>

    </section>
  );
};

export default ResolvedIncidents;