/* eslint-disable @typescript-eslint/no-unused-vars */
import { RecentProjectsProps } from '@/types/project';
import { mockCampaignDetails } from '../mock';
import api from './api';
import { ProjectInitRequest } from './types';

export const initProject = async (data: ProjectInitRequest) => {
  const res = await api.post('/projects', data);
  return res;
};

export const getProjects = async (): Promise<{
  projects: RecentProjectsProps[];
}> => {
  const res = await api.get('/projects');
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
          shareLink: 'https://boundless.com/campaigns/launched-campaign-123',
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
          shareLink: 'https://boundless.com/campaigns/' + _projectId,
        },
      });
    }, 500);
  });
};
