"use client";

import ProfileDisplay from "@/components/dashboard/profile/ProfileDisplay";
import ProfileEditForm from "@/components/dashboard/profile/ProfileEditForm";
import type { UserProfile } from "@/types/user";
import axios from "axios";
import { AlertCircle, Loader2 } from "lucide-react";
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
			<div className="mx-auto py-8 px-4">
				<div className="bg-white rounded-xl shadow-sm p-8">
					<div className="flex items-center justify-center h-96">
						<Loader2 className="w-8 h-8 animate-spin text-primary" />
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="mx-auto py-8 px-4">
				<div className="bg-white rounded-xl shadow-sm p-8">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="rounded-full bg-red-50 p-3">
							<AlertCircle className="h-6 w-6 text-red-600" />
						</div>
						<h2 className="text-xl font-semibold text-gray-900">
							Error Loading Profile
						</h2>
						<p className="text-gray-600 max-w-md">{error}</p>
						<button
							type="button"
							onClick={() => window.location.reload()}
							className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
						>
							Try Again
						</button>
					</div>
				</div>
			</div>
		);
	}

	if (!userData) {
		return (
			<div className="mx-auto py-8 px-4">
				<div className="bg-white rounded-xl shadow-sm p-8">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="rounded-full bg-gray-50 p-3">
							<AlertCircle className="h-6 w-6 text-gray-600" />
						</div>
						<h2 className="text-xl font-semibold text-gray-900">
							No Profile Found
						</h2>
						<p className="text-gray-600 max-w-md">
							We couldn&apos;t find your profile information. Please try again
							later.
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto px-4">
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
				<ProfileDisplay userData={userData} onEdit={() => setIsEditing(true)} />
			)}
		</div>
	);
}
