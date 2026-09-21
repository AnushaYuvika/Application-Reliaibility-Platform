import Sidebar from '../../components/dashboard/Sidebar';
import ActiveIncidents from '../../components/incidents/ActiveIncidents';
import ResolvedIncidents from '../../components/incidents/ResolvedIncidents';
import './Incidents.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Incidents = () => {

  const navigate = useNavigate();

  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const selectedProjectId =
      sessionStorage.getItem('selectedProjectId');

    const projects =
      JSON.parse(sessionStorage.getItem('projects')) || [];

    const project = projects.find(
      (item) => item.id === Number(selectedProjectId)
    );

    setSelectedProject(project || null);
  }, []);

  return (
    <div className="incidents-layout">

      <Sidebar />

      <main className="incidents-main">

        <header className="incidents-topbar">

          <div>
            <p className="incidents-eyebrow">
              INCIDENTS
            </p>

            <h1>Incidents</h1>
            {selectedProject && (
              <p className="incidents-project-name">
                Project: {selectedProject.name}
              </p>
            )}
          </div>

        </header>


        <section className="incidents-content">

          <div className="incidents-intro">
            <h2>Incident Management</h2>

            <p>
              Track, investigate, and manage production
              incidents across your applications.
            </p>
          </div>

          {!selectedProject && (
            <section className="incidents-no-project">
              <div className="incidents-no-project-icon">
                ◉
              </div>

              <h2>No project selected</h2>

              <p>
                Select a project to view its incidents.
              </p>

              <button onClick={() => navigate('/projects')}>
                Go to Projects
              </button>
            </section>
          )}

          {selectedProject && (
            <>
              <ActiveIncidents />

              <ResolvedIncidents />
            </>
          )}

        </section>

      </main>

    </div>
  );
};

export default Incidents;