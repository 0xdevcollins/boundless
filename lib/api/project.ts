/* eslint-disable @typescript-eslint/no-unused-vars */
import { RecentProjectsProps } from '@/types/project';
import { mockCampaignDetails } from '../mock';
import api from './api';
import {
  ProjectInitRequest,
  CreateCrowdfundingProjectRequest,
  CreateCrowdfundingProjectResponse,
  GetCrowdfundingProjectsResponse,
  GetCrowdfundingProjectResponse,
  UpdateCrowdfundingProjectRequest,
  UpdateCrowdfundingProjectResponse,
  DeleteCrowdfundingProjectResponse,
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

export const createCrowdfundingProject = async (
  data: CreateCrowdfundingProjectRequest
): Promise<CreateCrowdfundingProjectResponse> => {
  const res = await api.post('/crowdfunding/projects', data);
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
