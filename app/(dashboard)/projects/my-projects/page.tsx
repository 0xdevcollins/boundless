import { MyProjectsList } from "@/components/projects/my-project-list";

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
	return (
		<div className="container py-8">
			<h1 className="text-3xl font-bold mb-8">My Projects</h1>
			<MyProjectsList />
		</div>
	);
}
