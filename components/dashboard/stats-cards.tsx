import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FormattedAnalytics } from '@/hooks/use-dashboard-analytics';

interface StatsCardsProps {
  analytics: FormattedAnalytics | null;
  isLoading?: boolean;
}

export default function StatsCards({ analytics, isLoading = false }: StatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
{[...Array(4)].map(() => (
  <Card key={`Card+${crypto.randomUUID()}`}>
    <CardHeader className="pb-2">
      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
    </CardHeader>
    <CardContent>
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-2 animate-pulse" />
      <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
    </CardContent>
  </Card>
))}
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <p>No analytics data available</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.contributions.value}</div>
          <span className={`text-xs ${analytics.contributions.isPositiveGrowth ? 'text-green-500' : 'text-red-500'}`}>
            {analytics.contributions.growth} from last month
          </span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.activeProjects.count}</div>
          <p className="text-xs text-muted-foreground">
            {analytics.activeProjects.pendingMilestones} pending milestone approval
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Successful Exits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.successfulExits.count}</div>
          <p className="text-xs text-muted-foreground">Total value: {analytics.successfulExits.totalValue}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">ROI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${analytics.roi.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {analytics.roi.value}
          </div>
          <p className="text-xs text-muted-foreground">Avg. across all projects</p>
        </CardContent>
      </Card>
    </div>
  );
}
