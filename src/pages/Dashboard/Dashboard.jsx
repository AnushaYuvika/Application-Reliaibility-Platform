import IncidentActivity from '../../components/dashboard/IncidentActivity';
import OverviewCard from '../../components/dashboard/OverviewCard';
import Sidebar from '../../components/dashboard/Sidebar';
import SystemHealth from '../../components/dashboard/SystemHealth';
import './Dashboard.css';
import { useEffect, useState } from 'react';
import API_BASE_URL from '../../api/api';

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');

        const [projectsResponse, incidentsResponse] =
          await Promise.all([
            fetch(`${API_BASE_URL}/projects`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }),

            fetch(`${API_BASE_URL}/incidents`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
          ]);

        const projectsData =
          await projectsResponse.json();

        const incidentsData =
          await incidentsResponse.json();

        if (!projectsResponse.ok) {
          console.error(
            projectsData.message ||
            'Failed to fetch projects.'
          );
          return;
        }

        if (!incidentsResponse.ok) {
          console.error(
            incidentsData.message ||
            'Failed to fetch incidents.'
          );
          return;
        }

        setProjects(projectsData.projects || []);
        setIncidents(incidentsData.incidents || []);

        const selectedProjectId =
          sessionStorage.getItem('selectedProjectId');

        let project = null;

        if (selectedProjectId) {
          project = projectsData.projects.find(
            (item) =>
              String(item._id) ===
              String(selectedProjectId)
          );
        }

        if (!project && projectsData.projects.length > 0) {
          project = projectsData.projects[0];

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

    fetchDashboardData();
  }, []);

  const activeIncidents = incidents.filter(
    (incident) => incident.status === 'active'
  );

  return (
    <div className='dashboard-layout'>

      <Sidebar />

      <main className='dashboard-main'>

        <header className='dashboard-topbar'>

          <div>

            <p className='dashboard-eyebrow'>
              OVERVIEW
            </p>

            <h1>Dashboard</h1>

            {selectedProject && (
              <p className="dashboard-project-name">
                Project: {selectedProject.name}
              </p>
            )}

          </div>

          <div className='system-status'>

            <span>●</span>

            {activeIncidents.length === 0
              ? 'All systems operational'
              : `${activeIncidents.length} active incident${
                  activeIncidents.length > 1 ? 's' : ''
                }`}

          </div>

        </header>

        <section className='dashboard-content'>

          <div className='dashboard-welcome'>

            <h2>System Overview</h2>

            <p>
              Monitor the health and reliability of your
              applications.
            </p>

          </div>

          <OverviewCard
            projects={projects}
            incidents={incidents}
          />

          <SystemHealth
            incidents={incidents}
          />

          <IncidentActivity
            incidents={incidents}
          />

        </section>

      </main>

    </div>
  );
};

export default Dashboard;