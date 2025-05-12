import { generateProjectMetadata } from "@/app/components/metadata/project-metadata";
import { ProjectViewerPage } from "./viewer/project-viewer-page";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_SITE_URL}/api/projects/${id}`,
			{ next: { revalidate: 3600 } }, // Revalidate every hour
		);
		if (!response.ok) throw new Error("Failed to fetch project");

		const project = await response.json();

		return generateProjectMetadata({
			title: project.title,
			description: project.description,
			image: project.bannerUrl,
			category: project.category,
			fundingGoal: project.fundingGoal,
			creator: project.user,
		});
	} catch {
		return {
			title: "Project Not Found | Boundless",
			description: "The requested project could not be found.",
		};
	}
}

export default function ProjectPage() {
	return <ProjectViewerPage />;
}
