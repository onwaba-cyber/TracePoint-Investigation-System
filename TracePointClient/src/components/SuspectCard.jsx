// Displays ONE suspect. Everything arrives through props (Part P):
//   suspect    = { suspectID, name, occupation, description }
//   isSelected = true when this is the currently selected suspect
//   onSelect   = function called with the suspect when "Select Suspect" is clicked
// NOTE: Person 4 (React Components/UI) owns this component and may restyle it.
export default function SuspectCard({ suspect, isSelected, onSelect }) {
  return (
    <article className={isSelected ? 'card card--suspect card--selected' : 'card card--suspect'}>
      <h2 className="card__title">{suspect.name}</h2>
      <p className="card__subtitle">{suspect.occupation}</p>
      <p className="card__text">{suspect.description}</p>
      <button
        type="button"
        className={isSelected ? 'btn btn--selected' : 'btn btn--primary'}
        aria-pressed={isSelected}
        onClick={() => onSelect(suspect)}
      >
        {isSelected ? 'Selected \u2713' : 'Select Suspect'}
      </button>
    </article>
  );
}
