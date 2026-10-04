import { Link } from 'react-router-dom';
import StatusMessage from '../components/StatusMessage.jsx';
import SuspectList from '../components/SuspectList.jsx';
import { useInvestigation } from '../context/InvestigationContext.jsx';
import useApiData from '../hooks/useApiData.js';
import { getSuspects } from '../services/api.js';

// Loads all suspects from GET /api/suspects. The selected suspect is kept in React state.
export default function SuspectsPage() {
  const { data: suspects, loading, error, reload } = useApiData(getSuspects);
  const { selectedSuspect, setSelectedSuspect } = useInvestigation();

  return (
    <section>
      <h1 className="page__title">Suspects</h1>
      <p className="page__intro">
        Three people had legitimate access to the laboratory. Review each suspect and select the
        one you believe is responsible.
      </p>

      <StatusMessage
        loading={loading}
        error={error}
        onRetry={reload}
        loadingText="Loading suspects..."
      />

      {selectedSuspect && (
        <div className="selection-banner" role="status">
          <p>
            Selected suspect: <strong>{selectedSuspect.name}</strong>
          </p>
          <Link to="/investigation" className="btn btn--primary">
            Submit Investigation
          </Link>
        </div>
      )}

      {suspects && (
        <SuspectList
          suspects={suspects}
          selectedSuspectId={selectedSuspect ? selectedSuspect.suspectID : null}
          onSelect={setSelectedSuspect}
        />
      )}
    </section>
  );
}
