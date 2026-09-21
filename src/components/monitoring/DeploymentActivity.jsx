import './DeploymentActivity.css';

const DeploymentActivity = () => {
  return (
    <section className="deployment-activity">

      <div className="deployment-header">
        <div>
          <p className="section-label">DEPLOYMENTS</p>
          <h2>Recent Deployments</h2>
        </div>

        <span className="deployment-count">
          24 deployments
        </span>
      </div>


      <div className="deployment-list">

        <div className="deployment-row">

          <div className="deployment-info">

            <div className="deployment-icon success">
              ✓
            </div>

            <div>
              <h3>v2.4.1</h3>
              <p>Payment Service · main</p>
            </div>

          </div>

          <div className="deployment-meta">
            <span className="deployment-success">
              Successful
            </span>

            <span>18 min ago</span>
          </div>

        </div>


        <div className="deployment-row">

          <div className="deployment-info">

            <div className="deployment-icon success">
              ✓
            </div>

            <div>
              <h3>v1.8.3</h3>
              <p>Commerce API · main</p>
            </div>

          </div>

          <div className="deployment-meta">
            <span className="deployment-success">
              Successful
            </span>

            <span>1 hour ago</span>
          </div>

        </div>


        <div className="deployment-row">

          <div className="deployment-info">

            <div className="deployment-icon failed">
              !
            </div>

            <div>
              <h3>v3.1.0</h3>
              <p>Analytics Platform · develop</p>
            </div>

          </div>

          <div className="deployment-meta">
            <span className="deployment-failed">
              Failed
            </span>

            <span>3 hours ago</span>
          </div>

        </div>

      </div>

    </section>
  );
};

export default DeploymentActivity;