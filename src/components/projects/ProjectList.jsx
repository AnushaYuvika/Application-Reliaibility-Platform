import { useEffect, useState } from 'react';
import './ProjectList.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../api/api';

const ProjectList = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_BASE_URL}/projects`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Failed to fetch projects.');
          return;
        }

        setProjects(data.projects);

      } catch (error) {
        setError('Unable to connect to the server.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="project-empty-state">
        <div className="project-empty-icon">◉</div>

        <h3>Loading projects...</h3>

        <p>
          Fetching your projects from the reliability platform.
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="project-empty-state">
        <div className="project-empty-icon">!</div>

        <h3>Unable to load projects</h3>

        <p>{error}</p>
      </section>
    );
  }

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
          key={project._id}
          onClick={() => {
            sessionStorage.setItem(
              'selectedProjectId',
              project._id
            );

            navigate(`/projects/${project._id}`);
          }}
        >
          <div className="project-card-top">
            <div className="project-icon">◉</div>

            <span className="project-status">
              {project.status}
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