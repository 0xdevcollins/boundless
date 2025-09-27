export interface UserProfile {
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  socialLinks: Record<string, string>;
}

export interface UserStats {
  organizations: number;
  projects: number;
  following: number;
  followers: number;
}

export interface Organization {
  name: string;
  avatarUrl: string;
}
