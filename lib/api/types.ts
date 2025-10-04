import { Project } from '@/types/project';

// Backend API Response Structure
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
  path?: string;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ErrorResponse extends ApiResponse {
  success: false;
  message: string;
  error?: string;
  statusCode: number;
}

// User type
export interface UserProfile {
  firstName: string;
  lastName: string;
  username: string;
  avatar?: string;
}

export interface User {
  _id: string;
  email: string;
  profile: UserProfile;
  isVerified: boolean;
  roles: string[];
  lastLogin?: string;
  [key: string]: unknown;
}
export interface Organization {
  _id: string;
  name: string;
  avatar: string;
  username: string;
  bio: string;
}

// Auth tokens
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Register
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
}
export interface RegisterResponse {
  message: string;
}

// Login
export interface LoginRequest {
  email: string;
  password: string;
}
export type LoginResponse = AuthTokens;

// GitHub Auth
export interface GithubAuthRequest {
  code: string;
}
export type GithubAuthResponse = AuthTokens;

// Google Auth
export interface GoogleAuthRequest {
  token: string;
}
export type GoogleAuthResponse = AuthTokens;

// GetMe
export type GetMeResponse = User & {
  organizations: Organization[];
  projects: Project[];
  following: User[];
  followers: User[];
};

// Logout
export interface LogoutResponse {
  message: string;
}

// Verify OTP
export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
}

// Resend OTP
export interface ResendOtpRequest {
  email: string;
}

