import { BlogComments } from "@/components/blog/BlogComments";
import { BlogPost } from "@/components/blog/BlogPost";
import { format } from "date-fns";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/blog/${slug}`,
	);
	const post = await response.json();

	if (!post) {
		return {
			title: "Post Not Found | Boundless",
		};
	}

	return {
		title: `${post.title} | Boundless Blog`,
		description: post.excerpt,
		openGraph: {
			title: post.title,
			description: post.excerpt,
			images: post.featuredImage ? [post.featuredImage] : [],
		},
	};
}

export default async function BlogPostPage({ params }: Props) {
	const { slug } = await params;
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/blog/${slug}`,
	);
	const post = await response.json();

	if (!post) {
		notFound();
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<article className="prose prose-lg mx-auto">
				{post.featuredImage && (
					<div className="relative aspect-video mb-8">
						<Image
							src={post.featuredImage}
							alt={post.title}
							fill
							className="object-cover rounded-lg"
						/>
					</div>
				)}
				<h1 className="text-4xl font-bold mb-4">{post.title}</h1>
				<div className="flex items-center gap-4 text-muted-foreground mb-8">
					{post.author.image && (
						<Image
							src={post.author.image}
							alt={post.author.name}
							width={40}
							height={40}
							className="rounded-full"
						/>
					)}
					<div>
						<p className="font-medium">{post.author.name}</p>
						<p className="text-sm">
							{format(new Date(post.publishedAt), "MMMM d, yyyy")}
						</p>
					</div>
				</div>
				<div className="mb-8">
					<BlogPost content={post.content} />
				</div>
				<div className="border-t pt-8">
					<BlogComments postSlug={slug} />
				</div>
			</article>
		</div>
	);
}
