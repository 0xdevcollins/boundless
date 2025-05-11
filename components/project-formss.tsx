"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Progress } from "@/components/ui/progress";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { signTransaction } from "@/hooks/useStellarWallet";
import { contractClient } from "@/src/contracts/boundless_contract";
import { useWalletStore } from "@/store/useWalletStore";
import { convertUSDToStroops, getXLMPrice } from "@/utils/price";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	ArrowLeft,
	ArrowRight,
	DollarSign,
	FileImage,
	FileText,
	Loader2,
	Plus,
	Upload,
} from "lucide-react";
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
	// Team members
	teamMembers: z
		.array(
			z.object({
				id: z.string().default(() => crypto.randomUUID()),
				fullName: z.string().min(1, "Full name is required"),
				role: z.string().min(1, "Role is required"),
				bio: z.string().optional(),
				profileImage: z
					.union([z.string().url(), z.instanceof(File)])
					.optional(),
				github: z.string().url().optional(),
				twitter: z.string().url().optional(),
				discord: z.string().optional(),
				linkedin: z.string().url().optional(),
			}),
		)
		.default([]),
	// Milestones
	milestones: z
		.array(
			z.object({
				id: z.string().default(() => crypto.randomUUID()),
				title: z.string().min(1, "Title is required"),
				description: z.string().min(1, "Description is required"),
				dueDate: z.string().optional(),
				progress: z.number().min(0).max(100).default(0),
				color: z.string().default("#3b82f6"), // Default blue color
			}),
		)
		.default([]),
	// Documents
	pitchDeck: z.union([z.string().url(), z.instanceof(File)]).optional(),
	whitepaper: z.union([z.string().url(), z.instanceof(File)]).optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

const categories = [
	{ id: "tech", name: "Technology" },
	{ id: "art", name: "Art & Creative" },
	{ id: "community", name: "Community" },
	{ id: "education", name: "Education" },
];

type Step = "basic" | "team" | "milestones" | "documents" | "review";

