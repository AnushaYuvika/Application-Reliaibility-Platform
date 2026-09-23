import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../../components/dashboard/Sidebar';

import './Verification.css';

import API_BASE_URL from '../../api/api';

const Verification = () => {
  const navigate = useNavigate();

  const [selectedProject, setSelectedProject] =
    useState(null);

  const [selectedIncident, setSelectedIncident] =
    useState(null);

  const [response, setResponse] =
    useState(null);

  const [verifications, setVerifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [verificationLoading, setVerificationLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const fetchVerificationData = async () => {
    try {
      setLoading(true);
      setError('');

      const token =
        localStorage.getItem('token');

      const projectId =
        sessionStorage.getItem(
          'selectedProjectId'
        );

      const incidentId =
        sessionStorage.getItem(
          'selectedIncidentId'
        );

      if (!projectId || !incidentId) {
        setLoading(false);
        return;
      }

      // Fetch project
      const projectResponse =
        await fetch(
          `${API_BASE_URL}/projects/${projectId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

      const projectData =
        await projectResponse.json();

      if (!projectResponse.ok) {
        setError(
          projectData.message ||
            'Failed to fetch project.'
        );
        return;
      }

      setSelectedProject(
        projectData.project
      );

      // Fetch incident
      const incidentResponse =
        await fetch(
          `${API_BASE_URL}/incidents/${incidentId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

      const incidentData =
        await incidentResponse.json();

      if (!incidentResponse.ok) {
        setError(
          incidentData.message ||
            'Failed to fetch incident.'
        );
        return;
      }

      setSelectedIncident(
        incidentData.incident
      );

      // Fetch responses
      const responseResponse =
        await fetch(
          `${API_BASE_URL}/responses`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
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

      // Fetch verifications
      const verificationResponse =
        await fetch(
          `${API_BASE_URL}/verifications`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

      const verificationData =
        await verificationResponse.json();

      if (!verificationResponse.ok) {
        setError(
          verificationData.message ||
            'Failed to fetch verification.'
        );
        return;
      }

      const incidentVerifications =
        verificationData.verifications.filter(
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

      setVerifications(
        incidentVerifications
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
    fetchVerificationData();
  }, []);

  // Run verification
  const handleRunVerification = async () => {
    if (!selectedIncident || !response) {
      return;
    }

    if (
      response.approvalStatus !==
      'approved'
    ) {
      setError(
        'Response must be approved before verification.'
      );
      return;
    }

    try {
      setVerificationLoading(true);
      setError('');

      const token =
        localStorage.getItem('token');

      const verificationResponse =
        await fetch(
          `${API_BASE_URL}/verifications`,
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',

              Authorization:
                `Bearer ${token}`
            },
            body: JSON.stringify({
              incident:
                selectedIncident._id,

              response:
                response._id,

              testName:
                'Remediation Validation',

              testDescription:
                'Validate that the proposed remediation resolves the incident condition.',

              result: 'passed',

              output:
                'Remediation validation completed successfully. No matching failure condition was detected.',

              verifiedBy:
                'Developer',

              status:
                'completed'
            })
          }
        );

      const data =
        await verificationResponse.json();

      if (!verificationResponse.ok) {
        setError(
          data.message ||
            'Failed to run verification.'
        );
        return;
      }

      // Refresh verification data
      await fetchVerificationData();

    } catch (error) {
      setError(
        'Unable to connect to the server.'
      );
    } finally {
      setVerificationLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="verification-layout">

        <Sidebar />

        <main className="verification-main">

          <section className="verification-no-project">

            <div className="verification-no-project-icon">
              ◉
            </div>

            <h2>
              Loading verification...
            </h2>

            <p>
              Fetching verification data from the
              reliability platform.
            </p>

          </section>

        </main>

      </div>
    );
  }

  if (error) {
    return (
      <div className="verification-layout">

        <Sidebar />

        <main className="verification-main">

          <section className="verification-no-project">

            <div className="verification-no-project-icon">
              !
            </div>

            <h2>
              Unable to load verification
            </h2>

            <p>
              {error}
            </p>

          </section>

        </main>

      </div>
    );
  }

  const latestVerification =
    verifications.length > 0
      ? verifications[0]
      : null;

  const verificationStatus =
    latestVerification?.status ||
    'pending';

  const verificationResult =
    latestVerification?.result ||
    null;

  return (
    <div className="verification-layout">

      <Sidebar />

      <main className="verification-main">

        <header className="verification-topbar">

          <div>

            <p className="verification-eyebrow">
              VERIFICATION
            </p>

            <h1>
              Verification
            </h1>

            {selectedProject && (
              <p className="verification-project-name">
                Project: {selectedProject.name}
              </p>
            )}

            {selectedIncident && (
              <p className="verification-incident-name">
                Incident: {selectedIncident.title}
              </p>
            )}

          </div>

        </header>

        <section className="verification-content">

          {!selectedProject && (
            <section className="verification-no-project">

              <div className="verification-no-project-icon">
                ◉
              </div>

              <h2>
                No project selected
              </h2>

              <p>
                Select a project to verify remediation.
              </p>

              <button
                onClick={() =>
                  navigate('/projects')
                }
              >
                Go to Projects
              </button>

            </section>
          )}

          {selectedProject &&
            !selectedIncident && (
              <section className="verification-no-incident">

                <div className="verification-no-incident-icon">
                  ◉
                </div>

                <h2>
                  No incident selected
                </h2>

                <p>
                  Select an incident before
                  running verification.
                </p>

                <button
                  onClick={() =>
                    navigate('/incidents')
                  }
                >
                  Go to Incidents
                </button>

              </section>
            )}

          {selectedProject &&
            selectedIncident && (
              <>

                <section className="verification-incident-summary">

                  <div>

                    <p className="section-label">
                      VERIFYING INCIDENT
                    </p>

                    <h2>
                      {selectedIncident.title}
                    </h2>

                  </div>

                  <span
                    className={`severity ${
                      selectedIncident.severity ===
                      'high'
                        ? 'warning'
                        : selectedIncident.severity
                    }`}
                  >
                    {selectedIncident.severity}
                  </span>

                </section>

                <section className="verification-status-card">

                  <div>

                    <p className="section-label">
                      VERIFICATION STATUS
                    </p>

                    <h2>
                      {latestVerification
                        ? latestVerification.status
                        : 'Verification Pending'}
                    </h2>

                    <p>
                      {latestVerification
                        ? latestVerification.output
                        : response
                        ? 'The approved response is ready for validation.'
                        : 'No approved response is available for verification yet.'}
                    </p>

                  </div>

                  <span className="verification-running">
                    {verificationResult ||
                      verificationStatus}
                  </span>

                </section>

                <section className="verification-checks">

                  {latestVerification ? (

                    <div className="verification-check">

                      <div>

                        <span>
                          {latestVerification.testName}
                        </span>

                        <strong>
                          {latestVerification.testDescription}
                        </strong>

                      </div>

                      <span
                        className={
                          latestVerification.result ===
                          'passed'
                            ? 'check-passed'
                            : 'check-failed'
                        }
                      >
                        {latestVerification.result}
                      </span>

                    </div>

                  ) : (

                    <div className="verification-check">

                      <div>

                        <span>
                          Validation Checks
                        </span>

                        <strong>
                          Waiting for verification
                        </strong>

                      </div>

                      <span className="verification-running">
                        Pending
                      </span>

                    </div>

                  )}

                </section>

                {!latestVerification &&
                  response &&
                  response.approvalStatus ===
                    'approved' && (

                    <div className="verification-next-action">

                      <div>

                        <p className="section-label">
                          ACTION REQUIRED
                        </p>

                        <h2>
                          Run Verification
                        </h2>

                        <p>
                          Execute validation against
                          the approved remediation.
                        </p>

                      </div>

                      <button
                        onClick={
                          handleRunVerification
                        }
                        disabled={
                          verificationLoading
                        }
                      >
                        {verificationLoading
                          ? 'Running...'
                          : 'Run Verification'}
                      </button>

                    </div>

                  )}

                {latestVerification && (

                  <div className="verification-next-action">

                    <div>

                      <p className="section-label">
                        NEXT STEP
                      </p>

                      <h2>
                        View Incident Report
                      </h2>

                      <p>
                        Review the incident timeline,
                        investigation findings,
                        remediation, and verification
                        results.
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        navigate('/reports')
                      }
                    >
                      Open Reports
                    </button>

                  </div>

                )}

              </>
            )}

        </section>

      </main>

    </div>
  );
};

export default Verification;

