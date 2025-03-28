interface SeparatorProps {
	orientation?: "horizontal" | "vertical";
	className?: string;
}

export function Separator({
	orientation = "horizontal",
	className = "",
}: SeparatorProps) {
	return orientation === "horizontal" ? (
		<div className={`h-px w-full bg-gray-200 ${className}`} />
	) : (
		<div className={`h-full w-px bg-gray-200 ${className}`} />
	);
}
