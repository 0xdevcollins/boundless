import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "../shared/SkeletonCard";

export function DashboardLoadingState() {
	return (
		<div className="space-y-8">
			<Skeleton className="h-10 w-1/4" />

			{/* Stats skeleton */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{[...Array(4)].map((_, i) => (
					<div key={i + crypto.randomUUID()} className="rounded-lg border p-4 space-y-2">
						<Skeleton className="h-4 w-1/2" />
						<Skeleton className="h-8 w-1/3" />
					</div>
				))}
			</div>

			{/* Recent items skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="space-y-4">
					<Skeleton className="h-6 w-1/3" />
					{[...Array(3)].map((_, i) => (
						<SkeletonCard key={i + crypto.randomUUID()} />
					))}
				</div>
				<div className="space-y-4">
					<Skeleton className="h-6 w-1/3" />
					{[...Array(3)].map((_, i) => (
						<SkeletonCard key={i + crypto.randomUUID()} />
					))}
				</div>
			</div>

			{/* Funding overview skeleton */}
			<div className="space-y-4">
				<Skeleton className="h-6 w-1/3" />
				<Skeleton className="h-64 w-full" />
			</div>
		</div>
	);
}
