
import './Recommendation.css';

const Recommendation = ({ response }) => {
  const recommendation =
    response?.recommendation ||
    'No recommendation available yet.';

  const reason =
    response?.recommendationReason ||
    'The platform has not generated supporting analysis yet.';

  return (
    <section className="recommendation-section">

      <div className="recommendation-header">

        <div>
          <p className="section-label">
            RECOMMENDATION
          </p>

          <h2>
            Recommended Action
          </h2>
        </div>

        <span className="recommendation-badge">
          {response ? 'Available' : 'Pending'}
        </span>

      </div>

      <div className="recommendation-content">

        <h3>
          {recommendation}
        </h3>

        <p>
          {response
            ? 'Review the recommended action before proceeding with remediation.'
            : 'A response record has not been created for this incident yet.'}
        </p>

      </div>

      <div className="recommendation-reason">

        <span>
          Why this action?
        </span>

        <p>
          {reason}
        </p>

      </div>

    </section>
  );
};

export default Recommendation;

