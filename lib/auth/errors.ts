/**
 * Custom error classes for authentication
 */
export class AuthError extends Error {
  constructor(
    message: string,
    public code: string
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export class UnverifiedEmailError extends AuthError {
  constructor() {
    super('Email not verified', 'UNVERIFIED_EMAIL');
    this.name = 'UnverifiedEmailError';
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor() {
    super('Invalid credentials', 'INVALID_CREDENTIALS');
    this.name = 'InvalidCredentialsError';
  }
}

export class TokenValidationError extends AuthError {
  constructor() {
    super('Invalid or expired token', 'TOKEN_VALIDATION_ERROR');
    this.name = 'TokenValidationError';
  }
}

/**
 * Error codes for consistent error handling
 */
export const AUTH_ERROR_CODES = {
  UNVERIFIED_EMAIL: 'UNVERIFIED_EMAIL',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_VALIDATION_ERROR: 'TOKEN_VALIDATION_ERROR',
  MISSING_ENV_VARS: 'MISSING_ENV_VARS',
} as const;

export type AuthErrorCode =
  (typeof AUTH_ERROR_CODES)[keyof typeof AUTH_ERROR_CODES];
