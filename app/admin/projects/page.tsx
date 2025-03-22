import { ProjectsList } from "@/components/projects/project-list";

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
	return (
		<div className="container py-8">
			<h1 className="text-3xl font-bold mb-8">Projects</h1>
			<ProjectsList />
		</div>
	);
}
