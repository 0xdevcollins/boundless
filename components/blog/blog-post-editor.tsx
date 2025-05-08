"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const postSchema = z.object({
	title: z.string().min(1, "Title is required").max(255),
	content: z.string().min(1, "Content is required"),
	excerpt: z.string().optional(),
	featuredImage: z.string().optional(),
	categoryId: z.string().min(1, "Category is required"),
	tagIds: z.array(z.string()).optional(),
	published: z.boolean().default(false),
});

type PostFormValues = z.infer<typeof postSchema>;

interface BlogPostEditorProps {
	post?: {
		id: string;
		title: string;
		content: string;
		excerpt: string | null;
		featuredImage: string | null;
		categoryId: string;
		tags: { id: string }[];
		published: boolean;
	};
}

export function BlogPostEditor({ post }: BlogPostEditorProps) {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<PostFormValues>({
		resolver: zodResolver(postSchema),
		defaultValues: {
			title: post?.title || "",
			content: post?.content || "",
			excerpt: post?.excerpt || "",
			featuredImage: post?.featuredImage || "",
			categoryId: post?.categoryId || "",
			tagIds: post?.tags.map((tag) => tag.id) || [],
			published: post?.published || false,
		},
	});

	const onSubmit = async (data: PostFormValues) => {
		setIsSubmitting(true);
		try {
			const response = await fetch(
				post ? `/api/blog/posts/${post.id}` : "/api/blog/posts",
				{
					method: post ? "PUT" : "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				},
			);

			if (!response.ok) throw new Error("Failed to save post");

			const savedPost = await response.json();
			toast.success(`Post ${post ? "updated" : "created"} successfully.`);
			router.push(`/blog/${savedPost.slug}`);
		} catch {
			toast.error("Failed to save post. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const categories = [
		{ id: "cm9p3dhns00128zt5zcy72hdf", name: "Technology" },
		{ id: "2", name: "Science" },
		{ id: "3", name: "Art" },
		{ id: "4", name: "Music" },
		{ id: "5", name: "Food" },
		{ id: "6", name: "Travel" },
		{ id: "7", name: "Health" },
	];

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Enter post title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Content</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Write your post content..."
									className="min-h-[300px]"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="excerpt"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Excerpt</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Enter a brief excerpt..."
									className="min-h-[100px]"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="featuredImage"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Featured Image</FormLabel>
							<FormControl>
								<ImageUpload
									value={field.value || ""}
									onChange={field.onChange}
									onRemove={() => field.onChange("")}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="categoryId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a category" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{categories.map((category) => (
										<SelectItem key={category.id} value={category.id}>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="published"
					render={({ field }) => (
						<FormItem className="flex items-center justify-between rounded-lg border p-4">
							<div className="space-y-0.5">
								<FormLabel>Published</FormLabel>
								<div className="text-sm text-muted-foreground">
									Make this post visible to everyone
								</div>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<div className="flex justify-end gap-4">
					<Button type="button" variant="outline" onClick={() => router.back()}>
						Cancel
					</Button>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Saving..." : post ? "Update Post" : "Create Post"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
