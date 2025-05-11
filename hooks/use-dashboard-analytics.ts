import { useUserStore } from "@/store/userStore";
import { formatCurrency, formatMillions } from "@/utils/utils";
import { useEffect, useState } from "react";

export interface FormattedAnalytics {
	contributions: {
		value: string;
		rawValue: number;
		growth: string;
		growthValue: number;
		isPositiveGrowth: boolean;
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
	roi: {
		value: string;
		rawValue: number;
		isPositive: boolean;
	};
	isLoading: boolean;
}

export const useDashboardAnalytics = () => {
	const {
		fetchUserProfile,
		getAnalytics,
		isLoading: isStoreLoading,
		user,
	} = useUserStore();

	const [isLoading, setIsLoading] = useState(true);
	const [analytics, setAnalytics] = useState<FormattedAnalytics | null>(null);

	// Format percentage for display
	const formatPercentage = (value: number): string => {
		return `${value > 0 ? "+" : ""}${value}%`;
	};

	// Format large numbers in millions

	// Fetch data and format analytics
	const fetchAndFormatAnalytics = async () => {
		setIsLoading(true);

		// Fetch user profile if not already loaded
		if (!user) {
			await fetchUserProfile();
		}

		// Get analytics from store
		const {
			totalContributions,
			monthlyGrowth,
			activeProjects,
			pendingMilestones,
			successfulExits,
			totalExitValue,
			averageROI,
		} = getAnalytics();

		// Format data for UI
		const formattedAnalytics: FormattedAnalytics = {
			contributions: {
				value: formatCurrency(totalContributions),
				rawValue: totalContributions,
				growth: formatPercentage(monthlyGrowth),
				growthValue: monthlyGrowth,
				isPositiveGrowth: monthlyGrowth >= 0,
			},
			activeProjects: {
				count: activeProjects,
				pendingMilestones,
			},
			successfulExits: {
				count: successfulExits,
				totalValue: formatMillions(totalExitValue),
				rawTotalValue: totalExitValue,
			},
			roi: {
				value: formatPercentage(averageROI),
				rawValue: averageROI,
				isPositive: averageROI >= 0,
			},
			isLoading: false,
		};

		setAnalytics(formattedAnalytics);
		setIsLoading(false);
	};

	// Initial data fetch
	useEffect(() => {
		fetchAndFormatAnalytics();
	}, []);

	// Re-fetch when store loading state changes
	useEffect(() => {
		if (!isStoreLoading && isLoading) {
			fetchAndFormatAnalytics();
		}
	}, [isStoreLoading]);

	// Utility method to refresh data
	const refreshAnalytics = () => {
		fetchAndFormatAnalytics();
	};

	return {
		analytics,
		isLoading: isLoading || isStoreLoading,
		refreshAnalytics,
		fetchUserProfile,
	};
};
