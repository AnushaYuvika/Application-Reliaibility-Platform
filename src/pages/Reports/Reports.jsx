import Sidebar from '../../components/dashboard/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Reports.css';

const Reports = () => {

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
    <div className="reports-layout">
      <Sidebar />

      <main className="reports-main">
        <header className="reports-topbar">
          <div>
            <p className="reports-eyebrow">REPORTS</p>
            <h1>Reliability Reports</h1>
            {selectedProject && (
              <p className="reports-project-name">
                Project: {selectedProject.name}
              </p>
            )}
          </div>

          <button className="generate-report-btn">
            + Generate Report
          </button>
        </header>

        <section className="reports-content">

          <div className="reports-intro">
            <p className="section-label">RELIABILITY OVERVIEW</p>
            <h2>System Performance Reports</h2>
            <p>
              Review incident trends, system reliability, and
              recovery performance across your applications.
            </p>
          </div>
          
          {!selectedProject && (
            <section className="reports-no-project">
              <div className="reports-no-project-icon">
                ◉
              </div>

              <h2>No project selected</h2>

              <p>
                Select a project to view reliability reports.
              </p>

              <button onClick={() => navigate('/projects')}>
                Go to Projects
              </button>
            </section>
          )}

          {selectedProject && (
            <>
              <div className="report-summary">

                <div className="report-card">
                  <span className="report-card-label">
                    INCIDENTS
                  </span>
                  <strong>15</strong>
                  <p>Total incidents this month</p>
                </div>

                <div className="report-card">
                  <span className="report-card-label">
                    RESOLVED
                  </span>
                  <strong>12</strong>
                  <p>Successfully resolved incidents</p>
                </div>

                <div className="report-card">
                  <span className="report-card-label">
                    UPTIME
                  </span>
                  <strong>99.7%</strong>
                  <p>Average system uptime</p>
                </div>

                <div className="report-card">
                  <span className="report-card-label">
                    MTTR
                  </span>
                  <strong>24m</strong>
                  <p>Mean time to recovery</p>
                </div>

              </div>

              <div className="reports-table-section">

                <div className="reports-table-header">
                  <div>
                    <p className="section-label">INCIDENT HISTORY</p>
                    <h2>Recent Reports</h2>
                  </div>

                  <span className="report-period">
                    Last 30 days
                  </span>
                </div>

                <div className="reports-table">

                  <div className="report-row report-row-heading">
                    <span>Incident</span>
                    <span>Service</span>
                    <span>Status</span>
                    <span>Recovery</span>
                  </div>

                  <div className="report-row">
                    <span>API response time increased</span>
                    <span>Payment Service</span>
                    <span className="report-resolved">
                      Resolved
                    </span>
                    <span>18 min</span>
                  </div>

                  <div className="report-row">
                    <span>Database connection latency</span>
                    <span>Database Service</span>
                    <span className="report-resolved">
                      Resolved
                    </span>
                    <span>31 min</span>
                  </div>

                  <div className="report-row">
                    <span>Authentication timeout</span>
                    <span>Auth Service</span>
                    <span className="report-resolved">
                      Resolved
                    </span>
                    <span>22 min</span>
                  </div>

                  <div className="report-row">
                    <span>High memory usage</span>
                    <span>Analytics Platform</span>
                    <span className="report-investigating">
                      Investigating
                    </span>
                    <span>—</span>
                  </div>

                </div>

              </div>
            </>
          )}

        </section>
      </main>
    </div>
  );
};

export default Reports;