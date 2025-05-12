import type { Metadata } from "next";
import { ProjectViewerPage } from "./viewer/project-viewer-page";

type Props = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	try {
		const response = await fetch(
			`https://www.boundlessfi.xyz/api/projects/${id}`,
			{ next: { revalidate: 3600 } }, // Revalidate every hour
		);
		if (!response.ok) throw new Error("Failed to fetch project");

		const project = await response.json();

		return {
			title: project.title,
			description: project.description,
			openGraph: {
				title: project.title,
				description: project.description,
				images: project.bannerUrl ? [project.bannerUrl] : [],
			},
			twitter: {
				card: "summary_large_image",
				title: project.title,
				description: project.description,
				images: project.bannerUrl ? [project.bannerUrl] : [],
			},
		};
	} catch {
		return {
			title: "Project Not Found | Boundless",
			description: "The requested project could not be found.",
		};
	}
}

export default async function ProjectPage() {
	return <ProjectViewerPage />;
}
