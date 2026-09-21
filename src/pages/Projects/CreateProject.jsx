import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import './Projects.css';
import { useState } from 'react';

const CreateProject = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    repository: '',
    environment: 'production',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const existingProjects =
      JSON.parse(sessionStorage.getItem('projects')) || [];


    // 1. Duplicate name validation
    const projectExists = existingProjects.some(
      (project) =>
        project.name.trim().toLowerCase() ===
        formData.name.trim().toLowerCase()
    );

    if (projectExists) {
      setError('A project with this name already exists.');
      return;
    }


    // 2. Repository URL validation
    const repositoryPattern =
      /^https?:\/\/(www\.)?(github\.com|gitlab\.com|bitbucket\.org)\/.+/i;

    if (!repositoryPattern.test(formData.repository.trim())) {
      setError(
        'Please enter a valid GitHub, GitLab, or Bitbucket repository URL.'
      );
      return;
    }


    // 3. Create project
    const newProject = {
      id: Date.now(),
      name: formData.name.trim(),
      repository: formData.repository.trim(),
      environment: formData.environment,
    };

    const updatedProjects = [
      ...existingProjects,
      newProject,
    ];

    sessionStorage.setItem(
      'projects',
      JSON.stringify(updatedProjects)
    );

    navigate('/projects');
  };

  return (
    <div className="projects-layout">

      <Sidebar />

      <main className="projects-main">

        <header className="projects-topbar">

          <div>
            <p className="projects-eyebrow">
              PROJECTS
            </p>

            <h1>Create Project</h1>
          </div>

          <button
            className="create-project-btn"
            onClick={() => navigate('/projects')}
          >
            ← Back to Projects
          </button>

        </header>


        <section className="projects-content">

          <div className="project-form-card">

            <div className="project-form-header">
              <h2>Project Configuration</h2>

              <p>
                Provide the basic details of the application you want to monitor.
              </p>
            </div>


            <form className="project-form" 
              onSubmit={handleSubmit}
            >

              {error && (
                <p className="project-form-error">
                  {error}
                </p>
              )}

              <div className="project-form-group">
                <label>Project Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Payment Service"
                  required
                />
              </div>


              <div className="project-form-group">
                <label>Repository URL</label>

                <input
                  type="url"
                  name="repository"
                  value={formData.repository}
                  onChange={handleChange}
                  placeholder="https://github.com/username/project"
                  required
                />
              </div>


              <div className="project-form-group">
                <label>Environment</label>

                <select name="environment"
                  value={formData.environment}
                  onChange={handleChange}
                >
                  <option value="production">Production</option>
                  <option value="staging">Staging</option>
                  <option value="development">Development</option>
                </select>
              </div>


              <div className="project-form-actions">

                <button
                  type="button"
                  className="cancel-project-btn"
                  onClick={() => navigate('/projects')}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="create-project-submit"
                >
                  Create Project
                </button>

              </div>

            </form>

          </div>

        </section>

      </main>

    </div>
  );
};

export default CreateProject;