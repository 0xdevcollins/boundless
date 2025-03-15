"use client";

import { Button } from "@/components/ui/button";
import type { CompletedProject, CompletedSort } from "@/types/project";
import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import CompletedProjectCard from "../completed-project-card";

interface CompletedTabProps {
	projects: CompletedProject[];
	sort: CompletedSort;
	setSort: Dispatch<SetStateAction<CompletedSort>>;
}

export default function CompletedTab({
	projects,
	sort,
	setSort,
}: CompletedTabProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
		>
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-semibold">
					Successfully Completed Projects
				</h2>
				<div className="flex items-center gap-2">
					<Button
						variant={sort === "category" ? "default" : "outline"}
						size="sm"
						onClick={() => setSort("category")}
					>
						Category{" "}
						{sort === "category" && <ArrowUpDown className="ml-2 h-3 w-3" />}
					</Button>
					<Button
						variant={sort === "date" ? "default" : "outline"}
						size="sm"
						onClick={() => setSort("date")}
					>
						Date {sort === "date" && <ArrowUpDown className="ml-2 h-3 w-3" />}
					</Button>
					<Button
						variant={sort === "size" ? "default" : "outline"}
						size="sm"
						onClick={() => setSort("size")}
					>
						Size {sort === "size" && <ArrowUpDown className="ml-2 h-3 w-3" />}
					</Button>
				</div>
			</div>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{projects.map((project) => (
					<CompletedProjectCard key={project.id} project={project} />
				))}
			</div>
		</motion.div>
	);
}
