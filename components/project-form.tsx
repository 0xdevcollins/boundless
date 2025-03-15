"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { signTransaction } from "@/hooks/useStellarWallet";
import createProject from "@/src/contracts/project_contract";
import { useWalletStore } from "@/store/useWalletStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const projectFormSchema = z.object({
	userId: z.string().min(1, "User ID is required"),
	title: z.string().min(1, "Title is required"),
	description: z.string().min(10, "Description must be at least 10 characters"),
	fundingGoal: z
		.string()
		.refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, {
			message: "Funding goal must be a positive number",
		}),
	category: z.string().min(1, "Category is required"),
	bannerImage: z.union([z.string().url(), z.instanceof(File)]).optional(),
	profileImage: z.union([z.string().url(), z.instanceof(File)]).optional(),
	walletAddress: z.string(),
	ileUrl: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const categories = [
	{ id: "tech", name: "Technology" },
	{ id: "art", name: "Art & Creative" },
	{ id: "community", name: "Community" },
	{ id: "education", name: "Education" },
];

export function ProjectForm({ userId }: { userId?: string }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState("");
	const { publicKey } = useWalletStore();

	const form = useForm<ProjectFormValues>({
		resolver: zodResolver(projectFormSchema),
		defaultValues: {
			userId,
			title: "",
			description: "",
			fundingGoal: "",
			category: "",
		},
	});

	// Set wallet address in form when publicKey changes
	useEffect(() => {
		if (publicKey) {
			form.setValue("walletAddress", publicKey);
			createProject.options.publicKey = publicKey;
			createProject.options.signTransaction = signTransaction;
		}
	}, [publicKey, form]);

	async function handleUploadMetadata(
		data: ProjectFormValues,
	): Promise<string> {
		setStatus("Uploading metadata...");

		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("description", data.description);
		formData.append("category", data.category);

		if (data.bannerImage instanceof File) {
			formData.append("bannerImage", data.bannerImage);
		}
		if (data.profileImage instanceof File) {
			formData.append("profileImage", data.profileImage);
		}

		const response = await fetch("/api/projects/upload-metadata", {
			method: "POST",
			body: formData,
		});

		const resData = await response.json();
		if (!response.ok) {
			throw new Error(resData.error || "Failed to upload metadata");
		}

		return resData.metadataUri;
	}

	async function onSubmit(data: ProjectFormValues) {
		try {
			setIsLoading(true);

			if (!publicKey) {
				throw new Error("Wallet is not connected");
			}

			const metadataUri = await handleUploadMetadata(data);

			const projectId = crypto.randomUUID();

			setStatus("Building transaction...");
			const tx = await createProject.create_project({
				project_id: projectId,
				creator: publicKey,
				metadata_uri: metadataUri,
				funding_target: BigInt(data.fundingGoal),
				milestone_count: 3,
			});

			setStatus("Signing transaction...");
			const { getTransactionResponse } = await tx.signAndSend();
			// const txHash = getTransactionResponse?.txHash;

			// console.log({ result, getTransactionResponse });
			setStatus("Sending signed transaction to server...");
			const formData = new FormData();
			formData.append("userId", userId || "");
			formData.append("title", data.title);
			formData.append("description", data.description);
			formData.append("fundingGoal", data.fundingGoal);
			formData.append("category", data.category);
			formData.append("projectId", projectId);
			formData.append("signedTx", getTransactionResponse?.txHash ?? "");
			formData.append("metadataUri", metadataUri);
			if (data.bannerImage) {
				if (typeof data.bannerImage === "string") {
					formData.append("bannerImageUrl", data.bannerImage);
				} else {
					formData.append("bannerImage", data.bannerImage);
				}
			}

			if (data.profileImage) {
				if (typeof data.profileImage === "string") {
					formData.append("profileImageUrl", data.profileImage);
				} else {
					formData.append("profileImage", data.profileImage);
				}
			}

			const response = await fetch("/api/projects/create", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Failed to create project");
			}

			toast.success("Project created successfully!");
			router.push("/projects");
			router.refresh();
		} catch (error) {
			toast.error(
				error instanceof Error
					? error.message
					: "Something went wrong. Please try again.",
			);
		} finally {
			setIsLoading(false);
			setStatus("");
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{status && <p className="text-sm bg-blue-100 p-2 rounded">{status}</p>}
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Project Title</FormLabel>
							<FormControl>
								<Input placeholder="Enter your project title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Describe your project..."
									className="min-h-[120px]"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="fundingGoal"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Funding Goal</FormLabel>
							<FormControl>
								<Input type="number" placeholder="Enter amount" {...field} />
							</FormControl>
							<FormDescription>Enter the amount in USD</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="category"
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
					name="bannerImage"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Banner Image</FormLabel>
							<FormControl>
								<div className="space-y-2">
									<Input
										type="file"
										accept="image/*"
										onChange={(e) => field.onChange(e.target.files?.[0])}
									/>
									<Input
										type="url"
										placeholder="Or enter image URL"
										onChange={(e) => field.onChange(e.target.value)}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="profileImage"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Profile Image</FormLabel>
							<FormControl>
								<div className="space-y-2">
									<Input
										type="file"
										accept="image/*"
										onChange={(e) => field.onChange(e.target.files?.[0])}
									/>
									<Input
										type="url"
										placeholder="Or enter image URL"
										onChange={(e) => field.onChange(e.target.value)}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Creating..." : "Create Project"}
				</Button>
			</form>
		</Form>
	);
}
