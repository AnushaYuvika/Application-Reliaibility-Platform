import Sidebar from '../../components/dashboard/Sidebar';
import Evidence from '../../components/investigation/Evidence';
import RootCause from '../../components/investigation/RootCause';
import ImpactAnalysis from '../../components/investigation/ImpactAnalysis';
import './Investigation.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../api/api';

const Investigation = () => {
const navigate = useNavigate();

const [selectedProject, setSelectedProject] = useState(null);
const [selectedIncident, setSelectedIncident] = useState(null);
const [investigation, setInvestigation] = useState(null);

const [loading, setLoading] = useState(true);
const [analyzing, setAnalyzing] = useState(false);
const [error, setError] = useState('');

const fetchInvestigationData = async () => {
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
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
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
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
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
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
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
        const investigationIncidentId =
          item.incident?._id ||
          item.incident;

        return (
          String(investigationIncidentId) ===
          String(incidentId)
        );
      }
    );

  setInvestigation(
    matchingInvestigation || null
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
fetchInvestigationData();
}, []);

// Run autonomous incident analysis
const handleAnalyzeIncident = async () => {
if (!selectedIncident) {
return;
}


try {
  setAnalyzing(true);
  setError('');

  const token = localStorage.getItem('token');

  const response = await fetch(
    `${API_BASE_URL}/investigations/analyze`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        incidentId: selectedIncident._id
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    setError(
      data.message ||
        'Failed to analyze incident.'
    );
    return;
  }

  setInvestigation(data.investigation);

} catch (error) {
  setError(
    'Unable to connect to the server.'
  );
} finally {
  setAnalyzing(false);
}


};

const handleOpenResponse = () => {
if (!selectedIncident || !investigation) {
return;
}


sessionStorage.setItem(
  'selectedIncidentId',
  selectedIncident._id
);

navigate('/response');


};

if (loading) {
return ( <div className="investigation-layout">


    <Sidebar />

    <main className="investigation-main">

      <section className="investigation-no-project">

        <div className="investigation-no-project-icon">
          ◉
        </div>

        <h2>
          Loading investigation...
        </h2>

        <p>
          Fetching investigation data from the
          reliability platform.
        </p>

      </section>

    </main>

  </div>
);


}

if (error) {
return ( <div className="investigation-layout">


    <Sidebar />

    <main className="investigation-main">

      <section className="investigation-no-project">

        <div className="investigation-no-project-icon">
          !
        </div>

        <h2>
          Unable to load investigation
        </h2>

        <p>
          {error}
        </p>

        <button
          onClick={() => {
            setError('');
            fetchInvestigationData();
          }}
        >
          Try Again
        </button>

      </section>

    </main>

  </div>
);


}

if (!selectedProject) {
return ( <div className="investigation-layout">


    <Sidebar />

    <main className="investigation-main">

      <header className="investigation-topbar">

        <div>
          <p className="investigation-eyebrow">
            INVESTIGATION
          </p>

          <h1>
            Investigation
          </h1>
        </div>

        <span className="investigation-status">
          Awaiting Project
        </span>

      </header>

      <section className="investigation-content">

        <div className="investigation-no-project">

          <div className="investigation-no-project-icon">
            ◉
          </div>

          <h2>
            No project selected
          </h2>

          <p>
            Select a project before opening investigation.
          </p>

          <button
            onClick={() => navigate('/projects')}
          >
            Go to Projects
          </button>

        </div>

      </section>

    </main>

  </div>
);


}

if (!selectedIncident) {
return ( <div className="investigation-layout">


    <Sidebar />

    <main className="investigation-main">

      <header className="investigation-topbar">

        <div>

          <p className="investigation-eyebrow">
            INVESTIGATION
          </p>

          <h1>
            Investigation
          </h1>

          <p className="investigation-project-name">
            Project: {selectedProject.name}
          </p>

        </div>

        <span className="investigation-status">
          Awaiting Incident
        </span>

      </header>

      <section className="investigation-content">

        <div className="investigation-no-incident">

          <div className="investigation-no-incident-icon">
            ◉
          </div>

          <h2>
            No incident selected
          </h2>

          <p>
            Select an incident before opening investigation.
          </p>

          <button
            onClick={() => navigate('/incidents')}
          >
            Go to Incidents
          </button>

        </div>

      </section>

    </main>

  </div>
);


}

return ( <div className="investigation-layout">


  <Sidebar />

  <main className="investigation-main">

    <header className="investigation-topbar">

      <div>

        <p className="investigation-eyebrow">
          INVESTIGATION
        </p>

        <h1>
          Investigation
        </h1>

        <p className="investigation-project-name">
          Project: {selectedProject.name}
        </p>

        <p className="investigation-incident-name">
          Incident: {selectedIncident.title}
        </p>

      </div>

      <span className="investigation-status">
        {investigation?.status || 'Pending'}
      </span>

    </header>

    <section className="investigation-content">

      <div className="investigation-intro">

        <p className="section-label">
          INCIDENT INVESTIGATION
        </p>

        <h2>
          Analyze Incident
        </h2>

        <p>
          Review evidence, identify the probable root
          cause, and understand the impact of this
          incident.
        </p>

      </div>

      <div className="investigation-incident-summary">

        <div>

          <p className="section-label">
            SELECTED INCIDENT
          </p>

          <h2>
            {selectedIncident.title}
          </h2>

        </div>

        <span
          className={`severity ${selectedIncident.severity}`}
        >
          {selectedIncident.severity}
        </span>

      </div>

      {!investigation && (

        <section className="investigation-no-project">

          <div className="investigation-no-project-icon">
            ◉
          </div>

          <h2>
            Investigation Required
          </h2>

          <p>
            No investigation has been created for this
            incident yet. The platform can analyze the
            incident and its recent logs automatically.
          </p>

          <button
            onClick={handleAnalyzeIncident}
            disabled={analyzing}
          >
            {analyzing
              ? 'Analyzing Incident...'
              : 'Analyze Incident'}
          </button>

        </section>

      )}

      {investigation && (

        <>

          <div className="investigation-grid">

            <Evidence
              investigation={investigation}
            />

            <RootCause
              investigation={investigation}
            />

            <ImpactAnalysis
              investigation={investigation}
            />

          </div>

          <div className="investigation-next-action">

            <div>

              <p className="section-label">
                NEXT STEP
              </p>

              <h2>
                Prepare Response
              </h2>

              <p>
                Review the investigation findings and
                continue to the response stage to prepare
                remediation recommendations.
              </p>

            </div>

            <button
              onClick={handleOpenResponse}
            >
              Open Response
            </button>

          </div>

        </>

      )}

    </section>

  </main>

</div>


);
};

export default Investigation;
