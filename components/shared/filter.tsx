import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface FilterProps<T> {
	categories: T[];
	selectedCategory: T;
	onChange: (selected: T) => void;
	label?: string;
	allLabel?: string;
}

export default function Filter<T extends string | number>({
	categories,
	selectedCategory,
	onChange,
	label = "Filter by",
	// allLabel = "All",
}: FilterProps<T>) {
	return (
		<Select
			onValueChange={(value) => onChange(value as T)}
			value={selectedCategory?.toString() || ""}
		>
			<SelectTrigger className="flex items-center gap-2 w-full sm:w-[150px]">
				<SelectValue placeholder={label} />
			</SelectTrigger>
			<SelectContent>
				{categories.map((category) => (
					<SelectItem key={category.toString()} value={category.toString()}>
						{category}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
