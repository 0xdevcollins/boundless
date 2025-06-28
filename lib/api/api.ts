import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { ApiResponse, ErrorResponse } from './types';
import { auth, signOut } from '@/auth';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Accept': 'application/json',
  },
  withCredentials: true, // Only if your Express backend uses cookies for auth
});


// Helper function to extract data from API response
const extractData = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
  const apiResponse = response.data;
  
  if (!apiResponse.success) {
    throw new Error(apiResponse.message || 'API request failed');
  }
  
  return apiResponse.data as T;
};

// Add request interceptor for JWT
api.interceptors.request.use(
  async (config) => {
    // Get token from cookie (or localStorage, if that's what you use)
    const session = await auth()

    const token = session?.user.accessToken;  
    console.log({token})
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const responseData = error.response.data as ErrorResponse;

      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        Cookies.remove('authjs.session-token');
        // Use signOut with redirectTo to ensure sign out and redirect are handled in order
        signOut({ redirect: true, redirectTo: '/auth/signin' });

        // if (typeof window !== 'undefined') {
        //   window.location.href = '/auth/signin'; // Only redirect in browser
        // }
      }

      // Return the error message from Express, fallback to generic
      console.log(error.response.data);
      return Promise.reject(
        responseData?.message ||
        responseData?.error ||
        'An error occurred'
      );
    } else if (error.request) {
      // No response from server
      return Promise.reject('No response from server. Please try again later.');
    } else {
      // Other errors
      return Promise.reject(error.message);
    }
  }
);

// Enhanced axios instance with automatic data extraction
const enhancedApi = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.get<ApiResponse<T>>(url, config);
    return extractData<T>(response);
  },
  
  post: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.post<ApiResponse<T>>(url, data, config);
    return extractData<T>(response);
  },
  
  put: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.put<ApiResponse<T>>(url, data, config);
    return extractData<T>(response);
  },
  
  patch: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.patch<ApiResponse<T>>(url, data, config);
    return extractData<T>(response);
  },
  
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.delete<ApiResponse<T>>(url, config);
    return extractData<T>(response);
  },
  
  // Raw methods for when you need the full response
  raw: api
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default enhancedApi;
