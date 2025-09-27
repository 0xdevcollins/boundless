import { auth } from '@/auth';
import api from './api';
import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  GithubAuthRequest,
  GithubAuthResponse,
  GoogleAuthRequest,
  GoogleAuthResponse,
  GetMeResponse,
  LogoutResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '@/lib/api/types';
import { useAuthStore } from '@/lib/stores/auth-store';
import { redirect } from 'next/navigation';

export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const res = await api.post<{
    success: boolean;
    data: RegisterResponse;
    message: string;
    timestamp: string;
    path: string;
  }>('/auth/register', data);
  return res.data.data;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const res = await api.post<{
      success: boolean;
      data: LoginResponse;
      message: string;
      timestamp: string;
      path: string;
    }>('/auth/login', data);

    const loginData = res.data.data;

    if (loginData.accessToken) {
      // Use the auth store to handle login
      const authStore = useAuthStore.getState();
      await authStore.login(loginData.accessToken, loginData.refreshToken);
    }

    return loginData;
  } catch (error) {
    // Re-throw the error for the component to handle
    throw error;
  }
};

export const githubAuth = async (
  data: GithubAuthRequest
): Promise<GithubAuthResponse> => {
  const res = await api.post<GithubAuthResponse>('/github', data);
  return res.data;
};

export const googleAuth = async (
  data: GoogleAuthRequest
): Promise<GoogleAuthResponse> => {
  const res = await api.post<GoogleAuthResponse>('/auth/google', data);
  return res.data;
};

export const getMe = async (token?: string): Promise<GetMeResponse> => {
  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : undefined;
  const res = await api.get<{
    success: boolean;
    data: GetMeResponse;
    message?: string;
    timestamp: string;
    path?: string;
  }>('/users/profile', config);
  return res.data.data;
};

export const logout = async (token?: string): Promise<LogoutResponse> => {
  const session = await auth();
  if (!session?.user) {
    redirect('/auth/signin');
  }
  try {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : undefined;
    const res = await api.post<{
      success: boolean;
      data: LogoutResponse;
      message: string;
      timestamp: string;
      path: string;
    }>('/auth/logout', undefined, config);

    return res.data.data;
  } catch (error) {
    // Don't clear auth state here - let the calling function handle it
    throw error;
  }
};

export const verifyOtp = async (
  data: VerifyOtpRequest
): Promise<VerifyOtpResponse> => {
  const res = await api.post<{
    success: boolean;
    data: VerifyOtpResponse;
    message: string;
    timestamp: string;
    path: string;
  }>('/auth/verify-otp', data);
  return res.data.data;
};

export const resendOtp = async (
  data: ResendOtpRequest
): Promise<ResendOtpResponse> => {
  const res = await api.post<{
    success: boolean;
    data: ResendOtpResponse;
    message: string;
    timestamp: string;
    path: string;
  }>('/auth/resend-otp', data);
  return res.data.data;
};

export const forgotPassword = async (
  data: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> => {
  const res = await api.post<{
    success: boolean;
    data: ForgotPasswordResponse;
    message: string;
    timestamp: string;
    path: string;
  }>('/auth/forgot-password', data);
  return res.data.data;
};

export const resetPassword = async (
  data: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  const res = await api.post<{
    success: boolean;
    data: ResetPasswordResponse;
    message: string;
    timestamp: string;
    path: string;
  }>('/auth/reset-password', data);
  return res.data.data;
};

// Enhanced auth utilities
export const refreshUserData = async (): Promise<void> => {
  const authStore = useAuthStore.getState();
  await authStore.refreshUser();
};

export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    const authStore = useAuthStore.getState();
    const { accessToken, isAuthenticated } = authStore;

    if (!accessToken || !isAuthenticated) {
      return false;
    }

    // Try to refresh user data to verify token is still valid
    await authStore.refreshUser();
    return true;
  } catch {
    return false;
  }
};

export const getAuthHeaders = (): Record<string, string> => {
  const authStore = useAuthStore.getState();
  const { accessToken } = authStore;

  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};
