import IncidentActivity from '../../components/dashboard/IncidentActivity';
import OverviewCard from '../../components/dashboard/OverviewCard';
import Sidebar from '../../components/dashboard/Sidebar';
import SystemHealth from '../../components/dashboard/SystemHealth';
import './Dashboard.css';
import { useEffect, useState } from 'react';

const Dashboard = () => {

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
    <div className='dashboard-layout'>

      <Sidebar />

      <main className='dashboard-main'>

        <header className='dashboard-topbar'>
          <div>
            <p className='dashboard-eyebrow'>OVERVIEW</p>
            <h1>Dashboard</h1>

            {selectedProject && (
              <p className="dashboard-project-name">
                Project: {selectedProject.name}
              </p>
            )}
          </div>

          <div className='system-status'>
            <span>●</span>
            All systems operational
          </div>
        </header>

        <section className='dashboard-content'>
          <div className='dashboard-welcome'>
            <h2>System Overview</h2>
            <p>Monitor the health and reliability of your applications.</p>
          </div>

          <OverviewCard />

          <SystemHealth />

          <IncidentActivity />
        </section>

      </main>
    </div>
  )
}

export default Dashboard