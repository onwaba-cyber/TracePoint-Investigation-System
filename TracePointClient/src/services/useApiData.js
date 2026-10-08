import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to handle API fetching lifecycle.
 * @param {Function} fetcher - An async function that returns data (e.g., getCase())
 * @returns {Object} { data, loading, error, reload }
 */
export default function useApiData(fetcher) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize the fetch execution to prevent infinite loops
  const executeFetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  return { data, loading, error, reload: executeFetch };
}
