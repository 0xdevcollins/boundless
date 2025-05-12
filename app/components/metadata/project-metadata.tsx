import type { Metadata } from "next";

type ProjectMetadataProps = {
	title: string;
	description: string;
	image?: string | null;
	category?: string;
	fundingGoal?: number;
	creator?: {
		name: string | null;
		image: string | null;
	};
};

export function generateProjectMetadata({
	title,
	description,
	image,
	category,
	fundingGoal,
	creator,
}: ProjectMetadataProps): Metadata {
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://boundlessfi.xyz";
	const imageUrl = image ? `${siteUrl}${image}` : `${siteUrl}/og-image.png`;

	return {
		title: `${title} | Boundless`,
		description,
		openGraph: {
			title: `${title} | Boundless`,
			description,
			url: `${siteUrl}/projects/${title}`,
			siteName: "Boundless",
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
			locale: "en_US",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: `${title} | Boundless`,
			description,
			images: [imageUrl],
			creator: creator?.name || "@boundless",
		},
		other: {
			"og:price:amount": fundingGoal?.toString() || "0",
			"og:price:currency": "USD",
			"og:availability": "in_stock",
			"og:category": category || "Project",
		},
	};
}
