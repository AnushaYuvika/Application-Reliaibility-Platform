
import './Remediation.css';

const Remediation = ({ response }) => {
  const remediation =
    response?.remediation ||
    'No remediation steps available yet.';

  const remediationSteps =
    Array.isArray(remediation)
      ? remediation
      : [remediation];

  return (
    <section className="remediation-section">

      <div className="remediation-header">

        <div>
          <p className="section-label">
            REMEDIATION
          </p>

          <h2>
            Proposed Changes
          </h2>
        </div>

      </div>

      <div className="remediation-list">

        {remediationSteps.map((step, index) => (

          <div
            className="remediation-item"
            key={index}
          >

            <span className="remediation-number">
              {String(index + 1).padStart(2, '0')}
            </span>

            <div>

              <h3>
                {typeof step === 'string'
                  ? step
                  : step?.title ||
                    step?.action ||
                    'Proposed remediation'}
              </h3>

              {typeof step !== 'string' &&
                step?.description && (
                  <p>
                    {step.description}
                  </p>
                )}

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Remediation;

