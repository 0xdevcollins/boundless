"use client";

import ProfileDisplay from "@/components/dashboard/profile/ProfileDisplay";
import ProfileEditForm from "@/components/dashboard/profile/ProfileEditForm";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { UserProfile } from "@/types/user";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function ProfilePage() {
	const [userData, setUserData] = useState<UserProfile | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchUserData() {
			try {
				setIsLoading(true);
				setError(null);
				const res = await axios.get("/api/user/profile");
				setUserData(res.data);
			} catch (error) {
				console.error("Error fetching user data:", error);
				setError("Failed to load profile data. Please try again later.");
			} finally {
				setIsLoading(false);
			}
		}
		fetchUserData();
	}, []);

	if (isLoading) {
		return (
			<div className="container mx-auto max-w-4xl py-8 px-4">
				<Card className="p-6">
					<div className="space-y-6">
						<div className="flex items-center space-x-4">
							<Skeleton className="h-12 w-12 rounded-full" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-[200px]" />
								<Skeleton className="h-4 w-[150px]" />
							</div>
						</div>
						<div className="space-y-2">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-[80%]" />
						</div>
						<div className="space-y-2">
							<Skeleton className="h-4 w-[60%]" />
							<Skeleton className="h-4 w-[40%]" />
						</div>
					</div>
				</Card>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto max-w-4xl py-8 px-4">
				<Card className="p-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="rounded-full bg-red-100 p-3">
							<svg
								className="h-6 w-6 text-red-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>Error Icon</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<h2 className="text-xl font-semibold text-gray-900">
							Error Loading Profile
						</h2>
						<p className="text-gray-600">{error}</p>
						<button
							type="button"
							onClick={() => window.location.reload()}
							className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						>
							Try Again
						</button>
					</div>
				</Card>
			</div>
		);
	}

	if (!userData) {
		return (
			<div className="container mx-auto max-w-4xl py-8 px-4">
				<Card className="p-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="rounded-full bg-gray-100 p-3">
							<svg
								className="h-6 w-6 text-gray-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>Profile Icon</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
						</div>
						<h2 className="text-xl font-semibold text-gray-900">
							No Profile Found
						</h2>
						<p className="text-gray-600">
							We couldn&apos;t find your profile information.
						</p>
					</div>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto max-w-4xl py-8 px-4">
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900">Profile</h1>
				<p className="mt-2 text-sm text-gray-600">
					Manage your profile information and preferences
				</p>
			</div>
			<Card className="overflow-hidden">
				{isEditing ? (
					<ProfileEditForm
						initialData={userData}
						onSuccess={(updatedData) => {
							setUserData(updatedData);
							setIsEditing(false);
						}}
						onCancel={() => setIsEditing(false)}
					/>
				) : (
					<ProfileDisplay
						userData={userData}
						onEdit={() => setIsEditing(true)}
					/>
				)}
			</Card>
		</div>
	);
}
