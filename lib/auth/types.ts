/**
 * Extended NextAuth User interface with authentication tokens
 */
export interface ExtendedUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  image: string | null;
  role: 'USER' | 'ADMIN';
  username: string | null;
  profile: {
    firstName: string | null;
    lastName: string | null;
    avatar: string | null;
    username: string | null;
  };
  accessToken?: string;
  refreshToken?: string;
}

/**
 * Extended NextAuth Session interface with user profile
 */
export interface ExtendedSession {
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    image: string | null;
    role: 'USER' | 'ADMIN';
    username: string | null;
    profile: {
      firstName: string | null;
      lastName: string | null;
      avatar: string | null;
      username: string | null;
    };
    accessToken?: string;
    refreshToken?: string;
  };
}

/**
 * Extended JWT token with authentication tokens
 */
export interface ExtendedJWT {
  accessToken?: string;
  refreshToken?: string;
}

/**
 * Credentials for authentication
 */
export interface AuthCredentials {
  email?: string;
  password?: string;
  accessToken?: string;
}

/**
 * User profile information
 */
export interface UserProfile {
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  username: string | null;
}

/**
 * Normalized user information
 */
export interface NormalizedUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  image: string | null;
  role: 'USER' | 'ADMIN';
  username: string | null;
  profile: UserProfile;
}
