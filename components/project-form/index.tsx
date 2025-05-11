"use client";

import { Form } from "@/components/ui/form";
import { getXLMPrice } from "@/utils/price";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormActions } from "./components/form-actions";
import { FormContent } from "./components/form-content";
import { ProgressTracker } from "./components/progress-tracker";
import { StepNavigation } from "./components/step-navigation";
import { type ProjectFormValues, projectFormSchema, steps } from "./types";

export function ProjectForm() {
	const [currentStep, setCurrentStep] = useState(1);
	const [xlmPrice, setXLMPrice] = useState<number | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showPreview, setShowPreview] = useState(false);
	const router = useRouter();

	const form = useForm<ProjectFormValues>({
		resolver: zodResolver(projectFormSchema),
		defaultValues: {
			userId: "",
			walletAddress: "",
			teamMembers: [],
			milestones: [],
			pitchDeck: undefined,
			whitepaper: undefined,
		},
		mode: "onChange",
	});

	// Fetch XLM price on component mount
	useEffect(() => {
		const fetchXLMPrice = async () => {
			try {
				const price = await getXLMPrice();
				setXLMPrice(price);
			} catch (error) {
				console.error("Failed to fetch XLM price:", error);
			}
		};
		fetchXLMPrice();
	}, []);

	// Calculate step completion
	const getStepCompletion = (step: number): boolean => {
		const fields = getFieldsForStep(step - 1);
		const values = form.getValues();
		return fields.every((field) => {
			const value = values[field];
			if (Array.isArray(value)) {
				return value.length > 0;
			}
			return !!value;
		});
	};

	// Calculate overall progress
	const calculateProgress = () => {
		const totalSteps = steps.length - 1; // Exclude review step
		const completedSteps = steps
			.slice(0, -1)
			.filter((_, index) => getStepCompletion(index + 1)).length;
		return (completedSteps / totalSteps) * 100;
	};

	const handleNavigation = async (step: number) => {
		if (step < 1 || step > steps.length) return;

		// If moving to review step, just update the step without validation
		if (step === steps.length) {
			setCurrentStep(step);
			return;
		}

		const fields = getFieldsForStep(currentStep - 1);
		const isValid = await form.trigger(fields);
		if (isValid) {
			setCurrentStep(step);
		} else {
			// Show error toast if validation fails
			toast.error("Please fill in all required fields before proceeding");
		}
	};

	const handleSubmit = async (data: ProjectFormValues) => {
		try {
			setIsSubmitting(true);

			const projectId = nanoid();

			// Create form data for file uploads
			const formData = new FormData();
			formData.append("projectId", projectId);
			formData.append("title", data.title);
			formData.append("description", data.description);
			formData.append("fundingGoal", String(data.fundingGoal));
			formData.append("category", data.category);

			// Handle image uploads
			if (data.bannerImage instanceof File) {
				formData.append("bannerImage", data.bannerImage);
			} else if (typeof data.bannerImage === "string") {
				formData.append("bannerImageUrl", data.bannerImage);
			}

			if (data.profileImage instanceof File) {
				formData.append("profileImage", data.profileImage);
			} else if (typeof data.profileImage === "string") {
				formData.append("profileImageUrl", data.profileImage);
			}

			// Handle document uploads
			if (data.pitchDeck instanceof File) {
				formData.append("pitchDeck", data.pitchDeck);
			} else if (typeof data.pitchDeck === "string") {
				formData.append("pitchDeckUrl", data.pitchDeck);
			}

			if (data.whitepaper instanceof File) {
				formData.append("whitepaper", data.whitepaper);
			} else if (typeof data.whitepaper === "string") {
				formData.append("whitepaperUrl", data.whitepaper);
			}

			// Create the project first
			const response = await fetch("/api/projects/create", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.message || "Failed to create project");
			}

			const { project } = await response.json();

			// Create team members if any
			if (data.teamMembers.length > 0) {
				try {
					const teamResponse = await fetch(`/api/projects/${project.id}/team`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							teamMembers: data.teamMembers.map((member) => ({
								userId: member.userId,
								role: member.role || "Team Member", // Provide default role if empty
								fullName: member.user?.name || "Team Member", // Use user's name or default
							})),
						}),
					});

					if (!teamResponse.ok) {
						const error = await teamResponse.json();
						throw new Error(error.message || "Failed to add team members");
					}
				} catch (error) {
					console.error("Failed to add team members:", error);
					// Continue with project creation even if team member addition fails
					toast.warning("Project created but failed to add team members", {
						description:
							"You can add team members later from the project settings.",
					});
				}
			}

			// Create milestones if any
			if (data.milestones.length > 0) {
				try {
					const milestonesResponse = await fetch(
						`/api/projects/${project.id}/milestones`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								milestones: data.milestones.map((milestone) => ({
									title: milestone.title,
									description: milestone.description,
									dueDate: milestone.dueDate,
									color: milestone.color,
									progress: milestone.progress || 0,
								})),
							}),
						},
					);

					if (!milestonesResponse.ok) {
						const error = await milestonesResponse.json();
						throw new Error(error.message || "Failed to add milestones");
					}
				} catch (error) {
					console.error("Failed to add milestones:", error);
					// Continue with project creation even if milestone addition fails
					toast.warning("Project created but failed to add milestones", {
						description:
							"You can add milestones later from the project settings.",
					});
				}
			}

			toast.success("Project created successfully", {
				description: "Your project has been created and is now live.",
			});
			router.push(`/projects/${project.id}`);
		} catch (error: unknown) {
			console.error("Failed to create project:", error);
			toast.error("Failed to create project", {
				description:
					error instanceof Error ? error.message : "Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	// Helper function to get fields to validate for each step
	const getFieldsForStep = (step: number): (keyof ProjectFormValues)[] => {
		switch (step) {
			case 0: // Basic Info
				return ["title", "description", "fundingGoal", "category"];
			case 1: // Team
				return ["teamMembers"];
			case 2: // Milestones
				return ["milestones"];
			case 3: // Documents
				return ["pitchDeck", "whitepaper"];
			default:
				return [];
		}
	};

	return (
		<Form {...form}>
			<form
				onKeyDown={(e) => {
					// Prevent form submission on Enter key
					if (e.key === "Enter") {
						e.preventDefault();
					}
				}}
				className="space-y-8"
			>
				{/* Progress Bar */}
				<ProgressTracker progress={calculateProgress()} />

				<div className="flex flex-col md:flex-row gap-6">
					{/* Step Navigation Cards */}
					<StepNavigation
						steps={steps}
						currentStep={currentStep}
						getStepCompletion={getStepCompletion}
						onNavigate={handleNavigation}
					/>

					{/* Form Content */}
					<FormContent
						form={form}
						currentStep={currentStep}
						xlmPrice={xlmPrice}
						formActions={
							<FormActions
								currentStep={currentStep}
								totalSteps={steps.length}
								isSubmitting={isSubmitting}
								onPrevious={() => handleNavigation(currentStep - 1)}
								onNext={() => handleNavigation(currentStep + 1)}
								onSubmit={() => form.handleSubmit(handleSubmit)()}
								showPreview={showPreview}
								setShowPreview={setShowPreview}
								formData={form.getValues()}
							/>
						}
					/>
				</div>
			</form>
		</Form>
	);
}
