/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProjectInitRequest } from './types';
import { mockCampaignDetails } from '@/lib/mock';

// Mock API functions that don't require the base URL
export const initProject = async (_data: ProjectInitRequest) => {
  // Mock implementation for now
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          projectId: 'mock-project-' + Date.now(),
          message: 'Project initialized successfully',
        },
      });
    }, 1000);
  });
};

// New API functions for campaign review and launch
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
