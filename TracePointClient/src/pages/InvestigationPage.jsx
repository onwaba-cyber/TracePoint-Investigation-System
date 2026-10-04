import { Link } from 'react-router-dom';
import { useInvestigation } from '../context/InvestigationContext.jsx';

// PLACEHOLDER - the Submit Investigation page (Parts L and M) is built by Person 4
// (InvestigationForm) and Person 5 (POST to the API). The route /investigation already
// exists; the suspect chosen on the Suspects page is available from useInvestigation().
export default function InvestigationPage() {
  const { selectedSuspect } = useInvestigation();

  return (
    <section>
      <h1 className="page__title">Submit Investigation</h1>
      {selectedSuspect ? (
        <p className="page__intro">
          Selected suspect: <strong>{selectedSuspect.name}</strong>
        </p>
      ) : (
        <p className="page__intro">
          No suspect selected yet. <Link to="/suspects">Go to the suspects page</Link> to choose one.
        </p>
      )}
      <p className="status">The investigation form is coming soon.</p>
    </section>
  );
}
