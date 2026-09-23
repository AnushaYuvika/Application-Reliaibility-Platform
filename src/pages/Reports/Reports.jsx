import Sidebar from '../../components/dashboard/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import './Reports.css';

import API_BASE_URL from '../../api/api';

const Reports = () => {

  const navigate = useNavigate();

  const [selectedProject, setSelectedProject] = useState(null);
  const [incidents, setIncidents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {

    const fetchReportData = async () => {

      try {

        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');

        const projectId =
          sessionStorage.getItem('selectedProjectId');

        if (!projectId) {
          setLoading(false);
          return;
        }

        // Fetch project
        const projectResponse = await fetch(
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

        // Fetch incidents
        const incidentsResponse = await fetch(
          `${API_BASE_URL}/incidents`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const incidentsData =
          await incidentsResponse.json();

        if (!incidentsResponse.ok) {
          setError(
            incidentsData.message ||
              'Failed to fetch incidents.'
          );
          return;
        }

        const projectIncidents =
          incidentsData.incidents.filter(
            (incident) => {

              const incidentProjectId =
                incident.project?._id ||
                incident.project;

              return (
                String(incidentProjectId) ===
                String(projectId)
              );
            }
          );

        setIncidents(projectIncidents);

      } catch (error) {

        setError(
          'Unable to connect to the server.'
        );

      } finally {

        setLoading(false);

      }

    };

    fetchReportData();

  }, []);

  if (loading) {

    return (
      <div className="reports-layout">

        <Sidebar />

        <main className="reports-main">

          <section className="reports-no-project">

            <div className="reports-no-project-icon">
              ◉
            </div>

            <h2>
              Loading reports...
            </h2>

            <p>
              Fetching reliability data from the
              reliability platform.
            </p>

          </section>

        </main>

      </div>
    );

  }

  if (error) {

    return (
      <div className="reports-layout">

        <Sidebar />

        <main className="reports-main">

          <section className="reports-no-project">

            <div className="reports-no-project-icon">
              !
            </div>

            <h2>
              Unable to load reports
            </h2>

            <p>
              {error}
            </p>

          </section>

        </main>

      </div>
    );

  }

  const totalIncidents =
    incidents.length;

  const resolvedIncidents =
    incidents.filter(
      (incident) =>
        incident.status === 'resolved'
    ).length;


  const handleGenerateReport = () => {
    if (!selectedProject) {
      return;
    }

    const doc = new jsPDF();

    const resolvedIncidents = incidents.filter(
      (incident) => incident.status === 'resolved'
    );

    const activeIncidents = incidents.filter(
      (incident) => incident.status !== 'resolved'
    );

    let y = 20;

    // Header
    doc.setFontSize(18);
    doc.text(
      'AUTONOMOUS SOFTWARE RELIABILITY PLATFORM',
      20,
      y
    );

    y += 12;

    doc.setFontSize(14);
    doc.text('INCIDENT REPORT', 20, y);

    y += 15;

    // Project Information
    doc.setFontSize(11);
    doc.text(`Project: ${selectedProject.name}`, 20, y);

    y += 7;

    doc.text(
      `Environment: ${selectedProject.environment}`,
      20,
      y
    );

    y += 7;

    doc.text(
      `Repository: ${selectedProject.repository}`,
      20,
      y
    );

    y += 7;

    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      20,
      y
    );

    y += 15;

    // Summary
    doc.setFontSize(13);
    doc.text('SUMMARY', 20, y);

    y += 8;

    doc.setFontSize(11);

    doc.text(
      `Total Incidents: ${incidents.length}`,
      20,
      y
    );

    y += 7;

    doc.text(
      `Resolved Incidents: ${resolvedIncidents.length}`,
      20,
      y
    );

    y += 7;

    doc.text(
      `Active Incidents: ${activeIncidents.length}`,
      20,
      y
    );

    y += 7;

    doc.text('Uptime: —', 20, y);

    y += 7;

    doc.text('MTTR: —', 20, y);

    y += 15;

    // Incident History
    doc.setFontSize(13);
    doc.text('INCIDENT HISTORY', 20, y);

    y += 10;

    doc.setFontSize(10);

    if (incidents.length === 0) {
      doc.text(
        'No incidents recorded for this project.',
        20,
        y
      );

      y += 10;
    }

    incidents.forEach((incident, index) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(11);

      doc.text(
        `${index + 1}. ${incident.title}`,
        20,
        y
      );

      y += 6;

      doc.setFontSize(10);

      doc.text(
        `Severity: ${incident.severity}`,
        25,
        y
      );

      y += 6;

      doc.text(
        `Status: ${incident.status}`,
        25,
        y
      );

      y += 6;

      doc.text(
        `Started: ${new Date(
          incident.startedAt || incident.createdAt
        ).toLocaleString()}`,
        25,
        y
      );

      y += 6;

      if (incident.resolvedAt) {
        doc.text(
          `Resolved: ${new Date(
            incident.resolvedAt
          ).toLocaleString()}`,
          25,
          y
        );

        y += 6;
      }

      y += 5;
    });

    // Footer
    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    y += 10;

    doc.setFontSize(9);

    doc.text(
      'Generated by Autonomous Software Reliability Platform',
      20,
      y
    );

    doc.save(
      `${selectedProject.name}-reliability-report.pdf`
    );
  };



  return (
    <div className="reports-layout">

      <Sidebar />

      <main className="reports-main">

        <header className="reports-topbar">

          <div>

            <p className="reports-eyebrow">
              REPORTS
            </p>

            <h1>
              Reliability Reports
            </h1>

            {selectedProject && (
              <p className="reports-project-name">
                Project: {selectedProject.name}
              </p>
            )}

          </div>

          <button className="generate-report-btn"onClick={handleGenerateReport}>
            + Generate Report
          </button>

        </header>

        {!selectedProject && (

          <section className="reports-no-project">

            <div className="reports-no-project-icon">
              ◉
            </div>

            <h2>
              No project selected
            </h2>

            <p>
              Select a project to view reliability reports.
            </p>

            <button
              onClick={() => navigate('/projects')}
            >
              Go to Projects
            </button>

          </section>

        )}

        {selectedProject && (

          <section className="reports-content">

            <div className="reports-intro">

              <p className="section-label">
                RELIABILITY OVERVIEW
              </p>

              <h2>
                System Performance Reports
              </h2>

              <p>
                Review incident trends, system reliability,
                and recovery performance across your applications.
              </p>

            </div>

            <div className="report-summary">

              <div className="report-card">

                <span className="report-card-label">
                  INCIDENTS
                </span>

                <strong>
                  {totalIncidents}
                </strong>

                <p>
                  Total incidents
                </p>

              </div>

              <div className="report-card">

                <span className="report-card-label">
                  RESOLVED
                </span>

                <strong>
                  {resolvedIncidents}
                </strong>

                <p>
                  Resolved incidents
                </p>

              </div>

              <div className="report-card">

                <span className="report-card-label">
                  UPTIME
                </span>

                <strong>
                  —
                </strong>

                <p>
                  Monitoring data required
                </p>

              </div>

              <div className="report-card">

                <span className="report-card-label">
                  MTTR
                </span>

                <strong>
                  —
                </strong>

                <p>
                  Recovery timestamps required
                </p>

              </div>

            </div>

            <div className="reports-table-section">

              <div className="reports-table-header">

                <div>

                  <p className="section-label">
                    INCIDENT HISTORY
                  </p>

                  <h2>
                    Recent Reports
                  </h2>

                </div>

                <span className="report-period">
                  Current project
                </span>

              </div>

              <div className="reports-table">

                <div className="report-row report-row-heading">
                  <span>Incident</span>
                  <span>Service</span>
                  <span>Status</span>
                  <span>Recovery</span>
                </div>

                {incidents.length === 0 ? (

                  <div className="report-row">

                    <span>
                      No incidents found
                    </span>

                    <span>
                      —
                    </span>

                    <span>
                      —
                    </span>

                    <span>
                      —
                    </span>

                  </div>

                ) : (

                  incidents.map((incident) => (

                    <div
                      className="report-row"
                      key={incident._id}
                    >

                      <span>
                        {incident.title}
                      </span>

                      <span>
                        {selectedProject.name}
                      </span>

                      <span
                        className={
                          incident.status === 'resolved'
                            ? 'report-resolved'
                            : 'report-investigating'
                        }
                      >
                        {incident.status}
                      </span>

                      <span>
                        {incident.resolvedAt
                          ? new Date(
                              incident.resolvedAt
                            ).toLocaleString()
                          : '—'}
                      </span>

                    </div>

                  ))

                )}

              </div>

            </div>

          </section>

        )}

      </main>

    </div>
  );
};

export default Reports;