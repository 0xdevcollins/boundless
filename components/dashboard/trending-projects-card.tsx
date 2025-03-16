"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { TrendingProject } from "@/types/project";
import { motion } from "framer-motion";
import Link from "next/link";

interface TrendingProjectCardProps {
	project: TrendingProject;
}

export default function TrendingProjectCard({
	project,
}: TrendingProjectCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.3 }}
		>
			<Card key={project.id}>
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="text-lg">{project.title}</CardTitle>
						<Badge>{project.category}</Badge>
					</div>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="space-y-2">
							<div className="flex items-center justify-between text-sm">
								<span>Progress</span>
								<span>{project.progress}%</span>
							</div>
							<Progress value={project.progress} className="h-2" />
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-sm text-muted-foreground">Raised</p>
								<p className="font-medium">{project.raised}</p>
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Goal</p>
								<p className="font-medium">{project.goal}</p>
							</div>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-sm text-muted-foreground">Engagement</span>
							<Badge variant="outline" className="text-green-600">
								{project.engagementChange}
							</Badge>
						</div>
						<Link href={project.href}>
							<Button className="w-full">View Details</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
