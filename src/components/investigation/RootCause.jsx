import './RootCause.css';

const RootCause = ({ investigation }) => {

  const rootCauseAvailable = Boolean(
    investigation?.rootCause
  );

  const confidence = investigation?.confidence ?? 0;

  return (
    <section className="root-cause-section">

      <div className="root-cause-header">

        <div>
          <p className="section-label">
            ROOT CAUSE ANALYSIS
          </p>

          <h2>
            Probable Root Cause
          </h2>
        </div>

        <span className="analysis-status">
          {rootCauseAvailable
            ? 'Analysis Complete'
            : 'Analysis Pending'}
        </span>

      </div>

      <div className="root-cause-content">

        <div className="root-cause-main">

          <div className="root-cause-icon">
            AI
          </div>

          <div>

            <h3>
              {rootCauseAvailable
                ? investigation.rootCause
                : 'No root cause identified yet'}
            </h3>

            <p>
              {rootCauseAvailable
                ? 'The investigation identified this as the probable root cause of the incident.'
                : 'Root cause analysis will appear here once the investigation is completed.'}
            </p>

          </div>

        </div>

        <div className="confidence-section">

          <div className="confidence-header">

            <span>
              Analysis Confidence
            </span>

            <strong>
              {confidence}%
            </strong>

          </div>

          <div className="confidence-bar">

            <span
              style={{
                width: `${confidence}%`
              }}
            ></span>

          </div>

        </div>

        <div className="root-cause-evidence">

          <p className="section-label">
            INVESTIGATION STATUS
          </p>

          <div className="cause-evidence-item">

            <span>
              Investigation status
            </span>

            <strong>
              {investigation?.status || 'Pending'}
            </strong>

          </div>

          <div className="cause-evidence-item">

            <span>
              Evidence available
            </span>

            <strong>
              {investigation?.evidence
                ? 'Available'
                : 'Pending'}
            </strong>

          </div>

          <div className="cause-evidence-item">

            <span>
              Confidence score
            </span>

            <strong>
              {confidence}%
            </strong>

          </div>

        </div>

      </div>

    </section>
  );
};

export default RootCause;