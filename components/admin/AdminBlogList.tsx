"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BlogPost {
	id: string;
	title: string;
	slug: string;
	published: boolean;
	publishedAt: string | null;
	author: {
		name: string;
	};
	category: {
		name: string;
	};
}

export function AdminBlogList() {
	const router = useRouter();
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch("/api/blog");
				const data = await response.json();
				setPosts(data.posts);
			} catch (error) {
				console.error("Error fetching posts:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	const handleDelete = async (slug: string) => {
		if (!confirm("Are you sure you want to delete this post?")) return;

		try {
			const response = await fetch(`/api/blog/${slug}`, {
				method: "DELETE",
			});

			if (response.ok) {
				setPosts((prev) => prev.filter((post) => post.slug !== slug));
			}
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	};

	return (
		<div>
			<div className="mb-6">
				<Button asChild>
					<Link href="/admin/blog/new">Create New Post</Link>
				</Button>
			</div>

			{loading ? (
				<div className="space-y-4">
					{[...Array(5)].map(() => (
						<Skeleton key={crypto.randomUUID()} className="h-12 w-full" />
					))}
				</div>
			) : posts.length === 0 ? (
				<p className="text-muted-foreground">No posts found.</p>
			) : (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Author</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Published</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{posts.map((post) => (
							<TableRow key={post.id}>
								<TableCell className="font-medium">{post.title}</TableCell>
								<TableCell>{post.author.name}</TableCell>
								<TableCell>{post.category.name}</TableCell>
								<TableCell>
									<span
										className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
											post.published
												? "bg-green-100 text-green-800"
												: "bg-yellow-100 text-yellow-800"
										}`}
									>
										{post.published ? "Published" : "Draft"}
									</span>
								</TableCell>
								<TableCell>
									{post.publishedAt
										? format(new Date(post.publishedAt), "MMM d, yyyy")
										: "-"}
								</TableCell>
								<TableCell className="text-right">
									<div className="flex justify-end gap-2">
										<Button
											variant="ghost"
											size="icon"
											onClick={() => router.push(`/admin/blog/${post.slug}`)}
										>
											<Pencil className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => handleDelete(post.slug)}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	);
}
