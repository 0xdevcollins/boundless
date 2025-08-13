import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/lib/stores/auth-store';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

// Only throw error in production if API URL is missing
if (
  !process.env.NEXT_PUBLIC_API_BASE_URL &&
  process.env.NODE_ENV === 'production'
) {
  throw new Error(
    'NEXT_PUBLIC_API_BASE_URL environment variable is not defined'
  );
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  skipAuthRefresh?: boolean;
}

// Token refresh function
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken) {
      return null;
    }

    const response = await axios.post(
      `${API_BASE_URL}/auth/refresh`,
      { refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;

    // Update tokens in store and cookies
    const authStore = useAuthStore.getState();
    authStore.setTokens(accessToken, newRefreshToken);

    return accessToken;
  } catch {
    // If refresh fails, clear auth data
    const authStore = useAuthStore.getState();
    authStore.clearAuth();
    return null;
  }
};

const createClientApi = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: true,
  });

  // Request interceptor
  instance.interceptors.request.use(
    config => {
      config.withCredentials = true;

      const accessToken = Cookies.get('accessToken');
      if (accessToken && !config.headers?.Authorization) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // Response interceptor with automatic token refresh
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async error => {
      const originalRequest = error.config;

      // Handle 401 errors with automatic token refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // Skip auth refresh if explicitly requested
        if (originalRequest.skipAuthRefresh) {
          const authStore = useAuthStore.getState();
          authStore.clearAuth();
          return Promise.reject({
            message: 'Authentication required',
            status: 401,
            code: 'UNAUTHORIZED',
          });
        }

        try {
          const newAccessToken = await refreshAccessToken();

          if (newAccessToken) {
            // Retry the original request with new token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
          } else {
            // Refresh failed, redirect to login
            const authStore = useAuthStore.getState();
            authStore.clearAuth();

            // Only redirect if we're on the client side
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/signin';
            }

            return Promise.reject({
              message: 'Session expired. Please login again.',
              status: 401,
              code: 'SESSION_EXPIRED',
            });
          }
        } catch {
          const authStore = useAuthStore.getState();
          authStore.clearAuth();

          // Only redirect if we're on the client side
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/signin';
          }

          return Promise.reject({
            message: 'Session expired. Please login again.',
            status: 401,
            code: 'SESSION_EXPIRED',
          });
        }
      }

      // Handle other errors
      if (error.response) {
        const errorData = error.response.data;
        const customError: ApiError = {
          message:
            errorData?.message ||
            `HTTP error! status: ${error.response.status}`,
          status: error.response.status,
          code: errorData?.code,
        };
        return Promise.reject(customError);
      } else if (error.request) {
        return Promise.reject(new Error('Network error: No response received'));
      } else {
        return Promise.reject(new Error(`Request error: ${error.message}`));
      }
    }
  );

  return instance;
};

const axiosInstance = createClientApi();

const convertAxiosResponse = <T>(
  response: AxiosResponse<T>
): ApiResponse<T> => ({
  data: response.data,
  status: response.status,
  statusText: response.statusText,
});

const convertRequestConfig = (config?: RequestConfig): AxiosRequestConfig => ({
  headers: config?.headers,
  timeout: config?.timeout,
  withCredentials: true,
});

const clientApi = {
  get: async <T = unknown>(
    url: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.get<T>(
      url,
      convertRequestConfig(config)
    );
    return convertAxiosResponse(response);
  },

  post: async <T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.post<T>(
      url,
      data,
      convertRequestConfig(config)
    );
    return convertAxiosResponse(response);
  },

  put: async <T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.put<T>(
      url,
      data,
      convertRequestConfig(config)
    );
    return convertAxiosResponse(response);
  },

  patch: async <T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.patch<T>(
      url,
      data,
      convertRequestConfig(config)
    );
    return convertAxiosResponse(response);
  },

  delete: async <T = unknown>(
    url: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => {
    const response = await axiosInstance.delete<T>(
      url,
      convertRequestConfig(config)
    );
    return convertAxiosResponse(response);
  },
};

export const api = {
  get: <T = unknown>(
    url: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => clientApi.get<T>(url, config),

  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => clientApi.post<T>(url, data, config),

  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => clientApi.put<T>(url, data, config),

  patch: <T = unknown>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => clientApi.patch<T>(url, data, config),

  delete: <T = unknown>(
    url: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> => clientApi.delete<T>(url, config),
};

export default axiosInstance;
