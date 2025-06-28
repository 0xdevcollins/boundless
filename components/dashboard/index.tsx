'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatePresence } from 'framer-motion';
import { CheckCircle, Compass, TrendingUp, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';

import { DashboardOverviewResponse, UserCampaign, UserBackedProject } from '@/lib/api/types';
import ActivityOverview from './activity-overview';
import CompletedTab from './tabs/completed-tab';
import ExploreTab from './tabs/explore-tab';
import MyProjectsTab from './tabs/my-projects-tab';
import TrendingTab from './tabs/trending-tab';
import ActiveBadges from './active-badges';
import StatsCards from './stats-cards';
import type { ProjectWithDays, BaseProject, CompletedProject } from '@/types/project';
import { formatCurrency, formatMillions } from '@/utils/utils';

// --- Mapping Utilities ---
function mapCampaignToProjectWithDays(c: UserCampaign): ProjectWithDays {
  return {
    id: c.id,
    title: c.title,
    progress: typeof c.progressPercent === 'number' ? c.progressPercent : 0,
    raised: `$${c.raisedAmount?.toLocaleString() ?? '0'}`,
    goal: `$${c.fundingGoal?.toLocaleString() ?? '0'}`,
    category: 'General', // Not in API, fallback
    href: `/projects/${c.id}`,
    daysLeft: c.nextMilestoneDue ? Math.max(0, Math.ceil((new Date(c.nextMilestoneDue).getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : 0,
  };
}

function mapBackedProjectToBaseProject(p: UserBackedProject): BaseProject {
  return {
    id: p.projectId,
    title: p.title,
    progress: 0, // No progress info in API, set to 0 or estimate
    raised: `$${p.contributedAmount?.toLocaleString() ?? '0'}`,
    goal: '$0', // No goal info in API
    category: 'General', // Not in API, fallback
    href: `/projects/${p.projectId}`,
  };
}

function mapCampaignToCompletedProject(c: UserCampaign): CompletedProject {
  return {
    id: c.id,
    title: c.title,
    totalRaised: `$${c.raisedAmount?.toLocaleString() ?? '0'}`,
    contributors: c.backersCount ?? 0,
    completionDate: 'N/A', // Not in API, fallback
    category: 'General', // Not in API, fallback
    href: `/projects/${c.id}`,
  };
}

// Local type for analytics to match only what is displayed
interface DashboardStatsAnalytics {
  contributions: {
    value: string;
    rawValue: number;
  };
  activeProjects: {
    count: number;
    pendingMilestones: number;
  };
  successfulExits: {
    count: number;
    totalValue: string;
    rawTotalValue: number;
  };
}

function mapStatsToFormattedAnalytics(stats: DashboardOverviewResponse['stats']): DashboardStatsAnalytics {
  return {
    contributions: {
      value: formatCurrency(stats.totalContributed),
      rawValue: stats.totalContributed,
    },
    activeProjects: {
      count: stats.campaignsCreated,
      pendingMilestones: 0,
    },
    successfulExits: {
      count: stats.milestonesCompleted,
      totalValue: formatMillions(stats.totalRaised),
      rawTotalValue: stats.totalRaised,
    },
  };
}

// --- Dashboard Component ---
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('myprojects');
  const [data, setData] = useState<DashboardOverviewResponse | null>(null);
  const [exploreFilter, setExploreFilter] = useState<'newest' | 'popular' | 'ending'>('newest');
  const [completedSort, setCompletedSort] = useState<'date' | 'size' | 'category'>('date');

  useEffect(() => {
    async function fetchOverview() {
      const res = await fetch('/api/dashboard/overview');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    }
    fetchOverview();
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-400">Loading dashboard...</div>
      </div>
    );
  }

  const userBadges = data.user.badges.map((b) => b.toLowerCase());
  const myProjects: ProjectWithDays[] = data.campaigns.map(mapCampaignToProjectWithDays);
  const backedProjects: BaseProject[] = data.backedProjects.map(mapBackedProjectToBaseProject);
  const completedProjects: CompletedProject[] = data.campaigns
    .filter((c) => c.status === 'COMPLETED')
    .map(mapCampaignToCompletedProject);
  const analytics = mapStatsToFormattedAnalytics(data.stats);

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <header className="mb-4">
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-sm text-gray-700">
            All your projects, contributions, and applications in one place. Your dashboard evolves with your activity.
          </p>
        </header>
        <ActiveBadges badges={data.user.badges} />
        <StatsCards analytics={analytics} isLoading={false} />
        <ActivityOverview />
        <Tabs
          defaultValue={userBadges.includes('creator') ? 'myprojects' : userBadges[0] || 'myprojects'}
          className="w-full"
          onValueChange={setActiveTab}
          value={activeTab}
        >
          <TabsList className="grid w-full grid-cols-4">
            {userBadges.includes('creator') && (
              <TabsTrigger value="myprojects" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">My Projects</span>
              </TabsTrigger>
            )}
            {userBadges.includes('backer') && (
              <TabsTrigger value="trending" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Trending</span>
              </TabsTrigger>
            )}
            {userBadges.includes('backer') && (
              <TabsTrigger value="explore" className="flex items-center gap-2">
                <Compass className="h-4 w-4" />
                <span className="hidden sm:inline">Explore</span>
              </TabsTrigger>
            )}
            {userBadges.includes('creator') && (
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Completed</span>
              </TabsTrigger>
            )}
          </TabsList>
          <AnimatePresence mode="wait">
            {userBadges.includes('creator') && (
              <TabsContent value="myprojects" key="myprojects">
                <MyProjectsTab projects={myProjects} />
              </TabsContent>
            )}
            {userBadges.includes('backer') && (
              <TabsContent value="trending" key="trending">
                {/* TODO: Map to TrendingProject[] if needed */}
                <TrendingTab projects={[]} />
              </TabsContent>
            )}
            {userBadges.includes('backer') && (
              <TabsContent value="explore" key="explore">
                <ExploreTab projects={backedProjects} filter={exploreFilter} setFilter={setExploreFilter} />
              </TabsContent>
            )}
            {userBadges.includes('creator') && (
              <TabsContent value="completed" key="completed">
                <CompletedTab projects={completedProjects} sort={completedSort} setSort={setCompletedSort} />
              </TabsContent>
            )}
          </AnimatePresence>
        </Tabs>
        {/* Minimal call-to-action for unlocking more features */}
        <section className="mt-8">
          <div className="bg-gray-50 border rounded px-4 py-3 text-sm text-gray-700">
            Want to unlock more features?{' '}
            <span className="font-medium">
              Fund a project, launch a campaign, or complete your profile verification.
            </span>
          </div>
        </section>
        {/* Help Section */}
        <section className="mt-8 text-xs text-gray-500">
          <div className="mb-2">Need Help?</div>
          <ul className="list-disc ml-5 space-y-1">
            <li>
              <a href="/docs" className="underline">
                Docs – Learn how to use Boundless
              </a>
            </li>
            <li>
              <a href="/docs/escrow" className="underline">
                Smart Contract Guide
              </a>
            </li>
            <li>
              <a href="/community" className="underline">
                Community Forum
              </a>
            </li>
            <li>
              <a href="mailto:support@boundless.xyz" className="underline">
                Contact Us
              </a>
            </li>
          </ul>
        </section>
        {/* Footer */}
        <footer className="mt-8 text-xs text-gray-400 border-t pt-4">
          Boundless is a trustless crowdfunding and grant funding platform built on Stellar. Milestone-based smart
          escrows secure your progress and funding.
        </footer>
      </div>
    </div>
  );
}
