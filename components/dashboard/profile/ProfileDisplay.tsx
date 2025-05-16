"use client";

import { Button } from "@/components/ui/button";
import { useIsAdmin } from "@/hooks/use-is-admin";
import type { UserProfile } from "@/types/user";
import {
	Award,
	Linkedin,
	Loader2,
	ThumbsUp,
	Twitter,
	Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
// import { cn } from "@/lib/utils";

interface ProfileDisplayProps {
	userData: UserProfile;
	onEdit: () => void;
	isLoading?: boolean;
}

export default function ProfileDisplay({
	userData,
	onEdit,
	isLoading = false,
}: ProfileDisplayProps) {
	const {
		name,
		bio,
		bannerImage,
		image,
		twitter,
		linkedin,
		totalContributions = 0,
		votes = 0,
		fundedProjects = 0,
	} = userData;

	if (isLoading) {
		return (
			<div className="w-full h-96 flex items-center justify-center">
				<Loader2 className="w-8 h-8 animate-spin text-primary" />
			</div>
		);
	}
	const router = useRouter();
	const isAdmin = useIsAdmin();
	return (
		<div className="bg-white rounded-xl shadow-sm overflow-hidden max-w-5xl mx-auto">
			{/* Banner Section */}
			<div className="relative h-32 sm:h-40 md:h-48 lg:h-56 w-full bg-gradient-to-r from-blue-500 to-purple-600">
				{bannerImage && (
					<Image
						src={bannerImage}
						alt="Banner"
						fill
						className="object-cover opacity-90"
						priority
					/>
				)}
			</div>

			<div className="px-4 sm:px-6 md:px-8 lg:px-12 pb-6 sm:pb-8 lg:pb-12">
				<div className="flex flex-col sm:flex-row sm:items-end -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24 mb-6 sm:mb-8 lg:mb-12">
					<div className="relative mx-auto sm:mx-0">
						<div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-xl border-4 border-white bg-white shadow-lg overflow-hidden">
							{image ? (
								<Image
									src={image}
									alt={name}
									fill
									className="object-cover"
									priority
								/>
							) : (
								<div className="w-full h-full bg-gray-100 flex items-center justify-center">
									<span className="text-3xl sm:text-4xl lg:text-5xl text-gray-400">
										{name.charAt(0)}
									</span>
								</div>
							)}
						</div>
					</div>
					<div className="mt-4 sm:mt-0 sm:ml-6 lg:ml-8 flex-1 text-center sm:text-left">
						<div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
							<div className="max-w-2xl">
								<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
									{name}
								</h1>
								{bio && (
									<p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-600">
										{bio}
									</p>
								)}
							</div>
							<div className="space-x-5">
								<Button
									onClick={onEdit}
									className="bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 w-full sm:w-auto px-6 py-2 text-sm sm:text-base"
								>
									Edit Profile
								</Button>
								{isAdmin && (
									<Button
										onClick={() => router.push("/admin")}
										className="bg-primary text-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 w-full sm:w-auto px-6 py-2 text-sm sm:text-base"
									>
										Admin
									</Button>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Stats Section */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
					<div className="bg-gray-50 rounded-xl p-4 sm:p-6 lg:p-8 flex items-center space-x-4 lg:space-x-6">
						<div className="p-2 sm:p-3 lg:p-4 bg-blue-100 rounded-lg">
							<Award className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-600" />
						</div>
						<div>
							<p className="text-sm sm:text-base lg:text-lg font-medium text-gray-600">
								Total Contributions
							</p>
							<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
								{totalContributions}
							</p>
						</div>
					</div>
					<div className="bg-gray-50 rounded-xl p-4 sm:p-6 lg:p-8 flex items-center space-x-4 lg:space-x-6">
						<div className="p-2 sm:p-3 lg:p-4 bg-green-100 rounded-lg">
							<ThumbsUp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-green-600" />
						</div>
						<div>
							<p className="text-sm sm:text-base lg:text-lg font-medium text-gray-600">
								Votes
							</p>
							<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
								{votes}
							</p>
						</div>
					</div>
					<div className="bg-gray-50 rounded-xl p-4 sm:p-6 lg:p-8 flex items-center space-x-4 lg:space-x-6">
						<div className="p-2 sm:p-3 lg:p-4 bg-purple-100 rounded-lg">
							<Wallet className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-purple-600" />
						</div>
						<div>
							<p className="text-sm sm:text-base lg:text-lg font-medium text-gray-600">
								Funded Projects
							</p>
							<p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
								{fundedProjects}
							</p>
						</div>
					</div>
				</div>

				{/* Social Links */}
				{(twitter || linkedin) && (
					<div className="flex items-center justify-center sm:justify-start space-x-4 lg:space-x-6">
						{twitter && (
							<Link
								href={twitter}
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 sm:p-3 lg:p-4 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
								aria-label="Twitter Profile"
							>
								<Twitter className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
							</Link>
						)}
						{linkedin && (
							<Link
								href={linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 sm:p-3 lg:p-4 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
								aria-label="LinkedIn Profile"
							>
								<Linkedin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
							</Link>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
