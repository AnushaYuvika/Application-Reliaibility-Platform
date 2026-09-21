import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import Recommendation from '../../components/response/Recommendation';
import Remediation from '../../components/response/Remediation';
import './Response.css';
import { useEffect, useState } from 'react';

const Response = () => {

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
    <div className="response-layout">
      <Sidebar />

      <main className="response-main">
        <header className="response-topbar">
          <div>
            <p className="response-eyebrow">RESPONSE</p>
            <h1>Incident Response</h1>

            {selectedProject && (
              <p className="response-project-name">
                Project: {selectedProject.name}
              </p>
            )}
          </div>

          <span className="response-status">
            Awaiting Review
          </span>
        </header>

        <section className="response-content">

          <div className="response-intro">
            <p className="section-label">RECOMMENDED RESPONSE</p>
            <h2>API response time increased</h2>
            <p>
              Review the recommended remediation actions before
              applying changes to the affected service.
            </p>
          </div>

          {!selectedProject && (
            <section className="response-no-project">
              <div className="response-no-project-icon">
                ◉
              </div>

              <h2>No project selected</h2>

              <p>
                Select a project to view response actions.
              </p>

              <button onClick={() => navigate('/projects')}>
                Go to Projects
              </button>
            </section>
          )}

          {selectedProject && (
            <>
              <div className="response-grid">
                <Recommendation />
                <Remediation />
              </div>

              <div className="response-review">
                <div>
                  <p className="section-label">DEVELOPER REVIEW</p>
                  <h2>Human approval required</h2>
                  <p>
                    The proposed remediation has not been applied.
                    Review the recommendation before proceeding.
                  </p>
                </div>

                <div className="response-actions">
                  <button className="reject-response">
                    Reject
                  </button>

                  <button className="approve-response"
                    onClick={() => navigate('/verification')}
                  >
                    Approve & Continue
                  </button>
                </div>
              </div>
            </>
            
          )}

          

        </section>
      </main>
    </div>
  );
};

export default Response;