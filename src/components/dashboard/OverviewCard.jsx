import { useEffect, useState } from 'react';
import './OverviewCards.css';

const OverviewCard = () => {

  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    const updateProjectCount = () => {
      const storedProjects =
        JSON.parse(sessionStorage.getItem('projects')) || [];

      setProjectCount(storedProjects.length);
    };

    updateProjectCount();

    window.addEventListener(
      'projectsUpdated',
      updateProjectCount
    );

    return () => {
      window.removeEventListener(
        'projectsUpdated',
        updateProjectCount
      );
    };
  }, []);


  return (
    <section className='overview-cards'>

      <div className='overview-card'>
        <div className='card-header'>
          <span>Active Incidents</span>
          <span className='card-icon'>!</span>
        </div>

        <h2>3</h2>

        <p className='card-warning'>2 require attention</p>
      </div>

      <div className='overview-card'>
        <div className='card-header'>
          <span>Services</span>
          <span className='card-icon'>◉</span>
        </div>

        <h3>{projectCount}</h3>
        <p>Projects</p>

        <p className='card-success'>All systems operational</p>
      </div>

      <div className='overview-card'>
        <div className='card-header'>
          <span>Deployment</span>
          <span className='card-icon'>↗</span>
        </div>

        <h2>24</h2>

        <p>Last 7 days</p>
      </div>


      <div className='overview-card'>
        <div className='card-header'>
          <span>System Health</span>
          <span className='card-icon'>♥</span>
        </div>

        <h2>98.7%</h2>

        <p className='card-success'>+1.2% from last week</p>
      </div>

    </section>
  )
}

export default OverviewCard

