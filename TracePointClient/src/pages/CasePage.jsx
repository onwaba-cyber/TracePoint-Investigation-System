import CaseCard from '../components/CaseCard.jsx';
import StatusMessage from '../components/StatusMessage.jsx';
import useApiData from '../hooks/useApiData.js';
import { getCase } from '../services/api.js';

// Loads the case from GET /api/cases/{id} and displays it.
const loadCase = () => getCase();

export default function CasePage() {
  const { data: caseItem, loading, error, reload } = useApiData(loadCase);

  return (
    <section>
      <StatusMessage
        loading={loading}
        error={error}
        onRetry={reload}
        loadingText="Loading case..."
      />
      {caseItem && <CaseCard caseItem={caseItem} />}
    </section>
  );
}
