export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  category: string;
  type: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  // Owner information for filtering
  owner?: string | null;
  ownerName?: string;
  ownerUsername?: string;
  ownerAvatar?: string;
}

export type RecentProjectsProps = Project;

export type ProjectStatus =
  | 'draft'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'funding'
  | 'funded'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type ProjectType =
  | 'crowdfunding'
  | 'grant'
  | 'hackathon'
  | 'research'
  | 'creative'
  | 'open_source';

export type ProjectCategory =
  | 'web3'
  | 'defi'
  | 'nft'
  | 'dao'
  | 'infrastructure'
  | 'social_impact'
  | 'education'
  | 'healthcare'
  | 'environment'
  | 'technology';
