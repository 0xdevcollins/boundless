/* eslint-disable no-console */
/**
 * Authentication logger utility
 */
export class AuthLogger {
  private static isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Log authentication events
   */
  static log(event: string, data?: Record<string, unknown>) {
    if (this.isDevelopment) {
      console.log(`[AUTH] ${event}`, data ? JSON.stringify(data, null, 2) : '');
    }
  }

  /**
   * Log authentication errors
   */
  static error(event: string, error: Error, data?: Record<string, unknown>) {
    console.error(`[AUTH ERROR] ${event}`, {
      error: error.message,
      stack: error.stack,
      ...data,
    });
  }

  /**
   * Log authentication warnings
   */
  static warn(event: string, data?: Record<string, unknown>) {
    console.warn(
      `[AUTH WARN] ${event}`,
      data ? JSON.stringify(data, null, 2) : ''
    );
  }
}
