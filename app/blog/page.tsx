import { BlogList } from "@/components/blog/BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog | Boundless",
	description:
		"Read the latest updates, stories, and articles about crowdfunding and blockchain technology.",
};

export default function BlogPage() {
	return (
		<main className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-4xl font-bold mb-2">Blog</h1>
				<p className="text-muted-foreground">
					Stay updated with the latest news and insights about crowdfunding and
					blockchain technology.
				</p>
			</div>
			<BlogList />
		</main>
	);
}
