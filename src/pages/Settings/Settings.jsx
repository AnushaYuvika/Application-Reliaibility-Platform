import Sidebar from '../../components/dashboard/Sidebar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';
import API_BASE_URL from '../../api/api';

const Settings = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [selectedProject, setSelectedProject] = useState(null);

useEffect(() => {
  const fetchProject = async () => {
    const projectId = sessionStorage.getItem('selectedProjectId');

    if (!projectId) {
      setSelectedProject(null);
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        `${API_BASE_URL}/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await response.json();

      setSelectedProject(response.ok ? data.project : null);
    } catch (error) {
      setSelectedProject(null);
    } finally {
      setLoading(false);
    }
  };

  fetchProject();
}, []);

  return (
    <div className="settings-layout">
      <Sidebar />

      <main className="settings-main">
        <header className="settings-topbar">
          <div>
            <p className="settings-eyebrow">SETTINGS</p>
            <h1>Platform Settings</h1>
            {selectedProject && (
              <p className="settings-project-name">
                Project: {selectedProject.name}
              </p>
            )}
          </div>
        </header>
        
        {!loading && !selectedProject && (
          <section className="settings-no-project">
            <div className="settings-no-project-icon">
              ◉
            </div>

            <h2>No project selected</h2>

            <p>
              Select a project to view its settings.
            </p>

            <button onClick={() => navigate('/projects')}>
              Go to Projects
            </button>
          </section>
        )}

        {selectedProject && (
          <>
            <section className="settings-content">

              <div className="settings-intro">
                <p className="section-label">CONFIGURATION</p>
                <h2>Reliability Platform</h2>
                <p>
                  Configure monitoring, notifications, and platform
                  preferences.
                </p>
              </div>

              <div className="settings-section">

                <div className="settings-section-header">
                  <p className="section-label">MONITORING</p>
                  <h2>Monitoring Preferences</h2>
                </div>

                <div className="settings-row">
                  <div>
                    <h3>Real-time monitoring</h3>
                    <p>
                      Continuously monitor application health and
                      system metrics.
                    </p>
                  </div>

                  <span className="setting-status enabled">
                    Enabled
                  </span>
                </div>

                <div className="settings-row">
                  <div>
                    <h3>Automatic incident detection</h3>
                    <p>
                      Detect abnormal system behavior and create
                      incidents automatically.
                    </p>
                  </div>

                  <span className="setting-status enabled">
                    Enabled
                  </span>
                </div>

                <div className="settings-row">
                  <div>
                    <h3>AI root cause analysis</h3>
                    <p>
                      Analyze collected evidence to identify probable
                      root causes.
                    </p>
                  </div>

                  <span className="setting-status enabled">
                    Enabled
                  </span>
                </div>

              </div>

              <div className="settings-section">

                <div className="settings-section-header">
                  <p className="section-label">NOTIFICATIONS</p>
                  <h2>Notification Preferences</h2>
                </div>

                <div className="settings-row">
                  <div>
                    <h3>Critical incident alerts</h3>
                    <p>
                      Receive notifications when critical incidents
                      are detected.
                    </p>
                  </div>

                  <span className="setting-status enabled">
                    Enabled
                  </span>
                </div>

                <div className="settings-row">
                  <div>
                    <h3>Recovery notifications</h3>
                    <p>
                      Receive notifications when incidents are
                      successfully resolved.
                    </p>
                  </div>

                  <span className="setting-status enabled">
                    Enabled
                  </span>
                </div>

              </div>

              <div className="settings-section">

                <div className="settings-section-header">
                  <p className="section-label">ACCOUNT</p>
                  <h2>Account Information</h2>
                </div>

                <div className="account-info">

                  <div className="account-item">
                    <span>Email</span>
                    <strong>{user.email || '—'}</strong>
                  </div>

                  <div className="account-item">
                    <span>Role</span>
                    <strong>{user.role || '—'}</strong>
                  </div>

                  <div className="account-item">
                    <span>Platform</span>
                    <strong>Reliability Workspace</strong>
                  </div>

                </div>

              </div>

            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Settings;