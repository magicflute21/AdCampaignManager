import { toast } from "sonner";

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const ENDPOINTS = {
  CAMPAIGNS: '/campaigns',
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private addQueryParams(url: string, params?: Record<string, string>): string {
    if (!params || Object.keys(params).length === 0) return url;

    const queryString = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    return `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
  }

  private async handleBadRequest(response: Response): Promise<never> {
    let errorMessage: string;

    try {
      const errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.error || 'An error occurred';
      } catch {
        errorMessage = response.statusText || 'An error occurred';
      }
    } catch {
      errorMessage = `HTTP error ${response.status}`;
    }

    toast.error(errorMessage);
    throw new Error(`API Error (${response.status}): ${errorMessage}`);
  }

  private handleError(error: unknown) {
    if (error instanceof Error && error.message.includes('API Error')) {
      throw error;
    }

    const errorMessage = error instanceof Error ? error.message : 'Network error';
    toast.error(`Failed to fetch data: ${errorMessage}`);
    throw new Error(`Network Error: ${errorMessage}`);
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = this.addQueryParams(`${this.baseUrl}${endpoint}`, params);

    console.log(url);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        this.handleBadRequest(response)
      }

      const data = await response.json();
      return data;
    } catch (error) {
      this.handleError(error)

      throw new Error("This will not be reached, just making ts happy")
    }
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    console.log('url', url);

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        this.handleBadRequest(response)
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      this.handleError(error)

      throw new Error("This will not be reached, just making ts happy")

    }
  }
}

export const api = new ApiClient();