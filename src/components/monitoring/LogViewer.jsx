import './LogViewer.css';

const LogViewer = () => {
  return (
    <section className="log-viewer">

      <div className="log-header">

        <div>
          <p className="section-label">APPLICATION LOGS</p>
          <h2>Live Logs</h2>
        </div>

        <div className="log-controls">
          <span className="live-indicator">
            ● Live
          </span>

          <select defaultValue="all">
            <option value="all">All Levels</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>

      </div>


      <div className="log-terminal">

        <div className="log-row">
          <span className="log-time">21:04:12</span>
          <span className="log-level info">INFO</span>
          <span className="log-message">
            Application started successfully
          </span>
        </div>


        <div className="log-row">
          <span className="log-time">21:04:18</span>
          <span className="log-level info">INFO</span>
          <span className="log-message">
            Connected to database
          </span>
        </div>


        <div className="log-row">
          <span className="log-time">21:05:03</span>
          <span className="log-level warning">WARN</span>
          <span className="log-message">
            Database response time exceeded threshold
          </span>
        </div>


        <div className="log-row">
          <span className="log-time">21:05:17</span>
          <span className="log-level error">ERROR</span>
          <span className="log-message">
            API request failed with status 500
          </span>
        </div>


        <div className="log-row">
          <span className="log-time">21:05:21</span>
          <span className="log-level info">INFO</span>
          <span className="log-message">
            Retry attempt started
          </span>
        </div>

      </div>

    </section>
  );
};

export default LogViewer;