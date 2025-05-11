import { Progress } from "@/components/ui/progress";

interface ProgressTrackerProps {
	progress: number;
}

export function ProgressTracker({ progress }: ProgressTrackerProps) {
	return (
		<div className="space-y-3">
			<div className="space-y-1.5">
				<div className="flex justify-between text-xs text-muted-foreground">
					<span>Project Progress</span>
					<span>{Math.round(progress)}%</span>
				</div>
				<Progress value={progress} className="h-1.5" />
			</div>
		</div>
	);
}
