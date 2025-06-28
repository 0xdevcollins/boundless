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
} from './types';

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>('/auth/register', data);
  console.log(res);
  return res;
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>('/auth/login', data);
  return res;
};

export const githubAuth = async (data: GithubAuthRequest): Promise<GithubAuthResponse> => {
  const res = await api.post<GithubAuthResponse>('/github', data);
  return res;
};

export const googleAuth = async (data: GoogleAuthRequest): Promise<GoogleAuthResponse> => {
  const res = await api.post<GoogleAuthResponse>('/auth/google', data);
  return res;
};

export const getMe = async (token?: string): Promise<GetMeResponse> => {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
  const res = await api.get<GetMeResponse>('/auth/me', config);
  return res;
};

export const logout = async (token?: string): Promise<LogoutResponse> => {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
  const res = await api.post<LogoutResponse>('/auth/logout', undefined, config);
  return res;
};

export const verifyOtp = async (data: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
  const res = await api.post<VerifyOtpResponse>('/auth/verify-otp', data);
  return res;
};

export const resendOtp = async (data: ResendOtpRequest): Promise<ResendOtpResponse> => {
  const res = await api.post<ResendOtpResponse>('/auth/resend-otp', data);
  return res;
};

export const forgotPassword = async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
  const res = await api.post<ForgotPasswordResponse>('/auth/forgot-password', data);
  return res;
};

export const resetPassword = async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  const res = await api.post<ResetPasswordResponse>('/auth/reset-password', data);
  return res;
};
