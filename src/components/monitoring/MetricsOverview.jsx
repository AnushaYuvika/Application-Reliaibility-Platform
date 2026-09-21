import './MetricsOverview.css';

const MetricsOverview = () => {
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


      <div className="metrics-grid">

        <div className="metric-card">
          <p>CPU Usage</p>
          <h3>42%</h3>

          <div className="metric-bar">
            <span style={{ width: '42%' }}></span>
          </div>

          <small>Normal</small>
        </div>


        <div className="metric-card">
          <p>Memory Usage</p>
          <h3>68%</h3>

          <div className="metric-bar">
            <span style={{ width: '68%' }}></span>
          </div>

          <small>Within limits</small>
        </div>


        <div className="metric-card">
          <p>Request Rate</p>
          <h3>1,284</h3>

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
          <h3>184 ms</h3>

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

    </section>
  );
};

export default MetricsOverview;