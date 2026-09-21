import { useEffect, useState } from 'react';
import './ProjectList.css';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const storedProjects =
      JSON.parse(sessionStorage.getItem('projects')) || [];

    setProjects(storedProjects);
  }, []);

  if (projects.length === 0) {
    return (
      <section className="project-empty-state">
        <div className="project-empty-icon">◉</div>

        <h3>No projects yet</h3>

        <p>
          Create a project to start monitoring your
          applications and services.
        </p>
      </section>
    );
  }


  return (
    <section className="project-list">
      {projects.map((project) => (
        <div
          className="project-card"
          key={project.id}
          onClick={() => {
            sessionStorage.setItem(
              'selectedProjectId',
              project.id
            );

            navigate(`/projects/${project.id}`);
          }}
        >
          <div className="project-card-top">
            <div className="project-icon">◉</div>

            <span className="project-status">
              Operational
            </span>
          </div>

          <h3>{project.name}</h3>

          <p>
            {project.environment} environment
          </p>

          <div className="project-details">
            <span>Repository connected</span>
            <span>{project.environment}</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProjectList;