/* eslint-disable @typescript-eslint/no-unused-vars */
import { RecentProjectsProps } from '@/types/project';
import { mockCampaignDetails } from '../mock';
import api from './api';
import {
  ProjectInitRequest,
  CreateCrowdfundingProjectRequest,
  CreateCrowdfundingProjectResponse,
  PrepareCrowdfundingProjectResponse,
  ConfirmCrowdfundingProjectRequest,
  ConfirmCrowdfundingProjectResponse,
  GetCrowdfundingProjectsResponse,
  GetCrowdfundingProjectResponse,
  UpdateCrowdfundingProjectRequest,
  UpdateCrowdfundingProjectResponse,
  DeleteCrowdfundingProjectResponse,
  PrepareFundingRequest,
  PrepareFundingResponse,
  ConfirmFundingRequest,
  ConfirmFundingResponse,
  VoteRequest,
  VoteResponse,
  GetProjectVotesRequest,
  GetProjectVotesResponse,
  RemoveVoteResponse,
} from './types';

export const initProject = async (data: ProjectInitRequest) => {
  const res = await api.post('/projects', data);
  return res;
};

export const getProjects = async (
  page = 1,
  limit = 9,
  filters?: {
    status?: string;
    owner?: string;
  }
): Promise<{
  projects: RecentProjectsProps[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (filters?.status && filters.status !== 'all') {
    params.append('status', filters.status);
  }

  if (filters?.owner) {
    params.append('owner', filters.owner);
  }

  const res = await api.get(`/projects?${params.toString()}`);
  return res.data.data;
};

export const getProjectDetails = async (_projectId: string) => {
  const res = await api.get(`/projects/${_projectId}`);
  return res.data.data;
};

export const deleteProject = async (_projectId: string) => {
  const res = await api.delete(`/projects/${_projectId}`);
  return res.data.data;
};

export const updateProject = async (
  _projectId: string,
  data: ProjectInitRequest
) => {
  const res = await api.put(`/projects/${_projectId}`, data);
  return res.data.data;
};

export const getCampaignDetails = async (_projectId: string) => {
  // Mock implementation for now
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockCampaignDetails);
    }, 1000);
  });
};

export const launchCampaign = async (_projectId: string) => {
  // Mock implementation for now
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Campaign launched successfully',
        data: {
          campaignId: 'launched-campaign-123',
          shareLink: 'https://boundlessfi.xyz/campaigns/launched-campaign-123',
        },
      });
    }, 2000);
  });
};

export const generateCampaignLink = async (_projectId: string) => {
  // Mock implementation for now
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          shareLink: 'https://boundlessfi.xyz/campaigns/' + _projectId,
        },
      });
    }, 500);
  });
};

// Legacy function for backward compatibility
export const createCrowdfundingProject = async (
  data: CreateCrowdfundingProjectRequest
): Promise<CreateCrowdfundingProjectResponse> => {
  const res = await api.post('/crowdfunding/projects', data);
  return res.data;
};

// Step 1: Prepare project and get unsigned transaction
export const prepareCrowdfundingProject = async (
  data: CreateCrowdfundingProjectRequest
): Promise<PrepareCrowdfundingProjectResponse> => {
  const res = await api.post('/crowdfunding/projects/prepare', data);
  return res.data;
};

// Step 2: Submit signed transaction and create project
export const confirmCrowdfundingProject = async (
  data: ConfirmCrowdfundingProjectRequest
): Promise<ConfirmCrowdfundingProjectResponse> => {
  const res = await api.post('/crowdfunding/projects/confirm', data);
  return res.data;
};

// Crowdfunding Project API Functions

/**
 * Get all crowdfunding projects with pagination and filtering
 */
export const getCrowdfundingProjects = async (
  page = 1,
  limit = 10,
  filters?: {
    category?: string;
    status?: string;
  }
): Promise<GetCrowdfundingProjectsResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (filters?.category) {
    params.append('category', filters.category);
  }

  if (filters?.status) {
    params.append('status', filters.status);
  }

  const res = await api.get(`/crowdfunding/projects?${params.toString()}`);
  return res.data;
};

/**
 * Get a single crowdfunding project by ID
 */
export const getCrowdfundingProject = async (
  projectId: string
): Promise<GetCrowdfundingProjectResponse> => {
  const res = await api.get(`/crowdfunding/projects/${projectId}`);
  return res.data;
};

/**
 * Update a crowdfunding project
 */
export const updateCrowdfundingProject = async (
  projectId: string,
  data: UpdateCrowdfundingProjectRequest
): Promise<UpdateCrowdfundingProjectResponse> => {
  const res = await api.put(`/crowdfunding/projects/${projectId}`, data);
  return res.data;
};

/**
 * Delete a crowdfunding project
 */
export const deleteCrowdfundingProject = async (
  projectId: string
): Promise<DeleteCrowdfundingProjectResponse> => {
  const res = await api.delete(`/crowdfunding/projects/${projectId}`);
  return res.data;
};

/**
 * Prepare funding for a crowdfunding project
 * Step 1: Get unsigned transaction for funding
 */
export const prepareProjectFunding = async (
  projectId: string,
  data: PrepareFundingRequest
): Promise<PrepareFundingResponse> => {
  const res = await api.post(`/crowdfunding/projects/${projectId}/fund`, data);
  return res.data;
};

/**
 * Confirm funding for a crowdfunding project
 * Step 2: Submit signed transaction and update project
 */
export const confirmProjectFunding = async (
  projectId: string,
  data: ConfirmFundingRequest
): Promise<ConfirmFundingResponse> => {
  const res = await api.post(
    `/crowdfunding/projects/${projectId}/fund/confirm`,
    data
  );
  return res.data;
};
export const voteProject = async (
  projectId: string,
  value: 1 | -1 = 1
): Promise<VoteResponse> => {
  const res = await api.post(`/projects/${projectId}/vote`, { value });
  return res.data;
};

/**
 * Get votes for a project with pagination and filtering
 */
export const getProjectVotes = async (
  projectId: string,
  params?: GetProjectVotesRequest
): Promise<GetProjectVotesResponse> => {
  const queryParams = new URLSearchParams();

  if (params?.page) {
    queryParams.append('page', params.page.toString());
  }

  if (params?.limit) {
    queryParams.append('limit', params.limit.toString());
  }

  if (params?.voteType) {
    queryParams.append('voteType', params.voteType);
  }

  const queryString = queryParams.toString();
  const url = queryString
    ? `/projects/${projectId}/votes?${queryString}`
    : `/projects/${projectId}/votes`;

  const res = await api.get(url);
  return res.data;
};

/**
 * Remove user's vote from a project
 */
export const removeProjectVote = async (
  projectId: string
): Promise<RemoveVoteResponse> => {
  const res = await api.delete(`/projects/${projectId}/vote`);
  return res.data;
};
