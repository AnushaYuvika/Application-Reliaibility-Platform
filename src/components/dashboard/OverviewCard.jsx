import './OverviewCards.css';

const OverviewCard = ({
  projects,
  incidents
}) => {

  const activeIncidents = incidents.filter(
    (incident) => incident.status === 'active'
  );

  const resolvedIncidents = incidents.filter(
    (incident) => incident.status === 'resolved'
  );

  return (
    <section className='overview-cards'>

      {/* Active Incidents */}

      <div className='overview-card'>

        <div className='card-header'>
          <span>Active Incidents</span>
          <span className='card-icon'>!</span>
        </div>

        <h2>
          {activeIncidents.length}
        </h2>

        <p className='card-warning'>
          {activeIncidents.length > 0
            ? `${activeIncidents.length} require attention`
            : 'No active incidents'}
        </p>

      </div>


      {/* Projects */}

      <div className='overview-card'>

        <div className='card-header'>
          <span>Services</span>
          <span className='card-icon'>◉</span>
        </div>

        <h3>
          {projects.length}
        </h3>

        <p>Projects</p>

        <p className='card-success'>
          {projects.length > 0
            ? 'Connected to backend'
            : 'No projects'}
        </p>

      </div>


      {/* Deployment */}

      <div className='overview-card'>

        <div className='card-header'>
          <span>Deployment</span>
          <span className='card-icon'>↗</span>
        </div>

        <h2>—</h2>

        <p>Last 7 days</p>

      </div>


      {/* System Health */}

      <div className='overview-card'>

        <div className='card-header'>
          <span>System Health</span>
          <span className='card-icon'>♥</span>
        </div>

        <h2>
          {resolvedIncidents.length > 0
            ? 'Tracked'
            : '—'}
        </h2>

        <p className='card-success'>
          Based on incident data
        </p>

      </div>

    </section>
  );
};

export default OverviewCard;