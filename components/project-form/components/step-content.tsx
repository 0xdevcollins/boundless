import { cn } from "@/lib/utils";
import * as React from "react";

interface StepContentProps {
	title: string;
	description?: string;
	isActive: boolean;
	isDisabled?: boolean;
}

export const StepContent = React.memo(function StepContent({
	title,
	description,
	isActive,
	isDisabled = false,
}: StepContentProps) {
	return (
		<div
			className={cn(
				"bg-muted rounded-lg px-6 py-4",
				isDisabled && "opacity-50",
			)}
		>
			<h3
				className={cn(
					"text-lg font-medium",
					isActive ? "text-primary" : "text-zinc-900 dark:text-zinc-200",
				)}
			>
				{title}
			</h3>
			{description && (
				<p className="text-sm text-zinc-600 dark:text-zinc-500">
					{description}
				</p>
			)}
		</div>
	);
});
