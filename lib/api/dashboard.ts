import { DashboardOverviewResponse } from './types';

export async function getDashboardOverview(): Promise<DashboardOverviewResponse> {
  // Mock implementation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        user: {
          userId: 'mock-user-id',
          name: 'Test User',
          email: 'test@example.com',
          avatarUrl: 'https://github.com/shadcn.png',
          badges: ['Early Adopter', 'Verified'],
          kycVerified: true,
        },
        stats: {
          totalContributed: 5000,
          totalRaised: 15000,
          campaignsBacked: 3,
          campaignsCreated: 1,
          grantsApplied: 2,
          grantsCreated: 0,
          milestonesCompleted: 5,
        },
        notifications: [
          {
            id: '1',
            type: 'milestone',
            message: 'Your milestone has been approved!',
            timestamp: new Date().toISOString(),
            link: '/projects/123',
          },
        ],
        campaigns: [
          {
            id: 'campaign-1',
            title: 'Boundless Platform',
            status: 'funding',
            fundingGoal: 123000,
            raisedAmount: 45000,
            backersCount: 325,
            nextMilestoneDue: '2025-01-15',
            progressPercent: 36.6,
          },
        ],
        backedProjects: [],
        grantApplications: [],
        createdGrants: [],
        suggestedActions: [
          {
            id: '1',
            description: 'Complete your profile to increase trust',
            actionLabel: 'Update Profile',
            actionUrl: '/profile',
            icon: 'user',
          },
        ],
        platformMetrics: {
          totalCampaigns: 150,
          totalGrants: 25,
          totalUsers: 5000,
          totalRaised: 2500000,
          totalMilestonesVerified: 89,
        },
      });
    }, 1000);
  });
}
