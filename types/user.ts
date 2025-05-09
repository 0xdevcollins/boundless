export interface UserProfile {
  id: string;
  name: string;
  image?: string;
  bio?: string;
  bannerImage?: string;
  twitter?: string;
  linkedin?: string;
  totalContributions?: number;
  votes?: number;
  fundedProjects?: number;
}
