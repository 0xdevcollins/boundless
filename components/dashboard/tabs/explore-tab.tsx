"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { BaseProject, ExploreFilter } from "@/types/project";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import ProjectCard from "../project-card";

interface ExploreTabProps {
	projects: BaseProject[];
	filter: ExploreFilter;
	setFilter: Dispatch<SetStateAction<ExploreFilter>>;
}

export default function ExploreTab({
	projects,
	filter,
	setFilter,
}: ExploreTabProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
		>
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-semibold">
					{filter === "newest"
						? "Newest Projects"
						: filter === "popular"
							? "Most Popular Projects"
							: "Projects Ending Soon"}
				</h2>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="flex items-center gap-2">
							<Filter className="h-4 w-4" />
							Filter:{" "}
							{filter === "newest"
								? "Newest"
								: filter === "popular"
									? "Most Popular"
									: "Ending Soon"}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => setFilter("newest")}>
							Newest
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setFilter("popular")}>
							Most Popular
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setFilter("ending")}>
							Ending Soon
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{projects.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</motion.div>
	);
}
