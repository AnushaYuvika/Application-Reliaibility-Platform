import './Evidence.css';

const Evidence = ({ investigation }) => {

  const evidenceAvailable = Boolean(
    investigation?.evidence
  );

  return (
    <section className="evidence-section">

      <div className="evidence-header">

        <div>
          <p className="section-label">
            EVIDENCE
          </p>

          <h2>
            Collected Evidence
          </h2>
        </div>

        <span className="evidence-count">
          {evidenceAvailable ? '4 Sources' : 'No Evidence'}
        </span>

      </div>

      <div className="evidence-list">

        <div className="evidence-row">

          <div className="evidence-info">

            <div className="evidence-icon">
              ▤
            </div>

            <div>

              <h3>
                Application Logs
              </h3>

              <p>
                Error and warning logs from the affected service.
              </p>

            </div>

          </div>

          <span
            className={
              evidenceAvailable
                ? 'evidence-collected'
                : 'evidence-pending'
            }
          >
            {evidenceAvailable ? 'Collected' : 'Pending'}
          </span>

        </div>

        <div className="evidence-row">

          <div className="evidence-info">

            <div className="evidence-icon">
              ◒
            </div>

            <div>

              <h3>
                System Metrics
              </h3>

              <p>
                CPU, memory, request rate, and response time metrics.
              </p>

            </div>

          </div>

          <span
            className={
              evidenceAvailable
                ? 'evidence-collected'
                : 'evidence-pending'
            }
          >
            {evidenceAvailable ? 'Collected' : 'Pending'}
          </span>

        </div>

        <div className="evidence-row">

          <div className="evidence-info">

            <div className="evidence-icon">
              ↗
            </div>

            <div>

              <h3>
                Recent Deployments
              </h3>

              <p>
                Deployment activity before the incident occurred.
              </p>

            </div>

          </div>

          <span
            className={
              evidenceAvailable
                ? 'evidence-collected'
                : 'evidence-pending'
            }
          >
            {evidenceAvailable ? 'Collected' : 'Pending'}
          </span>

        </div>

        <div className="evidence-row">

          <div className="evidence-info">

            <div className="evidence-icon">
              ◇
            </div>

            <div>

              <h3>
                Service Dependencies
              </h3>

              <p>
                Dependencies connected to the affected service.
              </p>

            </div>

          </div>

          <span
            className={
              evidenceAvailable
                ? 'evidence-collected'
                : 'evidence-pending'
            }
          >
            {evidenceAvailable ? 'Collected' : 'Pending'}
          </span>

        </div>

      </div>

    </section>
  );
};

export default Evidence;