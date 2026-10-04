import SuspectCard from './SuspectCard.jsx';

// Parent component: passes each suspect down to a SuspectCard through props (Part P).
//   suspects          = array of suspects from the API
//   selectedSuspectId = SuspectID of the selected suspect (or null)
//   onSelect          = function called with the suspect that was chosen
export default function SuspectList({ suspects, selectedSuspectId, onSelect }) {
  if (!suspects.length) {
    return <p className="status">No suspects have been recorded for this case.</p>;
  }

  return (
    <ul className="card-grid">
      {suspects.map((suspect) => (
        <li key={suspect.suspectID}>
          <SuspectCard
            suspect={suspect}
            isSelected={suspect.suspectID === selectedSuspectId}
            onSelect={onSelect}
          />
        </li>
      ))}
    </ul>
  );
}