export interface ResendOtpResponse {
  message: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface UserOverview {
  userId: string;
  name: string;
  email: string;
  avatarUrl?: string;
  badges: string[];
  kycVerified: boolean;
}

export interface DashboardStats {
  totalContributed: number;
  totalRaised: number;
  campaignsBacked: number;
  campaignsCreated: number;
  grantsApplied: number;
  grantsCreated: number;
  milestonesCompleted: number;
}

export interface Notification {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  link?: string;
}

export interface UserCampaign {
  id: string;
  title: string;
  status: string;
  fundingGoal: number;
  raisedAmount: number;
  backersCount: number;
  nextMilestoneDue: string | null;
  progressPercent: number;
}

export interface UserBackedProject {
  projectId: string;
  title: string;
  contributedAmount: number;
  currentStatus: string;
  nextUpdate: string | null;
  refundEligible: boolean;
}

export interface UserGrantApplication {
  grantId: string;
  grantTitle: string;
  status: string;
  submittedAt: string;
  nextAction?: string;
  escrowedAmount?: number;
  milestonesCompleted?: number;
}

export interface UserCreatedGrant {
  id: string;
  title: string;
  totalBudget: number;
  totalDisbursed: number;
  proposalsReceived: number;
  proposalsApproved: number;
  status: string;
}

export interface SuggestedAction {
  id: string;
  description: string;
  actionLabel: string;
  actionUrl: string;
  icon: string;
}

export interface PlatformMetrics {
  totalCampaigns: number;
  totalGrants: number;
  totalUsers: number;
  totalRaised: number;
  totalMilestonesVerified: number;
}

export interface DashboardOverviewResponse {
  user: UserOverview;
  stats: DashboardStats;
  notifications: Notification[];
  campaigns: UserCampaign[];
  backedProjects: UserBackedProject[];
  grantApplications: UserGrantApplication[];
  createdGrants: UserCreatedGrant[];
  suggestedActions: SuggestedAction[];
  platformMetrics: PlatformMetrics;
}

export interface MilestoneInit {
  title: string;
  description: string;
  deliveryDate: string; // YYYY-MM-DD
  fundPercentage: number; // 0-100
  fundAmount: number; // derived: fundAmount * fundPercentage / 100
}

export interface ProjectInitRequest {
  title: string;
  description: string;
  tagline: string;
  type: 'crowdfund' | 'grant';
  category: string;
  fundAmount: number;
  tags: string[];
  // Optional assets until upload integration is wired
  thumbnail?: string;
  whitepaperUrl?: string;
  // Milestones payload
  milestones: MilestoneInit[];
}

export interface ProjectInitResponse {
  message: string;
  data: {
    projectId: string;
  };
  [key: string]: unknown;
}

// Campaign Review and Launch Types
export interface CampaignDetails {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  fundAmount: number;
  raisedAmount: number;
  tags: string[];
  thumbnail: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  engagement: {
    likes: number;
    comments: number;
    backers: number;
    daysLeft: number;
  };
  photos: string[];
  milestones: CampaignMilestone[];
  status: string;
}

export interface CampaignMilestone {
  id: string;
  title: string;
  description: string;
  deliveryDate: string;
  fundPercentage: number;
  fundAmount: number;
}

export interface LaunchCampaignRequest {
  projectId: string;
}

export interface LaunchCampaignResponse {
  success: boolean;
  message: string;
  data: {
    campaignId: string;
    shareLink: string;
  };
}

export interface ShareLinkResponse {
  success: boolean;
  data: {
    shareLink: string;
  };
}

// Crowdfunding Project Types
export interface CrowdfundingMilestone {
  name: string;
  description: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  amount: number;
}

export interface CrowdfundingTeamMember {
  name: string;
  role: string;
  email: string;
  linkedin?: string;
  twitter?: string;
}

export interface CrowdfundingContact {
  primary: string;
  backup: string;
}

export interface CrowdfundingSocialLink {
  platform: string;
  url: string;
}

export interface CreateCrowdfundingProjectRequest {
  title: string;
  logo?: string;
  vision: string;
  category: string;
  details: string;
  fundingAmount: number;
  githubUrl?: string;
  gitlabUrl?: string;
  bitbucketUrl?: string;
  projectWebsite?: string;
  demoVideo?: string;
  milestones: CrowdfundingMilestone[];
  team: CrowdfundingTeamMember[];
  contact: CrowdfundingContact;
  socialLinks?: CrowdfundingSocialLink[];
}

export interface CreateCrowdfundingProjectResponse {
  success: boolean;
  message: string;
  data: {
    projectId: string;
  };
}

// Crowdfunding Project Response Types
export interface CrowdfundingProject {
  _id: string;
  title: string;
  logo?: string;
  media: {
    logo?: string;
  };
  vision: string;
  funding: {
    goal: number;
    raised: number;
    currency: string;
    contributors: number[];
    endDate: string;
  };
  category: string;
  details: string;
  description: string;
  fundingAmount: number;
  githubUrl?: string;
  gitlabUrl?: string;
  bitbucketUrl?: string;
  projectWebsite?: string;
  demoVideo?: string;
  status: string;
  type: 'crowdfund';
  votes: number;
  voting: {
    endDate: string;
    negativeVotes: number;
    positiveVotes: number;
    startDate: string;
    totalVotes: number;
    voters: number[];
  };
  creator: {
    _id: string;
    profile: {
      firstName: string;
      lastName: string;
      username: string;
    };
  };
  team: Array<{
    userId: {
      _id: string;
      profile: {
        firstName: string;
        lastName: string;
        username: string;
      };
    };
    role: string;
  }>;
  milestones: CrowdfundingMilestone[];
  contact: CrowdfundingContact;
  socialLinks?: CrowdfundingSocialLink[];
  createdAt: string;
  updatedAt: string;
}

export interface CrowdfundData {
  _id: string;
  projectId: string;
  raisedAmount: number;
  backersCount: number;
  status: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetCrowdfundingProjectsResponse {
  success: boolean;
  message: string;
  data: {
    projects: CrowdfundingProject[];
    pagination: {
      current: number;
      pages: number;
      total: number;
    };
  };
}

export interface GetCrowdfundingProjectResponse {
  success: boolean;
  message: string;
  data: {
    project: CrowdfundingProject;
    crowdfund: CrowdfundData;
  };
}

export interface UpdateCrowdfundingProjectRequest {
  title?: string;
  logo?: string;
  vision?: string;
  category?: string;
  details?: string;
  fundingAmount?: number;
  githubUrl?: string;
  gitlabUrl?: string;
  bitbucketUrl?: string;
  projectWebsite?: string;
  demoVideo?: string;
  milestones?: CrowdfundingMilestone[];
  team?: CrowdfundingTeamMember[];
  contact?: CrowdfundingContact;
  socialLinks?: CrowdfundingSocialLink[];
}

export interface UpdateCrowdfundingProjectResponse {
  success: boolean;
  message: string;
  data: {
    project: CrowdfundingProject;
  };
}

export interface DeleteCrowdfundingProjectResponse {
  success: boolean;
  message: string;
}
