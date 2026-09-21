import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import DeploymentActivity from '../../components/monitoring/DeploymentActivity';
import LogViewer from '../../components/monitoring/LogViewer';
import MetricsOverview from '../../components/monitoring/MetricsOverview';
import './Monitoring.css';
import { useEffect, useState } from 'react';

const Monitoring = () => {

  const navigate = useNavigate();

  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState(
    sessionStorage.getItem('monitoringTab') || 'logs'
  );

  useEffect(() => {
    const storedProjects =
      JSON.parse(sessionStorage.getItem('projects')) || [];

    setProjects(storedProjects);

    const selectedProjectId =
      sessionStorage.getItem('selectedProjectId');

    const project = storedProjects.find(
      (item) => item.id === Number(selectedProjectId)
    );

    if (project) {
      setSelectedProject(project);
    } else {
      setSelectedProject(null);
    }
  }, []);

  const handleProjectChange = (event) => {
    const projectId = Number(event.target.value);

    const project = projects.find(
      (item) => item.id === projectId
    );

    if (!project) {
      return;
    }

    setSelectedProject(project);

    sessionStorage.setItem(
      'selectedProjectId',
      project.id
    );
  };


  return (
    <div className="monitoring-layout">

      <Sidebar />

      <main className="monitoring-main">

        <header className="monitoring-topbar">

          <div>
            <p className="monitoring-eyebrow">
              MONITORING
            </p>

            <h1>Monitoring</h1>

            {selectedProject && (
              <p className="monitoring-project-name">
                Monitoring: {selectedProject.name}
              </p>
            )}
          </div>

          {projects.length > 0 && (
            <div className="monitoring-project-selector">
              <label htmlFor="monitoring-project">
                Project
              </label>

              <select
                id="monitoring-project"
                value={selectedProject?.id || ''}
                onChange={handleProjectChange}
              >
                {projects.map((project) => (
                  <option
                    key={project.id}
                    value={project.id}
                  >
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          )}

        </header>

        <section className="monitoring-content">

          <div className="monitoring-intro">
            <h2>Application Monitoring</h2>

            <p>
              Monitor logs, system metrics, and deployments
              across your applications.
            </p>
          </div>

          {selectedProject && (
            <section className="monitoring-data-status">
              <span>DATA SOURCE</span>

              <strong>Not connected</strong>
            </section>
          )}

          {!selectedProject && (
            <section className="monitoring-no-project">
              <div className="monitoring-no-project-icon">
                ◉
              </div>

              <h2>No project selected</h2>

              <p>
                Select a project to view its monitoring data.
              </p>

              <button
                onClick={() => navigate('/projects')}
              >
                Go to Projects
              </button>
            </section>
          )}

          {selectedProject && (
            <>
              <div className="monitoring-tabs">
                <button
                  className={activeTab === 'logs' ? 'active' : ''}
                  onClick={() => {
                    setActiveTab('logs');
                    sessionStorage.setItem('monitoringTab', 'logs');
                  }}
                >
                  Logs
                </button>

                <button
                  className={activeTab === 'metrics' ? 'active' : ''}
                  onClick={() => {
                    setActiveTab('metrics');
                    sessionStorage.setItem('monitoringTab', 'metrics');
                  }}
                >
                  Metrics
                </button>

                <button
                  className={activeTab === 'deployments' ? 'active' : ''}
                  onClick={() => {
                    setActiveTab('deployments');
                    sessionStorage.setItem(
                      'monitoringTab',
                      'deployments'
                    );
                  }}
                >
                  Deployments
                </button>
              </div>

              {activeTab === 'logs' && <LogViewer />}

              {activeTab === 'metrics' && <MetricsOverview />}

              {activeTab === 'deployments' && (
                <DeploymentActivity />
              )}
            </>
          )}

        </section>

      </main>

    </div>
  );
};

export default Monitoring;