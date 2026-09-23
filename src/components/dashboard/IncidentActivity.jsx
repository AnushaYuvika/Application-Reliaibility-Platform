import './IncidentActivity.css';
import { useNavigate } from 'react-router-dom';

const IncidentActivity = ({ incidents }) => {

  const navigate = useNavigate();

  const recentIncidents = [...incidents]
    .sort(
      (a, b) =>
        new Date(
          b.startedAt || b.createdAt
        ) -
        new Date(
          a.startedAt || a.createdAt
        )
    )
    .slice(0, 5);

  const getSeverityClass = (severity) => {

    if (severity === 'critical') {
      return 'critical';
    }

    if (severity === 'high') {
      return 'warning';
    }

    if (severity === 'medium') {
      return 'warning';
    }

    return 'resolved';
  };

  const getSeverityLabel = (severity) => {

    if (severity === 'critical') {
      return 'Critical';
    }

    if (severity === 'high') {
      return 'High';
    }

    if (severity === 'medium') {
      return 'Medium';
    }

    return 'Low';
  };

  return (
    <section className="incident-activity">

      <div className="incident-header">

        <div>

          <p className="section-label">
            INCIDENT ACTIVITY
          </p>

          <h2>Recent Incidents</h2>

        </div>

        <button
          className="view-all-btn"
          onClick={() => navigate('/incidents')}
        >
          View all
        </button>

      </div>


      <div className="incident-list">

        {recentIncidents.length === 0 ? (

          <div className="incident-row">

            <div className="incident-info">

              <span className="incident-status resolved">
                —
              </span>

              <div>

                <h3>
                  No incidents recorded
                </h3>

                <p>
                  Your projects currently have no incidents.
                </p>

              </div>

            </div>

            <span className="incident-state resolved-text">
              Clear
            </span>

          </div>

        ) : (

          recentIncidents.map((incident) => (

            <div
              className="incident-row"
              key={incident._id}
              onClick={() =>
                navigate(
                  `/incidents/${incident._id}`
                )
              }
              style={{ cursor: 'pointer' }}
            >

              <div className="incident-info">

                <span
                  className={`incident-status ${getSeverityClass(
                    incident.severity
                  )}`}
                >
                  {getSeverityLabel(
                    incident.severity
                  )}
                </span>

                <div>

                  <h3>
                    {incident.title}
                  </h3>

                  <p>
                    {incident.project?.name ||
                      'Project'}{' '}
                    ·{' '}
                    {new Date(
                      incident.startedAt ||
                      incident.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

              </div>

              <span
                className={`incident-state ${
                  incident.status === 'resolved'
                    ? 'resolved-text'
                    : ''
                }`}
              >
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

export default IncidentActivity;