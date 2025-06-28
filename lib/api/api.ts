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


const extractData = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
  const apiResponse = response.data;
  
  if (!apiResponse.success) {
    throw new Error(apiResponse.message || 'API request failed');
  }
  
  return apiResponse.data as T;
};

api.interceptors.request.use(
  async (config) => {
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const responseData = error.response.data as ErrorResponse;

      if (error.response.status === 401) {
        Cookies.remove('authjs.session-token');
        signOut({ redirect: true, redirectTo: '/auth/signin' });
      }

      console.log(error.response.data);
      return Promise.reject(
        responseData?.message ||
        responseData?.error ||
        'An error occurred'
      );
    } else if (error.request) {
      return Promise.reject('No response from server. Please try again later.');
    } else {
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
  
  raw: api
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default enhancedApi;
