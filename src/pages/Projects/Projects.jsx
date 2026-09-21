import Sidebar from '../../components/dashboard/Sidebar';
import ProjectList from '../../components/projects/ProjectList';
import './Projects.css';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate();

  return (
    <div className="projects-layout">

      <Sidebar />

      <main className="projects-main">

        <header className="projects-topbar">
          <div>
            <p className="projects-eyebrow">PROJECTS</p>
            <h1>Projects</h1>
          </div>

          <button className="create-project-btn"
            onClick={() => navigate('/projects/create')}
          >
            + Create Project
          </button>
        </header>

        <section className="projects-content">

          <div className="projects-intro">
            <h2>Your Projects</h2>
            <p>
              Manage the applications and services monitored
              by your reliability platform.
            </p>
          </div>

          <ProjectList />

        </section>

      </main>

    </div>
  );
};

export default Projects;