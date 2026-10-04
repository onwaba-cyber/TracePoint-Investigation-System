// Shows a loading indicator or a meaningful error message (with a "Try again" button).
export default function StatusMessage({ loading, error, onRetry, loadingText = 'Loading...' }) {
  if (loading) {
    return (
      <p className="status status--loading" role="status">
        {loadingText}
      </p>
    );
  }

  if (error) {
    return (
      <div className="status status--error" role="alert">
        <p>{error}</p>
        {onRetry && (
          <button type="button" className="btn btn--secondary" onClick={onRetry}>
            Try again
          </button>
        )}
      </div>
    );
  }

  return null;
}
