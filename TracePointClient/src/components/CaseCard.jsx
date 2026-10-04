import { Link } from 'react-router-dom';

// Displays one case: name, status, description and buttons to continue.
// NOTE: Person 4 (React Components/UI) owns this component and may restyle it.
// Props: caseItem = { caseID, caseName, description, status }
export default function CaseCard({ caseItem }) {
  const { caseName, description, status } = caseItem;

  return (
    <article className="card card--case">
      <h1 className="card__title">{caseName}</h1>
      <p className="case-status">
        Status:{' '}
        <span className={`badge badge--${String(status).toLowerCase()}`}>
          {String(status).toUpperCase()}
        </span>
      </p>
      <p className="card__text">{description}</p>
      <div className="button-row">
        <Link to="/suspects" className="btn btn--primary">
          View Suspects
        </Link>
        <Link to="/evidence" className="btn btn--primary">
          View Evidence
        </Link>
      </div>
    </article>
  );
}
