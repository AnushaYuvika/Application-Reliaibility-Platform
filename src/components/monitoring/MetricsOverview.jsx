import { useEffect, useState } from 'react';
import './MetricsOverview.css';
import API_BASE_URL from '../../api/api';

const MetricsOverview = ({ project }) => {
  const [metric, setMetric] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLatestMetric = async () => {
      if (!project?._id) {
        setMetric(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');

        const response = await fetch(
          `${API_BASE_URL}/metrics/latest?project=${project._id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Failed to fetch metrics.');
          setMetric(null);
          return;
        }

        setMetric(data.metric);
      } catch (error) {
        setError('Unable to connect to the server.');
        setMetric(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestMetric();
  }, [project]);

  return (
    <section className="metrics-overview">

      <div className="metrics-header">
        <div>
          <p className="section-label">SYSTEM METRICS</p>
          <h2>Performance</h2>
        </div>

        <select defaultValue="24h">
          <option value="1h">Last 1 hour</option>
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
        </select>
      </div>

      {loading && (
        <div className="metric-card">
          <p>System Metrics</p>
          <h3>Loading...</h3>
        </div>
      )}

      {!loading && error && (
        <div className="metric-card">
          <p>System Metrics</p>
          <h3>{error}</h3>
        </div>
      )}

      {!loading && !error && !metric && (
        <div className="metric-card">
          <p>System Metrics</p>
          <h3>No metrics available</h3>
          <small>Create a metric for this project to display data.</small>
        </div>
      )}

      {!loading && !error && metric && (
        <div className="metrics-grid">

          <div className="metric-card">
            <p>CPU Usage</p>
            <h3>{metric.cpuUsage}%</h3>

            <div className="metric-bar">
              <span
                style={{
                  width: `${metric.cpuUsage}%`,
                }}
              ></span>
            </div>

            <small>
              {metric.cpuUsage < 70 ? 'Normal' : 'High usage'}
            </small>
          </div>

          <div className="metric-card">
            <p>Memory Usage</p>
            <h3>{metric.memoryUsage}%</h3>

            <div className="metric-bar">
              <span
                style={{
                  width: `${metric.memoryUsage}%`,
                }}
              ></span>
            </div>

            <small>
              {metric.memoryUsage < 80
                ? 'Within limits'
                : 'High usage'}
            </small>
          </div>

          <div className="metric-card">
            <p>Request Rate</p>
            <h3>{metric.requestRate}</h3>

            <div className="metric-chart">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <small>Requests / min</small>
          </div>

          <div className="metric-card">
            <p>Response Time</p>
            <h3>{metric.responseTime} ms</h3>

            <div className="metric-chart">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <small>Average latency</small>
          </div>

        </div>
      )}

    </section>
  );
};

export default MetricsOverview;