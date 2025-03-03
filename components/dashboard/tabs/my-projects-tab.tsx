"use client";

import type { ProjectWithDays } from "@/types/project";
import ProjectCard from "../project-card";
import { motion } from "framer-motion";

interface MyProjectsTabProps {
	projects: ProjectWithDays[];
}

export default function MyProjectsTab({ projects }: MyProjectsTabProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
		>
			{projects.map((project) => (
				<ProjectCard key={project.id} project={project} />
			))}
		</motion.div>
	);
}
