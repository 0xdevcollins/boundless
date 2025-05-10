"use client";

import type { TrendingProject } from "@/types/project";
import { motion } from "framer-motion";
import TrendingProjectCard from "../trending-projects-card";

interface TrendingTabProps {
	projects: TrendingProject[];
}

export default function TrendingTab({ projects }: TrendingTabProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
		>
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-semibold">
					Highest Engagement Past 7 Days
				</h2>
			</div>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{projects.map((project) => (
					<TrendingProjectCard key={project.id} project={project} />
				))}
			</div>
		</motion.div>
	);
}
