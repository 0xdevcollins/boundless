"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TeamMember } from "@/types/project";
import {
	ChevronDown,
	ChevronUp,
	Github,
	Linkedin,
	MessageSquare,
	Plus,
	Twitter,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface TeamSectionProps {
	teamMembers: TeamMember[];
	isTeamMember: boolean;
	projectId: string;
}

export function TeamSection({
	teamMembers,
	isTeamMember,
	projectId,
}: TeamSectionProps) {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>Team Members</CardTitle>
					{isTeamMember && (
						<Button size="sm">
							<Plus className="mr-2 h-4 w-4" /> Add Member
						</Button>
					)}
				</div>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{teamMembers.length > 0 ? (
						teamMembers.map((member) => (
							<TeamMemberCard
								key={member.id + projectId}
								member={member}
								isTeamMember={isTeamMember}
							/>
						))
					) : (
						<div className="col-span-full text-center py-8 text-muted-foreground">
							No team members added yet
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

function TeamMemberCard({
	member,
	isTeamMember,
}: { member: TeamMember; isTeamMember: boolean }) {
	const [expanded, setExpanded] = useState(false);

	// Check if member has any social links
	const hasSocialLinks =
		member.github || member.twitter || member.discord || member.linkedin;

	return (
		<div className="rounded-lg border overflow-hidden">
			<div className="flex items-start gap-4 p-4">
				<Avatar className="h-14 w-14">
					<AvatarImage
						src={member.profileImage || "/placeholder.svg"}
						alt={member.fullName}
					/>
					<AvatarFallback>
						{member.fullName.substring(0, 2).toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1 min-w-0">
					<div className="font-medium truncate">{member.fullName}</div>
					<div className="text-sm text-muted-foreground">{member.role}</div>

					{/* Social Links */}
					{hasSocialLinks && (
						<div className="flex gap-2 mt-2">
							{member.github && (
								<Link
									href={
										member.github.startsWith("http")
											? member.github
											: `https://github.com/${member.github}`
									}
									target="_blank"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									<Github className="h-4 w-4" />
								</Link>
							)}
							{member.twitter && (
								<Link
									href={
										member.twitter.startsWith("http")
											? member.twitter
											: `https://twitter.com/${member.twitter}`
									}
									target="_blank"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									<Twitter className="h-4 w-4" />
								</Link>
							)}
							{member.discord && (
								<div
									className="text-muted-foreground"
									title={`Discord: ${member.discord}`}
								>
									<MessageSquare className="h-4 w-4" />
								</div>
							)}
							{member.linkedin && (
								<Link
									href={
										member.linkedin.startsWith("http")
											? member.linkedin
											: `https://linkedin.com/in/${member.linkedin}`
									}
									target="_blank"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									<Linkedin className="h-4 w-4" />
								</Link>
							)}
						</div>
					)}
				</div>

				{/* Expand/Collapse button for bio */}
				{member.bio && (
					<Button
						variant="ghost"
						size="sm"
						className="h-8 w-8 p-0"
						onClick={() => setExpanded(!expanded)}
					>
						{expanded ? (
							<ChevronUp className="h-4 w-4" />
						) : (
							<ChevronDown className="h-4 w-4" />
						)}
					</Button>
				)}
			</div>

			{/* Bio section (expandable) */}
			{member.bio && expanded && (
				<div className="px-4 pb-4 pt-0 text-sm border-t">
					<p className="text-muted-foreground">{member.bio}</p>
				</div>
			)}

			{/* Edit button for team members */}
			{isTeamMember && (
				<div className="bg-muted px-4 py-2 text-right">
					<Button variant="ghost" size="sm" className="h-7 text-xs">
						Edit
					</Button>
				</div>
			)}
		</div>
	);
}
