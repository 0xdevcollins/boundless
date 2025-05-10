"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const SearchBar = ({
	onSearch = (term: string) => {
		void term;
	},
	placeholder = "Search...",
	showClearButton = true,
	debounceTime = 300,
	className = "",
	containerStyles = "",
	inputStyles = "",
	searchIconStyles = "",
	clearButtonStyles = "",
	clearIconStyles = "",
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedTerm(searchTerm);
		}, debounceTime);

		return () => {
			clearTimeout(timer);
		};
	}, [searchTerm, debounceTime]);

	useEffect(() => {
		onSearch(debouncedTerm);
	}, [debouncedTerm, onSearch]);

	const handleClear = () => {
		setSearchTerm("");
	};

	return (
		<div
			className={`relative w-full max-w-lg ${className} ${containerStyles}`}
			id={debouncedTerm}
		>
			<div className="relative">
				<Search
					size={18}
					className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 ${searchIconStyles}`}
				/>
				<Input
					type="text"
					placeholder={placeholder}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className={`pl-10 pr-8 ${inputStyles}`}
				/>
				{showClearButton && searchTerm && (
					<button
						type="button"
						onClick={handleClear}
						className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 ${clearButtonStyles}`}
						aria-label="Clear search"
					>
						<X size={16} className={clearIconStyles} />
					</button>
				)}
			</div>
		</div>
	);
};

export default SearchBar;
