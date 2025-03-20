/**
 * API Service for handling data fetching with consistent error handling
 */

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

class ApiService {
  private baseUrl: string;
  
  constructor(baseUrl = '/api') {
    this.baseUrl = baseUrl;
  }
  
  /**
   * Generic fetch function with error handling and timeout
   */
  private async fetcher<T>(
    url: string, 
    options?: RequestInit,
    timeout = 10000
  ): Promise<ApiResponse<T>> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(`${this.baseUrl}${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
        return {
          data: null,
          error: errorData.message || `Error ${response.status}: ${response.statusText}`,
          loading: false,
        };
      }
      
      const data = await response.json();
      return { data, error: null, loading: false };
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Unknown error occurred';
      
      return { 
        data: null, 
        error: errorMessage,
        loading: false,
      };
    }
  }
  
  /**
   * HTTP GET request
   */
  async get<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.fetcher<T>(url, { ...options, method: 'GET' });
  }
  
  /**
   * HTTP POST request
   */
  async post<T>(url: string, data: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.fetcher<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  
  /**
   * HTTP PUT request
   */
  async put<T>(url: string, data: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.fetcher<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
  
  /**
   * HTTP PATCH request
   */
  async patch<T>(url: string, data: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.fetcher<T>(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
  
  /**
   * HTTP DELETE request
   */
  async delete<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.fetcher<T>(url, { ...options, method: 'DELETE' });
  }
}

// Create and export a singleton instance
export const apiService = new ApiService();

// Export the class for testing or custom instances
export default ApiService; 