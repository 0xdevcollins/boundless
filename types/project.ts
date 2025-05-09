export interface BaseProject {
  id: number;
  title: string;
  progress: number;
  raised: string;
  goal: string;
  category: string;
  href: string;
}

export interface ProjectWithDays extends BaseProject {
  daysLeft: number;
}

export interface TrendingProject extends ProjectWithDays {
  engagementChange: string;
}

export interface CompletedProject {
  id: number;
  title: string;
  totalRaised: string;
  contributors: number;
  completionDate: string;
  category: string;
  href: string;
}

export interface ActivityDataPoint {
  name: string;
  contributions: number;
  participants: number;
}

export type Project = {
  id: string;
  userId: string;
  title: string;
  description: string;
  fundingGoal: number;
  category: string;
  bannerUrl: string | null;
  profileUrl: string | null;
  blockchainTx: string | null;
  ideaValidation: ValidationStatus;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  votes: {
    id: string;
    userId: string;
  }[];
  _count: {
    votes: number;
  };
};

export interface TeamMember {
  id: string;
  fullName: string;
  role: string;
  bio: string | null;
  profileImage: string | null;
  github: string | null;
  twitter: string | null;
  discord: string | null;
  linkedin: string | null;
  userId?: string | null; // Optional
  projectId?: string; // Optional
  createdAt?: string | Date; // Optional
  updatedAt?: string | Date; // Optional
}

export type ExploreFilter = 'newest' | 'popular' | 'ending';
export type CompletedSort = 'date' | 'size' | 'category';
export type ValidationStatus = 'PENDING' | 'REJECTED' | 'VALIDATED';