export function ProjectForm({ userId }: { userId?: string }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState("");
	const [progress, setProgress] = useState(0);
	const [xlmPrice, setXlmPrice] = useState<number | null>(null);
	const [currentStep, setCurrentStep] = useState<Step>("basic");
	const { publicKey } = useWalletStore();

	const form = useForm<ProjectFormValues>({
		resolver: zodResolver(projectFormSchema),
		defaultValues: {
			userId,
			title: "",
			description: "",
			fundingGoal: "",
			category: "",
			teamMembers: [],
			milestones: [],
		},
	});

	useEffect(() => {
		const fetchPrice = async () => {
			try {
				const price = await getXLMPrice();
				setXlmPrice(price);
			} catch (error) {
				console.error("Failed to fetch XLM price:", error);
			}
		};
		fetchPrice();
	}, []);

	useEffect(() => {
		if (publicKey) {
			form.setValue("walletAddress", publicKey);
			contractClient.options.publicKey = publicKey;
			contractClient.options.signTransaction = signTransaction;
		}
	}, [publicKey, form]);

	const steps: { id: Step; title: string; description: string }[] = [
		{
			id: "basic",
			title: "Basic Information",
			description: "Project details and funding goal",
		},
		{
			id: "team",
			title: "Team Information",
			description: "Add your team members",
		},
		{
			id: "milestones",
			title: "Project Milestones",
			description: "Define your project roadmap",
		},
		{
			id: "documents",
			title: "Documents",
			description: "Upload pitch deck and whitepaper",
		},
		{
			id: "review",
			title: "Review",
			description: "Review and submit your project",
		},
	];

	const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
	const isLastStep = currentStepIndex === steps.length - 1;
	const isFirstStep = currentStepIndex === 0;

	const nextStep = () => {
		const nextStepIndex = currentStepIndex + 1;
		if (nextStepIndex < steps.length) {
			setCurrentStep(steps[nextStepIndex].id);
		}
	};

	const prevStep = () => {
		const prevStepIndex = currentStepIndex - 1;
		if (prevStepIndex >= 0) {
			setCurrentStep(steps[prevStepIndex].id);
		}
	};

	async function handleUploadMetadata(
		data: ProjectFormValues,
	): Promise<string> {
		setStatus("Uploading metadata...");
		setProgress(25);

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
			setProgress(10);

			if (!publicKey) {
				throw new Error("Wallet is not connected");
			}

			if (!xlmPrice) {
				throw new Error("Failed to fetch XLM price. Please try again.");
			}

			const metadataUri = await handleUploadMetadata(data);

			const projectId = crypto.randomUUID();

			setStatus("Building transaction...");
			setProgress(50);
			const tx = await contractClient.create_project({
				project_id: projectId,
				creator: publicKey,
				metadata_uri: metadataUri,
				funding_target: convertUSDToStroops(Number(data.fundingGoal), xlmPrice),
				milestone_count: data.milestones.length,
			});

			setStatus("Signing transaction...");
			setProgress(75);
			const { getTransactionResponse } = await tx.signAndSend();

			setStatus("Sending signed transaction to server...");
			setProgress(85);
			const formData = new FormData();
			formData.append("userId", userId || "");
			formData.append("title", data.title);
			formData.append("description", data.description);
			formData.append("fundingGoal", data.fundingGoal);
			formData.append("category", data.category);
			formData.append("projectId", projectId);
			formData.append("signedTx", getTransactionResponse?.txHash ?? "");
			formData.append("metadataUri", metadataUri);

			// Append team members
			formData.append("teamMembers", JSON.stringify(data.teamMembers));

			// Append milestones
			formData.append("milestones", JSON.stringify(data.milestones));

			// Append documents
			if (data.pitchDeck instanceof File) {
				formData.append("pitchDeck", data.pitchDeck);
			}
			if (data.whitepaper instanceof File) {
				formData.append("whitepaper", data.whitepaper);
			}

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

			setProgress(100);
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

	const renderStepContent = () => {
		switch (currentStep) {
			case "basic":
				return (
					<div className="space-y-6">
						<div>
							<h3 className="text-lg font-medium">Project Details</h3>
							<p className="text-sm text-muted-foreground">
								Basic information about your project
							</p>
							<Separator className="my-4" />
						</div>

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
											className="min-h-[150px] resize-none"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Provide a clear and compelling description of your project
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="fundingGoal"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Funding Goal</FormLabel>
										<FormControl>
											<div className="relative">
												<DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
												<Input
													type="number"
													placeholder="Amount in USD"
													className="pl-9"
													{...field}
												/>
											</div>
										</FormControl>
										<FormDescription>
											{xlmPrice && field.value && (
												<span className="text-sm text-muted-foreground">
													≈ {(Number(field.value) / xlmPrice).toFixed(2)} XLM
												</span>
											)}
										</FormDescription>
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
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
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
						</div>

						<div className="grid gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="bannerImage"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Banner Image</FormLabel>
										<FormControl>
											<div className="space-y-3">
												<div className="flex items-center gap-2 rounded-md border border-dashed p-4">
													<FileImage className="h-5 w-5 text-muted-foreground" />
													<Input
														type="file"
														accept="image/*"
														className="border-0 p-0 shadow-none"
														onChange={(e) =>
															field.onChange(e.target.files?.[0])
														}
													/>
												</div>
												<div className="relative">
													<Input
														type="url"
														placeholder="Or enter image URL"
														onChange={(e) => field.onChange(e.target.value)}
													/>
												</div>
											</div>
										</FormControl>
										<FormDescription>
											Banner image will be displayed at the top of your project
											page
										</FormDescription>
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
											<div className="space-y-3">
												<div className="flex items-center gap-2 rounded-md border border-dashed p-4">
													<FileImage className="h-5 w-5 text-muted-foreground" />
													<Input
														type="file"
														accept="image/*"
														className="border-0 p-0 shadow-none"
														onChange={(e) =>
															field.onChange(e.target.files?.[0])
														}
													/>
												</div>
												<div className="relative">
													<Input
														type="url"
														placeholder="Or enter image URL"
														onChange={(e) => field.onChange(e.target.value)}
													/>
												</div>
											</div>
										</FormControl>
										<FormDescription>
											Profile image will be displayed in project cards and
											headers
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				);

			case "team":
				return (
					<div className="space-y-6">
						<div>
							<h3 className="text-lg font-medium">Team Information</h3>
							<p className="text-sm text-muted-foreground">
								Add your team members and their roles
							</p>
							<Separator className="my-4" />
						</div>

						<div className="space-y-4">
							{form.watch("teamMembers").map((member) => (
								<Card key={member.id} className="p-4">
									<div className="flex items-center justify-between">
										<h4 className="font-medium">
											Team Member {member.fullName}
										</h4>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => {
												const members = form.getValues("teamMembers");
												members.splice(members.indexOf(member), 1);
												form.setValue("teamMembers", members);
											}}
										>
											Remove
										</Button>
									</div>

									<div className="mt-4 grid gap-4 md:grid-cols-2">
										<FormField
											control={form.control}
											name={`teamMembers.${form.watch("teamMembers").indexOf(member)}.fullName`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Full Name</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`teamMembers.${form.watch("teamMembers").indexOf(member)}.role`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Role</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`teamMembers.${form.watch("teamMembers").indexOf(member)}.bio`}
											render={({ field }) => (
												<FormItem className="md:col-span-2">
													<FormLabel>Bio</FormLabel>
													<FormControl>
														<Textarea
															className="min-h-[100px] resize-none"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`teamMembers.${form.watch("teamMembers").indexOf(member)}.profileImage`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Profile Image</FormLabel>
													<FormControl>
														<div className="space-y-3">
															<div className="flex items-center gap-2 rounded-md border border-dashed p-4">
																<FileImage className="h-5 w-5 text-muted-foreground" />
																<Input
																	type="file"
																	accept="image/*"
																	className="border-0 p-0 shadow-none"
																	onChange={(e) =>
																		field.onChange(e.target.files?.[0])
																	}
																/>
															</div>
															<div className="relative">
																<Input
																	type="url"
																	placeholder="Or enter image URL"
																	onChange={(e) =>
																		field.onChange(e.target.value)
																	}
																/>
															</div>
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<div className="grid gap-4 md:grid-cols-2">
											<FormField
												control={form.control}
												name={`teamMembers.${form.watch("teamMembers").indexOf(member)}.github`}
												render={({ field }) => (
													<FormItem>
														<FormLabel>GitHub</FormLabel>
														<FormControl>
															<Input {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name={`teamMembers.${form.watch("teamMembers").indexOf(member)}.twitter`}
												render={({ field }) => (
													<FormItem>
														<FormLabel>Twitter</FormLabel>
														<FormControl>
															<Input {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name={`teamMembers.${form.watch("teamMembers").indexOf(member)}.discord`}
												render={({ field }) => (
													<FormItem>
														<FormLabel>Discord</FormLabel>
														<FormControl>
															<Input {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name={`teamMembers.${form.watch("teamMembers").indexOf(member)}.linkedin`}
												render={({ field }) => (
													<FormItem>
														<FormLabel>LinkedIn</FormLabel>
														<FormControl>
															<Input {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>
								</Card>
							))}

							<Button
								type="button"
								variant="outline"
								className="w-full"
								onClick={() => {
									form.setValue("teamMembers", [
										...form.watch("teamMembers"),
										{
											id: crypto.randomUUID(),
											fullName: "",
											role: "",
											bio: "",
											profileImage: "",
											github: "",
											twitter: "",
											discord: "",
											linkedin: "",
										},
									]);
								}}
							>
								<Plus className="mr-2 h-4 w-4" /> Add Team Member
							</Button>
						</div>
					</div>
				);

			case "milestones":
				return (
					<div className="space-y-6">
						<div>
							<h3 className="text-lg font-medium">Project Milestones</h3>
							<p className="text-sm text-muted-foreground">
								Define your project roadmap and key milestones
							</p>
							<Separator className="my-4" />
						</div>

						<div className="space-y-4">
							{form.watch("milestones").map((milestone) => (
								<Card key={milestone.id} className="p-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<div
												className="h-4 w-4 rounded-full"
												style={{
													backgroundColor: form.watch(
														`milestones.${form.watch("milestones").indexOf(milestone)}.color`,
													),
												}}
											/>
											<h4 className="font-medium">
												Milestone {milestone.title}
											</h4>
										</div>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => {
												const milestones = form.getValues("milestones");
												milestones.splice(milestones.indexOf(milestone), 1);
												form.setValue("milestones", milestones);
											}}
										>
											Remove
										</Button>
									</div>

									<div className="mt-4 space-y-4">
										<FormField
											control={form.control}
											name={`milestones.${form.watch("milestones").indexOf(milestone)}.title`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Title</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name={`milestones.${form.watch("milestones").indexOf(milestone)}.description`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Description</FormLabel>
													<FormControl>
														<Textarea
															className="min-h-[100px] resize-none"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<div className="grid gap-4 md:grid-cols-2">
											<FormField
												control={form.control}
												name={`milestones.${form.watch("milestones").indexOf(milestone)}.dueDate`}
												render={({ field }) => (
													<FormItem>
														<FormLabel>Due Date</FormLabel>
														<FormControl>
															<Input type="date" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name={`milestones.${form.watch("milestones").indexOf(milestone)}.color`}
												render={({ field }) => (
													<FormItem>
														<FormLabel>Color</FormLabel>
														<FormControl>
															<div className="flex items-center gap-2">
																<Input
																	type="color"
																	{...field}
																	className="h-10 w-20 cursor-pointer rounded-md border p-1"
																/>
																<div
																	className="h-8 w-8 rounded-full border"
																	style={{ backgroundColor: field.value }}
																/>
															</div>
														</FormControl>
														<FormDescription>
															Choose a color to represent this milestone
														</FormDescription>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<FormField
											control={form.control}
											name={`milestones.${form.watch("milestones").indexOf(milestone)}.progress`}
											render={({ field }) => (
												<FormItem>
													<div className="flex items-center justify-between">
														<FormLabel>Progress</FormLabel>
														<span className="text-sm text-muted-foreground">
															{field.value}%
														</span>
													</div>
													<FormControl>
														<div className="space-y-2">
															<Input
																type="range"
																min="0"
																max="100"
																step="1"
																{...field}
																onChange={(e) =>
																	field.onChange(Number(e.target.value))
																}
																className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary"
																style={{
																	background: `linear-gradient(to right, ${form.watch(
																		`milestones.${form.watch("milestones").indexOf(milestone)}.color`,
																	)} ${field.value}%, var(--secondary) ${field.value}%)`,
																}}
															/>
															<div className="flex justify-between text-xs text-muted-foreground">
																<span>0%</span>
																<span>50%</span>
																<span>100%</span>
															</div>
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</Card>
							))}

							<Button
								type="button"
								variant="outline"
								className="w-full"
								onClick={() => {
									const milestones = form.getValues("milestones");
									form.setValue("milestones", [
										...milestones,
										{
											id: crypto.randomUUID(),
											title: "",
											description: "",
											dueDate: "",
											progress: 0,
											color: "#3b82f6", // Default blue color
										},
									]);
								}}
							>
								<Plus className="mr-2 h-4 w-4" /> Add Milestone
							</Button>
						</div>
					</div>
				);

			case "documents":
				return (
					<div className="space-y-6">
						<div>
							<h3 className="text-lg font-medium">Project Documents</h3>
							<p className="text-sm text-muted-foreground">
								Upload your pitch deck and whitepaper
							</p>
							<Separator className="my-4" />
						</div>

						<div className="grid gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="pitchDeck"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Pitch Deck</FormLabel>
										<FormControl>
											<div className="space-y-3">
												<div className="flex items-center gap-2 rounded-md border border-dashed p-4">
													<FileText className="h-5 w-5 text-muted-foreground" />
													<Input
														type="file"
														accept=".pdf,.ppt,.pptx"
														className="border-0 p-0 shadow-none"
														onChange={(e) =>
															field.onChange(e.target.files?.[0])
														}
													/>
												</div>
												<div className="relative">
													<Input
														type="url"
														placeholder="Or enter document URL"
														onChange={(e) => field.onChange(e.target.value)}
													/>
												</div>
											</div>
										</FormControl>
										<FormDescription>
											Upload your project pitch deck (PDF, PPT, or PPTX)
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="whitepaper"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Whitepaper</FormLabel>
										<FormControl>
											<div className="space-y-3">
												<div className="flex items-center gap-2 rounded-md border border-dashed p-4">
													<FileText className="h-5 w-5 text-muted-foreground" />
													<Input
														type="file"
														accept=".pdf"
														className="border-0 p-0 shadow-none"
														onChange={(e) =>
															field.onChange(e.target.files?.[0])
														}
													/>
												</div>
												<div className="relative">
													<Input
														type="url"
														placeholder="Or enter document URL"
														onChange={(e) => field.onChange(e.target.value)}
													/>
												</div>
											</div>
										</FormControl>
										<FormDescription>
											Upload your project whitepaper (PDF)
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				);

			case "review":
				return (
					<div className="space-y-6">
						<div>
							<h3 className="text-lg font-medium">Review Project</h3>
							<p className="text-sm text-muted-foreground">
								Review your project details before submission
							</p>
							<Separator className="my-4" />
						</div>

						<div className="space-y-6">
							<Card>
								<CardHeader>
									<CardTitle>Basic Information</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div>
										<h4 className="font-medium">Title</h4>
										<p className="text-muted-foreground">
											{form.watch("title")}
										</p>
									</div>
									<div>
										<h4 className="font-medium">Description</h4>
										<p className="text-muted-foreground">
											{form.watch("description")}
										</p>
									</div>
									<div className="grid gap-4 md:grid-cols-2">
										<div>
											<h4 className="font-medium">Funding Goal</h4>
											<p className="text-muted-foreground">
												${form.watch("fundingGoal")}
											</p>
										</div>
										<div>
											<h4 className="font-medium">Category</h4>
											<p className="text-muted-foreground">
												{form.watch("category")}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Team Members</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{form.watch("teamMembers").map((member) => (
											<div key={member.id} className="flex items-start gap-4">
												<Avatar className="h-10 w-10">
													<AvatarImage
														src={
															typeof member.profileImage === "string"
																? member.profileImage
																: undefined
														}
													/>
													<AvatarFallback>
														{member.fullName
															.split(" ")
															.map((n) => n[0])
															.join("")}
													</AvatarFallback>
												</Avatar>
												<div>
													<h4 className="font-medium">{member.fullName}</h4>
													<p className="text-sm text-muted-foreground">
														{member.role}
													</p>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Milestones</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{form.watch("milestones").map((milestone) => (
											<div key={milestone.id} className="space-y-2">
												<div className="flex items-center gap-2">
													<div
														className="h-3 w-3 rounded-full"
														style={{
															backgroundColor: milestone.color,
														}}
													/>
													<h4 className="font-medium">{milestone.title}</h4>
												</div>
												<p className="text-sm text-muted-foreground">
													{milestone.description}
												</p>
												<div className="flex items-center gap-4 text-sm text-muted-foreground">
													{milestone.dueDate && (
														<span>
															Due:{" "}
															{new Date(milestone.dueDate).toLocaleDateString()}
														</span>
													)}
													<div className="flex items-center gap-2">
														<span>Progress:</span>
														<div className="h-2 w-24 rounded-full bg-secondary">
															<div
																className="h-full rounded-full"
																style={{
																	width: `${milestone.progress}%`,
																	backgroundColor: milestone.color,
																}}
															/>
														</div>
														<span>{milestone.progress}%</span>
													</div>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Documents</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div>
											<h4 className="font-medium">Pitch Deck</h4>
											<p className="text-sm text-muted-foreground">
												{form.watch("pitchDeck")
													? "Document uploaded"
													: "No document uploaded"}
											</p>
										</div>
										<div>
											<h4 className="font-medium">Whitepaper</h4>
											<p className="text-sm text-muted-foreground">
												{form.watch("whitepaper")
													? "Document uploaded"
													: "No document uploaded"}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<Card className="shadow-md">
			<CardContent className="pt-6">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{isLoading && (
							<div className="mb-6 space-y-2">
								<div className="flex items-center space-x-2">
									<Loader2 className="h-4 w-4 animate-spin text-primary" />
									<p className="text-sm font-medium text-primary">{status}</p>
								</div>
								<Progress value={progress} className="h-2" />
							</div>
						)}

						<div className="flex items-center justify-between">
							<div>
								<h2 className="text-2xl font-bold">
									{steps[currentStepIndex].title}
								</h2>
								<p className="text-sm text-muted-foreground">
									{steps[currentStepIndex].description}
								</p>
							</div>
							<div className="flex items-center space-x-2">
								<span className="text-sm text-muted-foreground">
									Step {currentStepIndex + 1} of {steps.length}
								</span>
							</div>
						</div>

						<Separator />

						{renderStepContent()}

						<div className="flex justify-between pt-4">
							<Button
								type="button"
								variant="outline"
								onClick={prevStep}
								disabled={isFirstStep}
							>
								<ArrowLeft className="mr-2 h-4 w-4" />
								Previous
							</Button>

							{isLastStep ? (
								<Button
									type="submit"
									disabled={isLoading}
									className="w-full md:w-auto"
									size="lg"
								>
									{isLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Creating Project...
										</>
									) : (
										<>
											<Upload className="mr-2 h-4 w-4" />
											Create Project
										</>
									)}
								</Button>
							) : (
								<Button
									type="button"
									onClick={nextStep}
									className="w-full md:w-auto"
									size="lg"
								>
									Next
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							)}
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
