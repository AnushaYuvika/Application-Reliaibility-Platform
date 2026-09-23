import './ImpactAnalysis.css';

const ImpactAnalysis = ({ investigation }) => {

  const impactAvailable = Boolean(
    investigation?.impact
  );

  return (
    <section className="impact-analysis">

      <div className="impact-analysis-header">

        <div>
          <p className="section-label">
            IMPACT ANALYSIS
          </p>

          <h2>
            Incident Impact
          </h2>
        </div>

        <span className="impact-status">
          {impactAvailable
            ? 'Analysis Complete'
            : 'Under Analysis'}
        </span>

      </div>

      <div className="impact-summary">

        <div className="impact-item">
          <span className="impact-label">
            Affected Service
          </span>

          <strong>
            {investigation?.incident?.title || 'Incident Service'}
          </strong>

          <p>
            Primary service affected by the incident
          </p>
        </div>

        <div className="impact-item">
          <span className="impact-label">
            Request Impact
          </span>

          <strong>
            {impactAvailable
              ? 'Identified'
              : 'Under Analysis'}
          </strong>

          <p>
            Impact identified during the investigation
          </p>
        </div>

        <div className="impact-item">
          <span className="impact-label">
            Customer Impact
          </span>

          <strong>
            {impactAvailable
              ? 'Potential'
              : 'Unknown'}
          </strong>

          <p>
            Customer impact based on available investigation data
          </p>
        </div>

        <div className="impact-item">
          <span className="impact-label">
            Dependency Impact
          </span>

          <strong>
            {impactAvailable
              ? 'Identified'
              : 'Under Analysis'}
          </strong>

          <p>
            Dependency impact based on investigation evidence
          </p>
        </div>

      </div>

      <div className="impact-note">

        <span>
          Impact Assessment
        </span>

        <p>
          {impactAvailable
            ? investigation.impact
            : 'Impact analysis will appear here once the investigation data is available.'}
        </p>

      </div>

    </section>
  );
};

export default ImpactAnalysis;