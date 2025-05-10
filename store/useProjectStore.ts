import { type Project, fetchProjectById, fetchProjects } from '@/lib/actions/project';
import { create } from 'zustand';

interface ProjectState {
  // Projects list state
  projects: Project[];
  isLoading: boolean;
  error: string | null;

  // Single project state
  selectedProject: Project | null;
  isLoadingProject: boolean;
  projectError: string | null;

  // Actions
  fetchProjects: (forUser?: boolean) => Promise<void>;
  fetchProjectById: (id: string) => Promise<void>;
  resetProjectState: () => void;
  resetProjectsState: () => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  // Projects list initial state
  projects: [],
  isLoading: false,
  error: null,

  // Single project initial state
  selectedProject: null,
  isLoadingProject: false,
  projectError: null,

  // Fetch multiple projects
  fetchProjects: async (forUser?: boolean) => {
    set({ isLoading: true, error: null });

    try {
      const projects = await fetchProjects(forUser);
      set({ projects, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch projects',
        isLoading: false,
      });
    }
  },

  // Fetch a single project by ID
  fetchProjectById: async (id: string) => {
    set({ isLoadingProject: true, projectError: null });

    try {
      const project = await fetchProjectById(id);
      set({ selectedProject: project, isLoadingProject: false });
    } catch (error) {
      set({
        projectError: error instanceof Error ? error.message : 'Failed to fetch project',
        isLoadingProject: false,
      });
    }
  },

  // Reset states
  resetProjectState: () => {
    set({ selectedProject: null, isLoadingProject: false, projectError: null });
  },

  resetProjectsState: () => {
    set({ projects: [], isLoading: false, error: null });
  },
}));

// Helper selector functions to destructure the store values more easily
export const useProjects = () => {
  const { projects, isLoading, error, fetchProjects } = useProjectStore();
  return { projects, isLoading, error, fetchProjects };
};

export const useSelectedProject = () => {
  const { selectedProject, isLoadingProject, projectError, fetchProjectById, resetProjectState } = useProjectStore();

  return {
    project: selectedProject,
    isLoading: isLoadingProject,
    error: projectError,
    fetchProjectById,
    resetProjectState,
  };
};

// Extract project details for easier access
export const useProjectDetails = () => {
  const { selectedProject } = useProjectStore();

  if (!selectedProject) return null;

  return {
    id: selectedProject.id,
    userId: selectedProject.userId,
    title: selectedProject.title,
    description: selectedProject.description,
    fundingGoal: selectedProject.fundingGoal,
    category: selectedProject.category,
    bannerUrl: selectedProject.bannerUrl,
    profileUrl: selectedProject.profileUrl,
    blockchainTx: selectedProject.blockchainTx,
    ideaValidation: selectedProject.ideaValidation,
    createdAt: selectedProject.createdAt,
    user: selectedProject.user,
    votes: selectedProject.votes,
    voteCount: selectedProject._count.votes,
    teamMembers: selectedProject.teamMembers || [],
    teamMembersCount: selectedProject._count.teamMembers || 0,
  };
};
