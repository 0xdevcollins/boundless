import { generateProjectMetadata } from "@/app/components/metadata/project-metadata";
import { ProjectViewerPage } from "./viewer/project-viewer-page";
import type { Metadata } from 'next';

type Props = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	try {
		const { id } = await params;
		const response = await fetch(
			`https://www.boundlessfi.xyz/api/projects/${id}`,
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
