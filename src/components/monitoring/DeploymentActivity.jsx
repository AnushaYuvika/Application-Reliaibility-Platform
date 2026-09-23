// import './DeploymentActivity.css';

// const DeploymentActivity = () => {
//   return (
//     <section className="deployment-activity">

//       <div className="deployment-header">
//         <div>
//           <p className="section-label">DEPLOYMENTS</p>
//           <h2>Recent Deployments</h2>
//         </div>

//         <span className="deployment-count">
//           24 deployments
//         </span>
//       </div>


//       <div className="deployment-list">

//         <div className="deployment-row">

//           <div className="deployment-info">

//             <div className="deployment-icon success">
//               ✓
//             </div>

//             <div>
//               <h3>v2.4.1</h3>
//               <p>Payment Service · main</p>
//             </div>

//           </div>

//           <div className="deployment-meta">
//             <span className="deployment-success">
//               Successful
//             </span>

//             <span>18 min ago</span>
//           </div>

//         </div>


//         <div className="deployment-row">

//           <div className="deployment-info">

//             <div className="deployment-icon success">
//               ✓
//             </div>

//             <div>
//               <h3>v1.8.3</h3>
//               <p>Commerce API · main</p>
//             </div>

//           </div>

//           <div className="deployment-meta">
//             <span className="deployment-success">
//               Successful
//             </span>

//             <span>1 hour ago</span>
//           </div>

//         </div>


//         <div className="deployment-row">

//           <div className="deployment-info">

//             <div className="deployment-icon failed">
//               !
//             </div>

//             <div>
//               <h3>v3.1.0</h3>
//               <p>Analytics Platform · develop</p>
//             </div>

//           </div>

//           <div className="deployment-meta">
//             <span className="deployment-failed">
//               Failed
//             </span>

//             <span>3 hours ago</span>
//           </div>

//         </div>

//       </div>

//     </section>
//   );
// };

// export default DeploymentActivity;


import { useEffect, useState } from 'react';
import './DeploymentActivity.css';
import API_BASE_URL from '../../api/api';

const DeploymentActivity = ({ project }) => {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDeployments = async () => {
      if (!project?._id) {
        setDeployments([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');

        const response = await fetch(
          `${API_BASE_URL}/deployments?project=${project._id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message || 'Failed to fetch deployments.'
          );
          setDeployments([]);
          return;
        }

        setDeployments(data.deployments || []);
      } catch (error) {
        setError('Unable to connect to the server.');
        setDeployments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDeployments();
  }, [project]);

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const deploymentTime = new Date(timestamp);

    const difference =
      Math.floor((now - deploymentTime) / 1000);

    if (difference < 60) {
      return `${difference}s ago`;
    }

    const minutes = Math.floor(difference / 60);

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }

    const days = Math.floor(hours / 24);

    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  return (
    <section className="deployment-activity">

      <div className="deployment-header">
        <div>
          <p className="section-label">DEPLOYMENTS</p>
          <h2>Recent Deployments</h2>
        </div>

        <span className="deployment-count">
          {deployments.length} deployments
        </span>
      </div>

      {loading && (
        <div className="deployment-list">
          <div className="deployment-row">
            <div className="deployment-info">
              <div>
                <p>Loading deployments...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="deployment-list">
          <div className="deployment-row">
            <div className="deployment-info">
              <div>
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading &&
        !error &&
        deployments.length === 0 && (
          <div className="deployment-list">
            <div className="deployment-row">
              <div className="deployment-info">
                <div>
                  <p>No deployments available for this project.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      {!loading &&
        !error &&
        deployments.map((deployment) => (
          <div
            className="deployment-list"
            key={deployment._id}
          >
            <div className="deployment-row">

              <div className="deployment-info">

                <div
                  className={`deployment-icon ${
                    deployment.status === 'success'
                      ? 'success'
                      : deployment.status === 'failed'
                      ? 'failed'
                      : ''
                  }`}
                >
                  {deployment.status === 'success'
                    ? '✓'
                    : deployment.status === 'failed'
                    ? '!'
                    : '…'}
                </div>

                <div>
                  <h3>{deployment.version}</h3>

                  <p>
                    {deployment.project?.name ||
                      'Unknown Project'}{' '}
                    · {deployment.environment}
                  </p>
                </div>

              </div>

              <div className="deployment-meta">

                <span
                  className={
                    deployment.status === 'success'
                      ? 'deployment-success'
                      : deployment.status === 'failed'
                      ? 'deployment-failed'
                      : ''
                  }
                >
                  {deployment.status === 'success'
                    ? 'Successful'
                    : deployment.status === 'failed'
                    ? 'Failed'
                    : 'In Progress'}
                </span>

                <span>
                  {getTimeAgo(
                    deployment.timestamp ||
                      deployment.createdAt
                  )}
                </span>

              </div>

            </div>
          </div>
        ))}
    </section>
  );
};

export default DeploymentActivity;

