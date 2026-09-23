
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../../components/dashboard/Sidebar';
import Recommendation from '../../components/response/Recommendation';
import Remediation from '../../components/response/Remediation';

import './Response.css';

import API_BASE_URL from '../../api/api';

const Response = () => {
  const navigate = useNavigate();

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [investigation, setInvestigation] = useState(null);
  const [response, setResponse] = useState(null);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const fetchResponseData = async () => {
    try {
      setLoading(true);
      setError('');

      const token = localStorage.getItem('token');

      const projectId =
        sessionStorage.getItem('selectedProjectId');

      const incidentId =
        sessionStorage.getItem('selectedIncidentId');

      if (!projectId || !incidentId) {
        setLoading(false);
        return;
      }

      // Fetch project
      const projectResponse = await fetch(
        `${API_BASE_URL}/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const projectData = await projectResponse.json();

      if (!projectResponse.ok) {
        setError(
          projectData.message ||
            'Failed to fetch project.'
        );
        return;
      }

      setSelectedProject(projectData.project);

      // Fetch incident
      const incidentResponse = await fetch(
        `${API_BASE_URL}/incidents/${incidentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const incidentData = await incidentResponse.json();

      if (!incidentResponse.ok) {
        setError(
          incidentData.message ||
            'Failed to fetch incident.'
        );
        return;
      }

      setSelectedIncident(incidentData.incident);

      // Fetch investigations
      const investigationResponse = await fetch(
        `${API_BASE_URL}/investigations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const investigationData =
        await investigationResponse.json();

      if (!investigationResponse.ok) {
        setError(
          investigationData.message ||
            'Failed to fetch investigation.'
        );
        return;
      }

      const matchingInvestigation =
        investigationData.investigations.find(
          (item) => {
            const itemIncidentId =
              item.incident?._id ||
              item.incident;

            return (
              String(itemIncidentId) ===
              String(incidentId)
            );
          }
        );

      setInvestigation(
        matchingInvestigation || null
      );

      // Fetch responses
      const responseResponse = await fetch(
        `${API_BASE_URL}/responses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData =
        await responseResponse.json();

      if (!responseResponse.ok) {
        setError(
          responseData.message ||
            'Failed to fetch response.'
        );
        return;
      }

      const matchingResponse =
        responseData.responses.find(
          (item) => {
            const itemIncidentId =
              item.incident?._id ||
              item.incident;

            return (
              String(itemIncidentId) ===
              String(incidentId)
            );
          }
        );

      setResponse(
        matchingResponse || null
      );

    } catch (error) {
      setError(
        'Unable to connect to the server.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponseData();
  }, []);

  // Generate response from investigation findings
  const handleGenerateResponse = async () => {
    if (!selectedIncident || !investigation) {
      return;
    }

    try {
      setGenerating(true);
      setError('');

      const token = localStorage.getItem('token');

      const rootCause =
        investigation.rootCause ||
        'The investigation identified an operational issue requiring corrective action.';

      const impact =
        investigation.impact ||
        'The incident may affect application reliability and service availability.';

      const evidence =
        investigation.evidence ||
        'Investigation evidence was collected from the available monitoring data.';

      const recommendation =
        `Address the identified root cause: ${rootCause}`;

      const remediation =
        [
          `Review and correct the underlying issue identified during investigation.`,
          `Validate the affected service and its configuration using the collected evidence.`,
          `Monitor the system after remediation to confirm that the incident condition no longer occurs.`
        ];

      let responseData;

      // Existing response → update it
      if (response?._id) {

        const updateResponse = await fetch(
          `${API_BASE_URL}/responses/${response._id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              recommendation,
              remediation,
              approvalStatus: 'pending',
              status: 'pending',
              approvedBy: null,
              recommendationReason:
                `The recommendation was generated from the investigation findings. Evidence: ${evidence} Impact: ${impact}`,
            }),
          }
        );

        responseData =
          await updateResponse.json();

        if (!updateResponse.ok) {
          setError(
            responseData.message ||
              'Failed to generate response.'
          );
          return;
        }

      } else {

        // No response exists → create one
        const createResponse = await fetch(
          `${API_BASE_URL}/responses`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              incident: selectedIncident._id,
              investigation: investigation._id,
              recommendation,
              remediation,
              approvalStatus: 'pending',
              status: 'pending',
              recommendationReason:
                `The recommendation was generated from the investigation findings. Evidence: ${evidence} Impact: ${impact}`,
            }),
          }
        );

        responseData =
          await createResponse.json();

        if (!createResponse.ok) {
          setError(
            responseData.message ||
              'Failed to create response.'
          );
          return;
        }
      }

      setResponse(responseData.response);

    } catch (error) {
      setError(
        'Unable to generate response.'
      );
    } finally {
      setGenerating(false);
    }
  };

  // Approve or reject response
  const handleResponseAction = async (
    approvalStatus
  ) => {
    if (!response?._id) {
      return;
    }

    try {
      setActionLoading(true);
      setError('');

      const token = localStorage.getItem('token');

      const responseUpdate = await fetch(
        `${API_BASE_URL}/responses/${response._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            approvalStatus,
            approvedBy:
              approvalStatus === 'approved'
                ? 'Developer'
                : '',
            status:
              approvalStatus === 'approved'
                ? 'approved'
                : 'failed',
          }),
        }
      );

      const data =
        await responseUpdate.json();

      if (!responseUpdate.ok) {
        setError(
          data.message ||
            'Failed to update response.'
        );
        return;
      }

      setResponse(data.response);

    } catch (error) {
      setError(
        'Unable to connect to the server.'
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleVerification = () => {
    if (!selectedIncident) {
      return;
    }

    sessionStorage.setItem(
      'selectedIncidentId',
      selectedIncident._id
    );

    navigate('/verification');
  };

  if (loading) {
    return (
      <div className="response-layout">

        <Sidebar />

        <main className="response-main">

          <section className="response-no-project">

            <div className="response-no-project-icon">
              ◉
            </div>

            <h2>
              Loading response...
            </h2>

            <p>
              Fetching response data from the
              reliability platform.
            </p>

          </section>

        </main>

      </div>
    );
  }

  if (error) {
    return (
      <div className="response-layout">

        <Sidebar />

        <main className="response-main">

          <section className="response-no-project">

            <div className="response-no-project-icon">
              !
            </div>

            <h2>
              Unable to load response
            </h2>

            <p>
              {error}
            </p>

            <button
              onClick={() => {
                setError('');
                fetchResponseData();
              }}
            >
              Try Again
            </button>

          </section>

        </main>

      </div>
    );
  }

  return (
    <div className="response-layout">

      <Sidebar />

      <main className="response-main">

        <header className="response-topbar">

          <div>

            <p className="response-eyebrow">
              RESPONSE
            </p>

            <h1>
              Response
            </h1>

            {selectedProject && (
              <p className="response-project-name">
                Project: {selectedProject.name}
              </p>
            )}

            {selectedIncident && (
              <p className="response-incident-name">
                Incident: {selectedIncident.title}
              </p>
            )}

          </div>

        </header>

        <section className="response-content">

          {!selectedProject && (
            <section className="response-no-project">

              <div className="response-no-project-icon">
                ◉
              </div>

              <h2>
                No project selected
              </h2>

              <p>
                Select a project to prepare an incident response.
              </p>

              <button
                onClick={() => navigate('/projects')}
              >
                Go to Projects
              </button>

            </section>
          )}

          {selectedProject && !selectedIncident && (
            <section className="response-no-incident">

              <div className="response-no-incident-icon">
                ◉
              </div>

              <h2>
                No incident selected
              </h2>

              <p>
                Select an incident before preparing a response.
              </p>

              <button
                onClick={() => navigate('/incidents')}
              >
                Go to Incidents
              </button>

            </section>
          )}

          {selectedProject && selectedIncident && (
            <>

              <section className="response-incident-summary">

                <div>

                  <p className="section-label">
                    RESPONSE FOR INCIDENT
                  </p>

                  <h2>
                    {selectedIncident.title}
                  </h2>

                </div>

                <span
                  className={`severity ${
                    selectedIncident.severity === 'high'
                      ? 'warning'
                      : selectedIncident.severity
                  }`}
                >
                  {selectedIncident.severity}
                </span>

              </section>

              {!investigation && (
                <section className="response-no-project">

                  <div className="response-no-project-icon">
                    ◉
                  </div>

                  <h2>
                    Investigation Required
                  </h2>

                  <p>
                    Complete the incident investigation
                    before preparing a response.
                  </p>

                  <button
                    onClick={() =>
                      navigate('/investigation')
                    }
                  >
                    Open Investigation
                  </button>

                </section>
              )}

              {investigation && (
                <>

                  {!response && (
                    <section className="response-no-project">

                      <div className="response-no-project-icon">
                        ◉
                      </div>

                      <h2>
                        Response Ready to Generate
                      </h2>

                      <p>
                        Investigation findings are available.
                        Generate a recommendation and remediation
                        plan from the investigation evidence.
                      </p>

                      <button
                        type="button"
                        onClick={handleGenerateResponse}
                        disabled={generating}
                      >
                        {generating
                          ? 'Generating Response...'
                          : 'Generate Response'}
                      </button>

                    </section>
                  )}

                  {response && (
                    <>

                      <div className="response-grid">

                        <Recommendation
                          response={response}
                        />

                        <Remediation
                          response={response}
                        />

                      </div>

                      <div className="response-next-action">

                        <div>

                          <p className="section-label">
                            RESPONSE STATUS
                          </p>

                          <h2>
                            {response.approvalStatus}
                          </h2>

                          <p>
                            {response.approvalStatus === 'approved'
                              ? 'This response has been approved and can proceed to verification.'
                              : response.approvalStatus === 'rejected'
                              ? 'This response has been rejected and requires review.'
                              : 'Review the generated recommendation and remediation before making an approval decision.'}
                          </p>

                        </div>

                        {response.approvalStatus === 'pending' && (
                          <div className="response-actions">

                            <button
                              type="button"
                              onClick={() =>
                                handleResponseAction('approved')
                              }
                              disabled={actionLoading}
                            >
                              {actionLoading
                                ? 'Updating...'
                                : 'Approve Response'}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleResponseAction('rejected')
                              }
                              disabled={actionLoading}
                            >
                              {actionLoading
                                ? 'Updating...'
                                : 'Reject Response'}
                            </button>

                          </div>
                        )}

                        {response.approvalStatus === 'approved' && (
                          <button
                            type="button"
                            onClick={handleVerification}
                          >
                            Open Verification
                          </button>
                        )}

                      </div>

                    </>
                  )}

                </>
              )}

            </>
          )}

        </section>

      </main>

    </div>
  );
};

export default Response;

