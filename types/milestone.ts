export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  budget: number;
  currency: string;
  deliverables: string[];
  demoVideo?: string;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  links?: Array<{
    type: string;
    url: string;
    icon: string;
  }>;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export type MilestoneStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'cancelled';
