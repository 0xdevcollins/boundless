/* eslint-disable @typescript-eslint/no-unused-vars */
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

// Mock API functions to avoid environment variable issues
export const register = async (
  _data: RegisterRequest
): Promise<RegisterResponse> => {
  // Mock implementation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        message: 'Registration successful',
      });
    }, 1000);
  });
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    // Mock implementation
    const mockResponse = await new Promise<LoginResponse>(resolve => {
      setTimeout(() => {
        resolve({
          accessToken: 'mock-access-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now(),
        });
      }, 1000);
    });

    if (mockResponse.accessToken) {
      // Use the auth store to handle login
      const authStore = useAuthStore.getState();
      await authStore.login(
        mockResponse.accessToken,
        mockResponse.refreshToken
      );
    }

    return mockResponse;
  } catch (error) {
    // Re-throw the error for the component to handle
    throw error;
  }
};

export const githubAuth = async (
  _data: GithubAuthRequest
): Promise<GithubAuthResponse> => {
  // Mock implementation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        accessToken: 'mock-github-token-' + Date.now(),
        refreshToken: 'mock-github-refresh-' + Date.now(),
      });
    }, 1000);
  });
};

export const googleAuth = async (
  _data: GoogleAuthRequest
): Promise<GoogleAuthResponse> => {
  // Mock implementation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        accessToken: 'mock-google-token-' + Date.now(),
        refreshToken: 'mock-google-refresh-' + Date.now(),
      });
    }, 1000);
  });
};

export const getMe = async (_token?: string): Promise<GetMeResponse> => {
  // Mock implementation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        _id: 'mock-user-id',
        email: 'test@example.com',
        profile: {
          firstName: 'Test',
          lastName: 'User',
          username: 'testuser',
          avatar: 'https://github.com/shadcn.png',
        },
        isVerified: true,
        roles: ['user'],
        lastLogin: new Date().toISOString(),
      });
    }, 500);
  });
};

export const logout = async (_token?: string): Promise<LogoutResponse> => {
  try {
    // Mock implementation
    const mockResponse = await new Promise<LogoutResponse>(resolve => {
      setTimeout(() => {
        resolve({
          message: 'Logged out successfully',
        });
      }, 500);
    });

    // Use the auth store to handle logout
    const authStore = useAuthStore.getState();
    await authStore.logout();

    return mockResponse;
  } catch (error) {
    // Even if the API call fails, clear the local auth state
    const authStore = useAuthStore.getState();
    authStore.clearAuth();
    throw error;
  }
};

export const verifyOtp = async (
  _data: VerifyOtpRequest
): Promise<VerifyOtpResponse> => {
  // Mock implementation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        message: 'OTP verified successfully',
      });
    }, 1000);
  });
};

export const resendOtp = async (
  _data: ResendOtpRequest
): Promise<ResendOtpResponse> => {
  // Mock implementation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        message: 'OTP resent successfully',
      });
    }, 1000);
  });
};

export const forgotPassword = async (
  _data: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> => {
  // Mock implementation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        message: 'Password reset email sent',
      });
    }, 1000);
  });
};

export const resetPassword = async (
  _data: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  // Mock implementation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        message: 'Password reset successfully',
      });
    }, 1000);
  });
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
