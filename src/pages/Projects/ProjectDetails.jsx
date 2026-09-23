import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectDetails.css';
import API_BASE_URL from '../../api/api';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    repository: '',
    environment: 'production',
  });

  // Fetch project from backend
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(
          `${API_BASE_URL}/projects/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Failed to fetch project.');
          return;
        }

        setProject(data.project);

        setFormData({
          name: data.project.name,
          repository: data.project.repository,
          environment: data.project.environment,
        });

      } catch (error) {
        setError('Unable to connect to the server.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Update project
  const handleUpdate = async (event) => {
    event.preventDefault();

    setError('');

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        `${API_BASE_URL}/projects/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            repository: formData.repository.trim(),
            environment: formData.environment,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to update project.');
        return;
      }

      setProject(data.project);

      setFormData({
        name: data.project.name,
        repository: data.project.repository,
        environment: data.project.environment,
      });

      setIsEditing(false);

    } catch (error) {
      setError('Unable to connect to the server.');
    }
  };

  // Delete project
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this project?'
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        `${API_BASE_URL}/projects/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to delete project.');
        return;
      }

      sessionStorage.removeItem('selectedProjectId');

      navigate('/projects');

    } catch (error) {
      setError('Unable to connect to the server.');
    }
  };

  if (loading) {
    return (
      <main className="project-details-page">
        <div className="project-details-container">
          <h1>Loading Project...</h1>
        </div>
      </main>
    );
  }

  if (error && !project) {
    return (
      <main className="project-details-page">
        <div className="project-details-container">
          <h1>Unable to Load Project</h1>

          <p>{error}</p>

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
              {project.status}
            </span>

            <button
              className="monitor-project-btn"
              onClick={() => {
                sessionStorage.setItem(
                  'selectedProjectId',
                  project._id
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

        {error && (
          <p className="project-form-error">
            {error}
          </p>
        )}

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