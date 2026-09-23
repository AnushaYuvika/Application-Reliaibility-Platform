import { useEffect, useState } from 'react';
import './LogViewer.css';
import API_BASE_URL from '../../api/api';

const LogViewer = ({ project }) => {
  const [logs, setLogs] = useState([]);
  const [level, setLevel] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      if (!project?._id) {
        setLogs([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');

        const response = await fetch(
          `${API_BASE_URL}/logs?project=${project._id}&level=${level}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message || 'Failed to fetch logs.'
          );
          return;
        }

        setLogs(data.logs || []);

      } catch (error) {
        setError(
          'Unable to connect to the server.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [project, level]);

  return (
    <section className="log-viewer">

      <div className="log-header">

        <div>
          <p className="section-label">
            APPLICATION LOGS
          </p>

          <h2>Live Logs</h2>
        </div>

        <div className="log-controls">

          <span className="live-indicator">
            ● Live
          </span>

          <select
            value={level}
            onChange={(event) =>
              setLevel(event.target.value)
            }
          >
            <option value="all">
              All Levels
            </option>

            <option value="info">
              Info
            </option>

            <option value="warning">
              Warning
            </option>

            <option value="error">
              Error
            </option>

            <option value="critical">
              Critical
            </option>
          </select>

        </div>

      </div>


      <div className="log-terminal">

        {loading && (
          <div className="log-row">
            <span className="log-message">
              Loading logs...
            </span>
          </div>
        )}


        {!loading && error && (
          <div className="log-row">
            <span className="log-message">
              {error}
            </span>
          </div>
        )}


        {!loading &&
          !error &&
          logs.length === 0 && (
            <div className="log-row">
              <span className="log-message">
                No logs available for this project.
              </span>
            </div>
          )}


        {!loading &&
          !error &&
          logs.map((log) => (

            <div
              className="log-row"
              key={log._id}
            >

              <span className="log-time">
                {new Date(
                  log.timestamp || log.createdAt
                ).toLocaleTimeString()}
              </span>

              <span
                className={`log-level ${log.level}`}
              >
                {log.level.toUpperCase()}
              </span>

              <span className="log-message">
                {log.message}
              </span>

            </div>

          ))}

      </div>

    </section>
  );
};

export default LogViewer;