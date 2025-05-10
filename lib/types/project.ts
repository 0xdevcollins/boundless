export interface Project {
  id: string;
  name: string;
  description: string;
  bannerUrl: string;
  pfpUrl: string;
  stats: {
    supporters: number;
    points: number;
    funded: number;
  };
  validation: {
    phase: number;
    totalPhases: number;
    progress: number;
    currentPhase: string;
  };
  funding: {
    hardCap: number;
    softCap: number;
    raised: number;
    daysLeft: number;
  };
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'completed' | 'failed';
    dueDate: string;
  }>;
  team: Array<{
    id: string;
    name: string;
    role: string;
    avatar: string;
  }>;
}
