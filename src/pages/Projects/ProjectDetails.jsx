import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    repository: '',
    environment: 'production',
  });

  useEffect(() => {
    const storedProjects =
      JSON.parse(sessionStorage.getItem('projects')) || [];

    const selectedProject = storedProjects.find(
      (item) => item.id === Number(id)
    );

    if (selectedProject) {
      setProject(selectedProject);

      setFormData({
        name: selectedProject.name,
        repository: selectedProject.repository,
        environment: selectedProject.environment,
      });
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    const storedProjects =
      JSON.parse(sessionStorage.getItem('projects')) || [];

    const updatedProjects = storedProjects.map((item) =>
      item.id === Number(id)
        ? {
            ...item,
            name: formData.name,
            repository: formData.repository,
            environment: formData.environment,
          }
        : item
    );

    sessionStorage.setItem(
      'projects',
      JSON.stringify(updatedProjects)
    );

    setProject({
      ...project,
      name: formData.name,
      repository: formData.repository,
      environment: formData.environment,
    });

    setIsEditing(false);
  };

  const handleDelete = () => {
    const storedProjects =
      JSON.parse(sessionStorage.getItem('projects')) || [];

    const updatedProjects = storedProjects.filter(
      (item) => item.id !== Number(id)
    );

    sessionStorage.setItem(
      'projects',
      JSON.stringify(updatedProjects)
    );

    navigate('/projects');
  };

  if (!project) {
    return (
      <main className="project-details-page">
        <div className="project-details-container">
          <h1>Project Not Found</h1>

          <button
            className="back-project-btn"
            onClick={() => navigate('/projects')}
          >
            Back to Projects
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="project-details-page">
      <div className="project-details-container">

        <button
          className="back-project-btn"
          onClick={() => navigate('/projects')}
        >
          ← Back to Projects
        </button>

        <header className="project-details-header">
          <div>
            <p className="project-details-eyebrow">
              PROJECT
            </p>

            <h1>{project.name}</h1>

            <p>
              {project.environment} environment
            </p>
          </div>

          <div className="project-details-actions">
            <span className="project-details-status">
              Operational
            </span>

            <button
              className="monitor-project-btn"
              onClick={() => {
                sessionStorage.setItem(
                  'selectedProjectId',
                  project.id
                );

                navigate('/monitoring');
              }}
            >
              Open Monitoring
            </button>

            <button
              className="edit-project-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Project
            </button>

            <button
              className="delete-project-btn"
              onClick={handleDelete}
            >
              Delete Project
            </button>
          </div>
        </header>

        {isEditing && (
          <form
            className="project-edit-form"
            onSubmit={handleUpdate}
          >
            <h2>Edit Project</h2>

            <div className="project-edit-field">
              <label>Project Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="project-edit-field">
              <label>Repository</label>

              <input
                type="url"
                name="repository"
                value={formData.repository}
                onChange={handleChange}
                required
              />
            </div>

            <div className="project-edit-field">
              <label>Environment</label>

              <select
                name="environment"
                value={formData.environment}
                onChange={handleChange}
              >
                <option value="production">
                  Production
                </option>

                <option value="staging">
                  Staging
                </option>

                <option value="development">
                  Development
                </option>
              </select>
            </div>

            <div className="project-edit-actions">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>

              <button type="submit">
                Save Changes
              </button>
            </div>
          </form>
        )}

        <section className="project-info-grid">

          <div className="project-info-card">
            <span>Environment</span>
            <strong>{project.environment}</strong>
          </div>

          <div className="project-info-card">
            <span>Repository</span>
            <strong>{project.repository}</strong>
          </div>

          <div className="project-info-card">
            <span>Services</span>
            <strong>0</strong>
          </div>

          <div className="project-info-card">
            <span>Uptime</span>
            <strong>--</strong>
          </div>

        </section>

      </div>
    </main>
  );
};

export default ProjectDetails;