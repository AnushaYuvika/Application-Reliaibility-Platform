import IncidentActivity from '../../components/dashboard/IncidentActivity';
import OverviewCard from '../../components/dashboard/OverviewCard';
import Sidebar from '../../components/dashboard/Sidebar';
import SystemHealth from '../../components/dashboard/SystemHealth';
import './Dashboard.css';
import { useEffect, useState } from 'react';
import API_BASE_URL from '../../api/api';
import apiFetch from '../../api/apiFetch';

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [incidents, setIncidents] = useState([]);

  const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    // 1. Projects: normal fetch
    const projectsResponse = await fetch(`${API_BASE_URL}/projects`, { headers });
    const projectsData = await projectsResponse.json();

    if (!projectsResponse.ok) {
      console.error(projectsData.message || 'Failed to fetch projects.');
      return;
    }

    const allProjects = projectsData.projects || [];
    setProjects(allProjects);

    // 2. Select project
    const selectedProjectId = sessionStorage.getItem('selectedProjectId');

    let project = null;

    if (selectedProjectId) {
      project = allProjects.find(
        (item) => String(item._id) === String(selectedProjectId)
      );
    }

    if (!project && allProjects.length > 0) {
      project = allProjects[0];
      sessionStorage.setItem('selectedProjectId', project._id);
      sessionStorage.removeItem('selectedIncidentId');
    }

    setSelectedProject(project || null);

    // 3. Incidents: apiFetch (adds demo data for new projects)
    const incidentsResponse = await apiFetch(`${API_BASE_URL}/incidents`, { headers });
    const incidentsData = await incidentsResponse.json();

    if (!incidentsResponse.ok) {
      console.error(incidentsData.message || 'Failed to fetch incidents.');
      return;
    }

    setIncidents(incidentsData.incidents || []);

  } catch (error) {
    console.error('Unable to connect to the server.');
  }
};

  const activeIncidents = incidents.filter(
    (incident) => incident.status !== 'resolved'
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