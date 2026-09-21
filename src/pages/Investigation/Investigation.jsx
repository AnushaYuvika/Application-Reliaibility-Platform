import Sidebar from '../../components/dashboard/Sidebar';
import Evidence from '../../components/investigation/Evidence';
import ImpactAnalysis from '../../components/investigation/ImpactAnalysis';
import RootCause from '../../components/investigation/RootCause';
import './Investigation.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Investigation = () => {

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
    <div className="investigation-layout">
      <Sidebar />

      <main className="investigation-main">
        <header className="investigation-topbar">
          <div>
            <p className="investigation-eyebrow">INVESTIGATION</p>
            <h1>Incident Investigation</h1>

            {selectedProject && (
              <p className="investigation-project-name">
                Project: {selectedProject.name}
              </p>
            )}
          </div>

          <span className="investigation-status">
            Investigation in progress
          </span>
        </header>

        <section className="investigation-content">

          <div className="investigation-intro">
            <p className="section-label">CURRENT INCIDENT</p>
            <h2>API response time increased</h2>
            <p>
              Analyzing logs, metrics, and recent changes to identify
              the probable root cause.
            </p>
          </div>
          
          {!selectedProject && (
            <section className="investigation-no-project">
              <div className="investigation-no-project-icon">
                ◉
              </div>

              <h2>No project selected</h2>

              <p>
                Select a project to view its investigation data.
              </p>

              <button onClick={() => navigate('/projects')}>
                Go to Projects
              </button>
            </section>
          )}

          {selectedProject && (
            <>
              <div className="investigation-grid">

                <Evidence />

                <RootCause />

              </div>

              <ImpactAnalysis />
            </>
          )}

        </section>
      </main>
    </div>
  );
};

export default Investigation;