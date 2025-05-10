"use client";

import { Button } from "@/components/ui/button";
import type { UserProfile } from "@/types/user";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

	return (
		<div className="space-y-6">
			<div className="relative h-48 w-full overflow-hidden rounded-t-lg">
				{bannerImage ? (
					<Image src={bannerImage} alt="Banner" fill className="object-cover" />
				) : (
					<div className="h-full w-full bg-gray-200" />
				)}
			</div>
			<div className="relative px-6">
				<div className="absolute -top-16">
					{image ? (
						<Image
							src={image}
							alt={name}
							width={128}
							height={128}
							className="rounded-full border-4 border-white"
						/>
					) : (
						<div className="h-32 w-32 rounded-full border-4 border-white bg-gray-200" />
					)}
				</div>
				<div className="mt-16">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-2xl font-bold">{name}</h2>
							{bio && <p className="mt-2 text-gray-600">{bio}</p>}
						</div>
						<Button onClick={onEdit}>Edit Profile</Button>
					</div>
					<div className="mt-6 grid grid-cols-3 gap-4">
						<div className="rounded-lg bg-gray-50 p-4">
							<p className="text-sm text-gray-500">Total Contributions</p>
							<p className="mt-1 text-2xl font-semibold">
								{totalContributions}
							</p>
						</div>
						<div className="rounded-lg bg-gray-50 p-4">
							<p className="text-sm text-gray-500">Votes</p>
							<p className="mt-1 text-2xl font-semibold">{votes}</p>
						</div>
						<div className="rounded-lg bg-gray-50 p-4">
							<p className="text-sm text-gray-500">Funded Projects</p>
							<p className="mt-1 text-2xl font-semibold">{fundedProjects}</p>
						</div>
					</div>
					<div className="mt-6 flex space-x-4">
						{twitter && (
							<Link
								href={twitter}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-600 hover:text-gray-900"
							>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<title>Twitter Icon</title>
									<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
								</svg>
							</Link>
						)}
						{linkedin && (
							<Link
								href={linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-600 hover:text-gray-900"
							>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<title>LinkedIn Icon</title>
									<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.06-1.601-1-1.601-1 0-1.16.781-1.16 1.601v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
								</svg>
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
