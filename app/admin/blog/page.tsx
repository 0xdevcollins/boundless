import { AdminBlogList } from "@/components/admin/AdminBlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog Management | Boundless Admin",
	description: "Manage blog posts and content.",
};

export default function AdminBlogPage() {
	return (
		<main className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="text-4xl font-bold mb-2">Blog Management</h1>
				<p className="text-muted-foreground">
					Create, edit, and manage blog posts.
				</p>
			</div>
			<AdminBlogList />
		</main>
	);
}
