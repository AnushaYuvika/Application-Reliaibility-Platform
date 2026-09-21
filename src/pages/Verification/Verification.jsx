import Sidebar from '../../components/dashboard/Sidebar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Verification.css';

const Verification = () => {

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
    <div className="verification-layout">
      <Sidebar />

      <main className="verification-main">
        <header className="verification-topbar">
          <div>
            <p className="verification-eyebrow">VERIFICATION</p>
            <h1>Fix Verification</h1>
            {selectedProject && (
              <p className="verification-project-name">
                Project: {selectedProject.name}
              </p>
            )}
          </div>

          <span className="verification-status">
            Verification in progress
          </span>
        </header>

        <section className="verification-content">

          <div className="verification-intro">
            <p className="section-label">POST-REMEDIATION CHECK</p>
            <h2>API response time increased</h2>
            <p>
              Validating the applied remediation through automated
              tests and system health checks.
            </p>
          </div>

          {!selectedProject && (
            <section className="verification-no-project">
              <div className="verification-no-project-icon">
                ◉
              </div>

              <h2>No project selected</h2>

              <p>
                Select a project to view verification results.
              </p>

              <button onClick={() => navigate('/projects')}>
                Go to Projects
              </button>
            </section>
          )}

          {selectedProject && (
            <>
              <div className="verification-summary">

                <div className="verification-card">
                  <span className="verification-card-label">
                    TESTS
                  </span>
                  <strong>Running</strong>
                  <p>Automated verification tests</p>
                </div>

                <div className="verification-card">
                  <span className="verification-card-label">
                    API LATENCY
                  </span>
                  <strong>142 ms</strong>
                  <p>Current response time</p>
                </div>

                <div className="verification-card">
                  <span className="verification-card-label">
                    ERROR RATE
                  </span>
                  <strong>0.2%</strong>
                  <p>Current API error rate</p>
                </div>

                <div className="verification-card">
                  <span className="verification-card-label">
                    SYSTEM HEALTH
                  </span>
                  <strong className="healthy-text">Healthy</strong>
                  <p>Current service status</p>
                </div>

              </div>

              <div className="verification-checks">

                <div className="verification-checks-header">
                  <div>
                    <p className="section-label">VERIFICATION CHECKS</p>
                    <h2>Automated Validation</h2>
                  </div>
                </div>

                <div className="verification-check">
                  <div className="check-info">
                    <span className="check-icon">✓</span>

                    <div>
                      <h3>Database connection test</h3>
                      <p>
                        Verify database connections remain stable
                        after remediation.
                      </p>
                    </div>
                  </div>

                  <span className="check-passed">Passed</span>
                </div>

                <div className="verification-check">
                  <div className="check-info">
                    <span className="check-icon">✓</span>

                    <div>
                      <h3>API response test</h3>
                      <p>
                        Confirm API response time is within the
                        configured threshold.
                      </p>
                    </div>
                  </div>

                  <span className="check-passed">Passed</span>
                </div>

              <div className="verification-check">
                <div className="check-info">
                  <span className="check-icon pending">◌</span>

                  <div>
                    <h3>Load validation</h3>
                    <p>
                      Validate service performance under expected
                      request volume.
                    </p>
                  </div>
                </div>

                <span className="check-pending">Running</span>
              </div>

          </div>
            </>
          )}

        </section>
      </main>
    </div>
  );
};

export default Verification;