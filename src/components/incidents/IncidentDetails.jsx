import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Sidebar from '../../components/dashboard/Sidebar';
import './IncidentDetails.css';

import API_BASE_URL from '../../api/api';

const IncidentDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [incident, setIncident] = useState(null);
  const [project, setProject] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {

    const fetchIncident = async () => {

      try {

        const token = localStorage.getItem('token');

        // Fetch incident
        const incidentResponse = await fetch(
          `${API_BASE_URL}/incidents/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const incidentData =
          await incidentResponse.json();

        if (!incidentResponse.ok) {
          setError(
            incidentData.message ||
            'Failed to fetch incident.'
          );
          return;
        }

        setIncident(incidentData.incident);

        // Fetch project
        const projectId =
          incidentData.incident.project?._id ||
          incidentData.incident.project;

        if (projectId) {

          const projectResponse = await fetch(
            `${API_BASE_URL}/projects/${projectId}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const projectData =
            await projectResponse.json();

          if (projectResponse.ok) {
            setProject(projectData.project);
          }
        }

      } catch (error) {

        setError(
          'Unable to connect to the server.'
        );

      } finally {

        setLoading(false);

      }
    };

    fetchIncident();

  }, [id]);

  const handleInvestigation = () => {

    sessionStorage.setItem(
      'selectedIncidentId',
      incident._id
    );

    navigate('/investigation');

  };

  if (loading) {

    return (
      <div className="incident-details-layout">

        <Sidebar />

        <main className="incident-details-main">

          <section className="incident-not-found">

            <h2>Loading Incident...</h2>

            <p>
              Fetching incident details from the
              reliability platform.
            </p>

          </section>

        </main>

      </div>
    );
  }

  if (error || !incident) {

    return (
      <div className="incident-details-layout">

        <Sidebar />

        <main className="incident-details-main">

          <section className="incident-not-found">

            <h2>
              {error
                ? 'Unable to Load Incident'
                : 'Incident not found'}
            </h2>

            <p>
              {error ||
                'The requested incident could not be found.'}
            </p>

            <button
              onClick={() => navigate('/incidents')}
            >
              Back to Incidents
            </button>

          </section>

        </main>

      </div>
    );
  }

  return (
    <div className="incident-details-layout">

      <Sidebar />

      <main className="incident-details-main">

        <header className="incident-details-topbar">

          <div>

            <p className="incident-details-eyebrow">
              INCIDENT DETAILS
            </p>

            <h1>{incident.title}</h1>

            {project && (
              <p className="incident-details-project">
                Project: {project.name}
              </p>
            )}

          </div>

          <button
            className="back-incidents-btn"
            onClick={() => navigate('/incidents')}
          >
            Back to Incidents
          </button>

        </header>

        <section className="incident-details-content">

          <div className="incident-summary-card">

            <div className="incident-summary-header">

              <div>

                <p className="section-label">
                  INCIDENT SUMMARY
                </p>

                <h2>{incident.title}</h2>

              </div>

              <span
                className={`severity ${incident.severity}`}
              >
                {incident.severity}
              </span>

            </div>

            <div className="incident-summary-grid">

              <div className="incident-info-item">

                <span>Status</span>

                <strong>
                  {incident.status}
                </strong>

              </div>

              <div className="incident-info-item">

                <span>Severity</span>

                <strong>
                  {incident.severity}
                </strong>

              </div>

              <div className="incident-info-item">

                <span>Project</span>

                <strong>
                  {project?.name || 'Unknown'}
                </strong>

              </div>

              <div className="incident-info-item">

                <span>Started</span>

                <strong>
                  {incident.startedAt
                    ? new Date(
                        incident.startedAt
                      ).toLocaleString()
                    : 'Unknown'}
                </strong>

              </div>

            </div>

          </div>

          <div className="incident-investigation-card">

            <div>

              <p className="section-label">
                INVESTIGATION
              </p>

              <h2>
                Investigate Incident
              </h2>

              <p>
                Review evidence, identify the probable root
                cause, and understand the impact of this
                incident.
              </p>

            </div>

            <button
              onClick={handleInvestigation}
            >
              Open Investigation
            </button>

          </div>

        </section>

      </main>

    </div>
  );
};

export default IncidentDetails;