import { useState, useEffect } from 'react';
import { ServiceData, UseServiceResult } from '@/types/service';
import axios from 'axios';
import { getServices } from '@/services/hotelService';
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function useService(): UseServiceResult {
  const [data, setData] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getServices();
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
