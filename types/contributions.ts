export interface ContributionStats {
  totalContributions: number;
  votesCount: number;
  commentsCount: number;
  ongoingVotes: number;
  completedVotes: number;
  successfulProjects: number;
  rejectedProjects: number;
  fundedProjects: number;
}

export interface ActiveProject {
  id: string;
  name: string;
  category: string;
  currentVotes: number;
  requiredVotes: number;
  userVoted?: boolean;
  userRejected?: boolean;
  userComments: number;
  timeLeft: string;
  image: string;
}

export interface PastProject {
  id: string;
  name: string;
  category: string;
  finalVotes: number;
  requiredVotes: number;
  passed: boolean;
  userVoted: boolean;
  userRejected?: boolean;
  userComments: number;
  completedDate: string;
  funded: boolean;
}

export interface UserComment {
  id: string;
  projectId: string;
  projectName: string;
  content: string;
  createdAt: string;
  likes: number;
  dislikes: number;
}

export type SortOption = 'newest' | 'oldest' | 'votes-high' | 'votes-low' | 'likes-high' | 'likes-low';

export type TabOption = 'all' | 'votes' | 'comments';
