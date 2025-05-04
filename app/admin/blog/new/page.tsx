import { BlogEditor } from "@/components/admin/BlogEditor";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create New Post | Boundless Admin",
	description: "Create a new blog post.",
};

export default function NewBlogPostPage() {
	return (
		<main className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-4xl font-bold mb-2">Create New Post</h1>
				<p className="text-muted-foreground">
					Write and publish a new blog post.
				</p>
			</div>
			<BlogEditor />
		</main>
	);
}
