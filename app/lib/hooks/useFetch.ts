import { useState, useEffect, useCallback } from 'react';
import { apiService, ApiResponse } from '@/app/lib/api/apiService';

interface UseFetchOptions<T, P = any> {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: P;
  headers?: HeadersInit;
  immediate?: boolean;
  dependencies?: any[];
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

/**
 * Custom hook for data fetching with our API service
 */
export function useFetch<T, P = any>({
  url,
  method = 'GET',
  body,
  headers,
  immediate = true,
  dependencies = [],
  onSuccess,
  onError,
}: UseFetchOptions<T, P>): {
  data: T | null;
  error: string | null;
  loading: boolean;
  fetch: (body?: P) => Promise<ApiResponse<T>>;
} {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);

  const fetchData = useCallback(async (overrideBody?: P): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);

    let response: ApiResponse<T>;

    try {
      const options = {
        headers,
      };

      switch (method) {
        case 'GET':
          response = await apiService.get<T>(url, options);
          break;
        case 'POST':
          response = await apiService.post<T>(url, overrideBody || body, options);
          break;
        case 'PUT':
          response = await apiService.put<T>(url, overrideBody || body, options);
          break;
        case 'PATCH':
          response = await apiService.patch<T>(url, overrideBody || body, options);
          break;
        case 'DELETE':
          response = await apiService.delete<T>(url, options);
          break;
        default:
          response = await apiService.get<T>(url, options);
      }

      if (response.error) {
        setError(response.error);
        onError?.(response.error);
      } else if (response.data) {
        setData(response.data);
        onSuccess?.(response.data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      onError?.(errorMessage);
      response = { data: null, error: errorMessage, loading: false };
    } finally {
      setLoading(false);
    }

    return response;
  }, [url, method, body, headers, onSuccess, onError]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate, fetchData, ...dependencies]);

  return { data, error, loading, fetch: fetchData };
}
