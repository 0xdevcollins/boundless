"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { UserProfile } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const profileSchema = z.object({
	name: z.string().min(1, "Name is required"),
	bio: z.string().optional(),
	twitter: z.string().optional(),
	linkedin: z.string().optional(),
	image: z.string().optional(),
	bannerImage: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileEditFormProps {
	initialData: UserProfile;
	onSuccess: (data: UserProfile) => void;
	onCancel: () => void;
}

export default function ProfileEditForm({
	initialData,
	onSuccess,
	onCancel,
}: ProfileEditFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: initialData.name,
			bio: initialData.bio,
			twitter: initialData.twitter,
			linkedin: initialData.linkedin,
			image: initialData.image,
			bannerImage: initialData.bannerImage,
		},
	});

	const onSubmit = async (data: ProfileFormData) => {
		setIsSubmitting(true);
		setError(null);
		try {
			const response = await axios.put("/api/user/profile", data);
			onSuccess(response.data);
			toast.success("Profile updated successfully");
		} catch (error) {
			console.error("Error updating profile:", error);
			setError("Failed to update profile. Please try again.");
			toast.error("Failed to update profile");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="bg-white rounded-xl shadow-sm">
			<div className="px-8 py-6 border-b border-gray-100">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
					<Button
						variant="ghost"
						size="icon"
						onClick={onCancel}
						className="text-gray-500 hover:text-gray-700"
					>
						<X className="w-5 h-5" />
					</Button>
				</div>
			</div>

			<form onSubmit={form.handleSubmit(onSubmit)} className="p-8">
				{error && (
					<Alert variant="destructive" className="mb-6">
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				<div className="space-y-8">
					{/* Images Section */}
					<div className="grid gap-8 md:grid-cols-2">
						<div className="space-y-4">
							<Label className="text-sm font-medium text-gray-700">
								Banner Image
							</Label>
							<div className="rounded-lg border border-gray-200 p-4">
								<ImageUpload
									value={form.watch("bannerImage") || ""}
									onChange={(url) => form.setValue("bannerImage", url)}
									onRemove={() => form.setValue("bannerImage", "")}
								/>
							</div>
						</div>

						<div className="space-y-4">
							<Label className="text-sm font-medium text-gray-700">
								Profile Picture
							</Label>
							<div className="rounded-lg border border-gray-200 p-4">
								<ImageUpload
									value={form.watch("image") || ""}
									onChange={(url) => form.setValue("image", url)}
									onRemove={() => form.setValue("image", "")}
								/>
							</div>
						</div>
					</div>

					{/* Basic Info Section */}
					<div className="space-y-6">
						<div>
							<Label
								htmlFor="name"
								className="text-sm font-medium text-gray-700"
							>
								Display Name
							</Label>
							<Input
								id="name"
								{...form.register("name")}
								className="mt-2 bg-white"
								placeholder="Enter your display name"
							/>
							{form.formState.errors.name && (
								<p className="mt-1 text-sm text-red-600">
									{form.formState.errors.name.message}
								</p>
							)}
						</div>

						<div>
							<Label
								htmlFor="bio"
								className="text-sm font-medium text-gray-700"
							>
								Bio
							</Label>
							<Textarea
								id="bio"
								{...form.register("bio")}
								rows={4}
								className="mt-2 bg-white resize-none"
								placeholder="Tell us about yourself"
							/>
							{form.formState.errors.bio && (
								<p className="mt-1 text-sm text-red-600">
									{form.formState.errors.bio.message}
								</p>
							)}
						</div>
					</div>

					{/* Social Links Section */}
					<div className="space-y-6">
						<h3 className="text-sm font-medium text-gray-900">Social Links</h3>
						<div className="grid gap-6 md:grid-cols-2">
							<div>
								<Label
									htmlFor="twitter"
									className="text-sm font-medium text-gray-700"
								>
									Twitter URL
								</Label>
								<Input
									id="twitter"
									{...form.register("twitter")}
									className="mt-2 bg-white"
									placeholder="https://twitter.com/yourusername"
								/>
								{form.formState.errors.twitter && (
									<p className="mt-1 text-sm text-red-600">
										{form.formState.errors.twitter.message}
									</p>
								)}
							</div>

							<div>
								<Label
									htmlFor="linkedin"
									className="text-sm font-medium text-gray-700"
								>
									LinkedIn URL
								</Label>
								<Input
									id="linkedin"
									{...form.register("linkedin")}
									className="mt-2 bg-white"
									placeholder="https://linkedin.com/in/yourusername"
								/>
								{form.formState.errors.linkedin && (
									<p className="mt-1 text-sm text-red-600">
										{form.formState.errors.linkedin.message}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="mt-8 flex justify-end space-x-4">
					<Button
						type="button"
						variant="outline"
						onClick={onCancel}
						disabled={isSubmitting}
						className="bg-white"
					>
						Cancel
					</Button>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? (
							<>
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
								Saving...
							</>
						) : (
							"Save Changes"
						)}
					</Button>
				</div>
			</form>
		</div>
	);
}
