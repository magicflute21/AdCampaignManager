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

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = this.addQueryParams(`${this.baseUrl}${endpoint}`, params);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        let errorMessage: string;

        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorJson.error || 'An error occurred';
        } catch {
          errorMessage = response.statusText || 'An error occurred';
        }

        toast.error(errorMessage);
        throw new Error(`API Error (${response.status}): ${errorMessage}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error && error.message.includes('API Error')) {
        throw error;
      }

      const errorMessage = error instanceof Error ? error.message : 'Network error';
      toast.error(`Failed to fetch data: ${errorMessage}`);
      throw new Error(`Network Error: ${errorMessage}`);
    }
  }
}

export const api = new ApiClient();