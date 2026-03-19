import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';

const useFetch = (apiFunc, immediate = true, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  // Use a ref to store the latest apiFunc to avoid infinite loops with inline functions
  const apiFuncRef = useRef(apiFunc);
  useEffect(() => {
    apiFuncRef.current = apiFunc;
  }, [apiFunc]);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFuncRef.current(...args);
      setData(result);
      return result;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Something went wrong';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { data, loading, error, execute, setData };
};

export default useFetch;
