import type { TooltipProps } from "recharts";

const CustomTooltip = ({
	active,
	payload,
	label,
}: TooltipProps<number, string>) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-background border rounded p-3 shadow-lg">
				<p className="font-semibold">{label}</p>
				{payload.map((entry) => (
					<div
						key={`tooltip-${entry.dataKey}`}
						className="flex items-center gap-2 text-sm mt-1"
					>
						<div
							className="w-3 h-3 rounded-full"
							style={{ backgroundColor: entry.color }}
						/>
						<span>{entry.dataKey}: </span>
						<span className="font-medium">{entry.value?.toLocaleString()}</span>
					</div>
				))}
			</div>
		);
	}
	return null;
};

export default CustomTooltip;
