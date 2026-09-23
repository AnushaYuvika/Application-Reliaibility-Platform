import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import DeploymentActivity from '../../components/monitoring/DeploymentActivity';
import LogViewer from '../../components/monitoring/LogViewer';
import MetricsOverview from '../../components/monitoring/MetricsOverview';
import './Monitoring.css';
import { useEffect, useState } from 'react';
import API_BASE_URL from '../../api/api';

const Monitoring = () => {

  const navigate = useNavigate();

  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState(
    sessionStorage.getItem('monitoringTab') || 'logs'
  );

  useEffect(() => {

    const fetchProjects = async () => {

      try {

        const token = localStorage.getItem('token');

        const response = await fetch(
          `${API_BASE_URL}/projects`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(
            data.message || 'Failed to fetch projects.'
          );
          return;
        }

        setProjects(data.projects);

        const selectedProjectId =
          sessionStorage.getItem('selectedProjectId');

        let project = null;

        if (selectedProjectId) {
          project = data.projects.find(
            (item) => item._id === selectedProjectId
          );
        }

        if (!project && data.projects.length > 0) {
          project = data.projects[0];

          sessionStorage.setItem(
            'selectedProjectId',
            project._id
          );
        }

        setSelectedProject(project || null);

      } catch (error) {

        console.error(
          'Unable to connect to the server.'
        );

      }

    };

    fetchProjects();

  }, []);

  const handleProjectChange = (event) => {

    const projectId = event.target.value;

    const project = projects.find(
      (item) => item._id === projectId
    );

    if (!project) {
      return;
    }

    setSelectedProject(project);

    sessionStorage.setItem(
      'selectedProjectId',
      project._id
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
                value={selectedProject?._id || ''}
                onChange={handleProjectChange}
              >

                {projects.map((project) => (
                  <option
                    key={project._id}
                    value={project._id}
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

            <h2>
              Application Monitoring
            </h2>

            <p>
              Monitor logs, system metrics, and deployments
              across your applications.
            </p>

          </div>

          {selectedProject && (
            <section className="monitoring-data-status">

              <span>
                DATA SOURCE
              </span>

              <strong>
                Backend Connected
              </strong>

            </section>
          )}

          {!selectedProject && (
            <section className="monitoring-no-project">

              <div className="monitoring-no-project-icon">
                ◉
              </div>

              <h2>
                No project selected
              </h2>

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
                  className={
                    activeTab === 'logs'
                      ? 'active'
                      : ''
                  }
                  onClick={() => {
                    setActiveTab('logs');

                    sessionStorage.setItem(
                      'monitoringTab',
                      'logs'
                    );
                  }}
                >
                  Logs
                </button>

                <button
                  className={
                    activeTab === 'metrics'
                      ? 'active'
                      : ''
                  }
                  onClick={() => {
                    setActiveTab('metrics');

                    sessionStorage.setItem(
                      'monitoringTab',
                      'metrics'
                    );
                  }}
                >
                  Metrics
                </button>

                <button
                  className={
                    activeTab === 'deployments'
                      ? 'active'
                      : ''
                  }
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

              {activeTab === 'logs' && (
                <LogViewer project={selectedProject} />
              )}

              {activeTab === 'metrics' && (
                <MetricsOverview project={selectedProject} />
              )}

              {activeTab === 'deployments' && (
                <DeploymentActivity project={selectedProject} />
              )}

            </>
          )}

        </section>

      </main>

    </div>
  );
};

export default Monitoring;