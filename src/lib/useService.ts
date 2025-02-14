import { useState, useEffect } from 'react';
import { ServiceData, UseServiceResult } from '@/types/service';
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
const POPULATE_ALL = import.meta.env.VITE_POPULATE_ALL;

function useService(): UseServiceResult {
  const [data, setData] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/services${POPULATE_ALL}`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setData(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export default useService;
