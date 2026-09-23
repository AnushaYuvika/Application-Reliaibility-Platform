import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../../components/dashboard/Sidebar';
import ActiveIncidents from '../../components/incidents/ActiveIncidents';
import ResolvedIncidents from '../../components/incidents/ResolvedIncidents';
import './Incidents.css';

import API_BASE_URL from '../../api/api';

const Incidents = () => {
  const navigate = useNavigate();

  const [selectedProject, setSelectedProject] = useState(null);
  const [incidents, setIncidents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjectAndIncidents = async () => {
      try {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');

        const selectedProjectId =
          sessionStorage.getItem('selectedProjectId');

        if (!selectedProjectId) {
          setSelectedProject(null);
          setIncidents([]);
          setLoading(false);
          return;
        }

        const projectResponse = await fetch(
          `${API_BASE_URL}/projects/${selectedProjectId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const projectData = await projectResponse.json();

        if (!projectResponse.ok) {
          setError(
            projectData.message || 'Failed to fetch project.'
          );
          return;
        }

        setSelectedProject(projectData.project);

        const incidentsResponse = await fetch(
          `${API_BASE_URL}/incidents`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const incidentsData = await incidentsResponse.json();

        if (!incidentsResponse.ok) {
          setError(
            incidentsData.message || 'Failed to fetch incidents.'
          );
          return;
        }

        const projectIncidents =
          incidentsData.incidents.filter((incident) => {

            const incidentProjectId =
              incident.project?._id ||
              incident.project;

            return String(incidentProjectId) ===
              String(selectedProjectId);
          });

        setIncidents(projectIncidents);

      } catch (error) {
        setError(
          'Unable to connect to the server.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndIncidents();
  }, []);

  if (loading) {
    return (
      <div className="incidents-layout">

        <Sidebar />

        <main className="incidents-main">

          <section className="incidents-content">

            <div className="incidents-no-project">

              <div className="incidents-no-project-icon">
                ◉
              </div>

              <h2>
                Loading incidents...
              </h2>

              <p>
                Fetching project incidents from the reliability platform.
              </p>

            </div>

          </section>

        </main>

      </div>
    );
  }

  return (
    <div className="incidents-layout">

      <Sidebar />

      <main className="incidents-main">

        <header className="incidents-topbar">

          <div>

            <p className="incidents-eyebrow">
              INCIDENTS
            </p>

            <h1>
              Incidents
            </h1>

            {selectedProject && (
              <p className="incidents-project-name">
                Project: {selectedProject.name}
              </p>
            )}

          </div>

        </header>

        <section className="incidents-content">

          <div className="incidents-intro">

            <h2>
              Incident Management
            </h2>

            <p>
              Track, investigate, and manage production
              incidents across your applications.
            </p>

          </div>

          {error && (
            <section className="incidents-no-project">

              <div className="incidents-no-project-icon">
                !
              </div>

              <h2>
                Unable to load incidents
              </h2>

              <p>
                {error}
              </p>

            </section>
          )}

          {!error && !selectedProject && (
            <section className="incidents-no-project">

              <div className="incidents-no-project-icon">
                ◉
              </div>

              <h2>
                No project selected
              </h2>

              <p>
                Select a project to view its incidents.
              </p>

              <button
                onClick={() => navigate('/projects')}
              >
                Go to Projects
              </button>

            </section>
          )}

          {!error && selectedProject && (
            <>
              <ActiveIncidents
                incidents={incidents}
              />

              <ResolvedIncidents
                incidents={incidents}
              />
            </>
          )}

        </section>

      </main>

    </div>
  );
};

export default Incidents;