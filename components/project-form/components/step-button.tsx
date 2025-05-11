"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

interface StepButtonProps {
	number: number;
	isActive: boolean;
	isCompleted: boolean;
	isDisabled?: boolean;
	onClick: () => void;
}

export const StepButton = React.memo(function StepButton({
	number,
	isActive,
	isCompleted,
	isDisabled = false,
	onClick,
}: StepButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={isDisabled}
			className={cn(
				"relative flex size-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors z-10",
				isCompleted
					? "border-primary bg-primary"
					: "border-zinc-200 dark:border-zinc-800",
				isActive ? "border-primary" : "",
				isDisabled
					? "opacity-50 cursor-not-allowed"
					: "hover:border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
			)}
		>
			<span
				className={cn(
					"text-sm font-medium",
					isCompleted
						? "text-primary-foreground"
						: isActive
							? "text-primary"
							: "text-zinc-500 dark:text-zinc-400",
				)}
			>
				{number}
			</span>
		</button>
	);
});
