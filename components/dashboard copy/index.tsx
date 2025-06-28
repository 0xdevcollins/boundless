'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatePresence } from 'framer-motion';
import { CheckCircle, Compass, TrendingUp, Wallet } from 'lucide-react';
import { useState } from 'react';

import { completedProjects, exploreProjects, myProjects, trendingProjects } from '@/data/mock-data';
import type { CompletedSort, ExploreFilter } from '@/types/project';

import { useDashboardAnalytics } from '@/hooks/use-dashboard-analytics';
import ActivityOverview from './activity-overview';
import StatsCards from './stats-cards';
import CompletedTab from './tabs/completed-tab';
import ExploreTab from './tabs/explore-tab';
import MyProjectsTab from './tabs/my-projects-tab';
import TrendingTab from './tabs/trending-tab';

export default function Dashboard() {
  const [exploreFilter, setExploreFilter] = useState<ExploreFilter>('newest');
  const [completedSort, setCompletedSort] = useState<CompletedSort>('date');
  const [activeTab, setActiveTab] = useState('myprojects');
  const { analytics, isLoading } = useDashboardAnalytics();

  const allExploreProjects = [...myProjects, ...trendingProjects, ...exploreProjects];

  const getFilteredExploreProjects = () => {
    if (exploreFilter === 'newest') {
      return exploreProjects;
    }

    if (exploreFilter === 'popular') {
      return [...allExploreProjects].sort((a, b) => b.progress - a.progress).slice(0, 3);
    }

    if (exploreFilter === 'ending') {
      const projectsWithDays = [...myProjects, ...trendingProjects].sort((a, b) => a.daysLeft - b.daysLeft).slice(0, 3);
      return projectsWithDays;
    }

    return exploreProjects;
  };

  const filteredExploreProjects = getFilteredExploreProjects();

  const sortedCompletedProjects = [...completedProjects].sort((a, b) => {
    if (completedSort === 'date') {
      return new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime();
    }

    if (completedSort === 'size') {
      const aValue = Number.parseFloat(a.totalRaised.replace(/[^0-9.-]+/g, ''));
      const bValue = Number.parseFloat(b.totalRaised.replace(/[^0-9.-]+/g, ''));
      return bValue - aValue;
    }

    if (completedSort === 'category') {
      return a.category.localeCompare(b.category);
    }

    return 0;
  });

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          {/* <ConnectWalletButton /> */}

          {/* <Button>
						<Wallet className="mr-2 h-4 w-4" />
						Connect Wallet
						</Button> */}
        </div>
        <p className='text-xs mb-3'>
          Everything you&apos;ve created, backed, applied for, or explored all in one place. Your dashboard evolves with
          your activity.
        </p>

        <StatsCards analytics={analytics} isLoading={isLoading} />
        <ActivityOverview />

        <Tabs
					defaultValue="myprojects"
					className="w-full"
					onValueChange={setActiveTab}
					value={activeTab}
				>
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger value="myprojects" className="flex items-center gap-2">
							<Wallet className="h-4 w-4" />
							<span className="hidden sm:inline">My Projects</span>
						</TabsTrigger>
						<TabsTrigger value="trending" className="flex items-center gap-2">
							<TrendingUp className="h-4 w-4" />
							<span className="hidden sm:inline">Trending</span>
						</TabsTrigger>
						<TabsTrigger value="explore" className="flex items-center gap-2">
							<Compass className="h-4 w-4" />
							<span className="hidden sm:inline">Explore</span>
						</TabsTrigger>
						<TabsTrigger value="completed" className="flex items-center gap-2">
							<CheckCircle className="h-4 w-4" />
							<span className="hidden sm:inline">Completed</span>
						</TabsTrigger>
					</TabsList>

					<AnimatePresence mode="wait">
						<TabsContent value="myprojects" key="myprojects">
							<MyProjectsTab projects={myProjects} />
						</TabsContent>

						<TabsContent value="trending" key="trending">
							<TrendingTab projects={trendingProjects} />
						</TabsContent>

						<TabsContent value="explore" key="explore">
							<ExploreTab
								projects={filteredExploreProjects}
								filter={exploreFilter}
								setFilter={setExploreFilter}
							/>
						</TabsContent>

						<TabsContent value="completed" key="completed">
							<CompletedTab
								projects={sortedCompletedProjects}
								sort={completedSort}
								setSort={setCompletedSort}
							/>
						</TabsContent>
					</AnimatePresence>
				</Tabs>
      </div>
    </div>
  );
}
