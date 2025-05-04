import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/prisma";
import { Search } from "lucide-react";
import Link from "next/link";

interface BlogSidebarProps {
	selectedCategory?: string;
	selectedTag?: string;
}

export async function BlogSidebar({
	selectedCategory,
	selectedTag,
}: BlogSidebarProps) {
	const [categories, tags] = await Promise.all([
		prisma.category.findMany({
			include: {
				_count: {
					select: { posts: true },
				},
			},
			orderBy: { name: "asc" },
		}),
		prisma.tag.findMany({
			include: {
				_count: {
					select: { posts: true },
				},
			},
			orderBy: { name: "asc" },
		}),
	]);

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Search</CardTitle>
				</CardHeader>
				<CardContent>
					<form action="/blog" className="flex gap-2">
						<Input
							type="search"
							name="search"
							placeholder="Search posts..."
							className="flex-1"
						/>
						<Button type="submit" size="icon">
							<Search className="h-4 w-4" />
						</Button>
					</form>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Categories</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-2">
						{categories.map((category) => (
							<Link
								key={category.id}
								href={`/blog?category=${category.id}`}
								className="hover:no-underline"
							>
								<Badge
									variant={
										selectedCategory === category.id ? "default" : "secondary"
									}
									className="text-xs"
								>
									{category.name} ({category._count.posts})
								</Badge>
							</Link>
						))}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Tags</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-2">
						{tags.map((tag) => (
							<Link
								key={tag.id}
								href={`/blog?tag=${tag.id}`}
								className="hover:no-underline"
							>
								<Badge
									variant={selectedTag === tag.id ? "default" : "secondary"}
									className="text-xs"
								>
									{tag.name} ({tag._count.posts})
								</Badge>
							</Link>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
