"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import type { TeamMember } from "@/types/project";
import {
	ChevronDown,
	ChevronUp,
	Github,
	Linkedin,
	MessageSquare,
	Search,
	Trash2,
	Twitter,
	UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface User {
	id: string;
	name: string;
	image?: string;
	email: string;
}

interface TeamSectionProps {
	teamMembers: TeamMember[];
	isTeamMember: boolean;
	projectId: string;
}

export function TeamSection({
	teamMembers: initialTeamMembers,
	isTeamMember,
	projectId,
}: TeamSectionProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [searchResults, setSearchResults] = useState<User[]>([]);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
	const [openMembers, setOpenMembers] = useState<Record<number, boolean>>({});
	const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const searchUsers = async (query: string) => {
		if (searchTimeoutRef.current) {
			clearTimeout(searchTimeoutRef.current);
		}

		if (!query.trim()) {
			setSearchResults([]);
			setIsSearching(false);
			return;
		}

		setIsSearching(true);

		searchTimeoutRef.current = setTimeout(async () => {
			try {
				const response = await fetch(
					`/api/users/search?q=${encodeURIComponent(query)}`,
				);

				if (!response.ok) throw new Error("Search failed");

				const data = await response.json();

				// Filter out users that are already team members
				const filteredResults = data.filter(
					(user: User) =>
						!teamMembers.some((member) => member.userId === user.id),
				);

				setSearchResults(filteredResults);
			} catch (error) {
				console.error("Failed to search users:", error);
				toast.error("Failed to retrieve users. Please try again.");
				setSearchResults([]);
			} finally {
				setIsSearching(false);
			}
		}, 300);
	};

	const addTeamMember = async (user: User) => {
		try {
			const response = await fetch(`/api/projects/${projectId}/team`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					teamMembers: [
						{
							userId: user.id,
							role: "",
							fullName: user.name,
						},
					],
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to add team member");
			}

			const { teamMembers: newTeamMembers } = await response.json();
			setTeamMembers((prev) => [...prev, ...newTeamMembers]);

			// Open the newly added member's collapsible
			setOpenMembers((prev) => ({
				...prev,
				[teamMembers.length]: true,
			}));

			setSearchQuery("");
			setSearchResults([]);
			setIsPopoverOpen(false);
			toast.success("Team member added successfully");
		} catch (error) {
			console.error("Failed to add team member:", error);
			toast.error("Failed to add team member");
		}
	};

	const removeTeamMember = async (memberId: string) => {
		try {
			const response = await fetch(
				`/api/projects/${projectId}/team?teamMemberId=${memberId}`,
				{
					method: "DELETE",
				},
			);

			if (!response.ok) {
				throw new Error("Failed to remove team member");
			}

			setTeamMembers((prev) => prev.filter((member) => member.id !== memberId));
			toast.success("Team member removed successfully");
		} catch (error) {
			console.error("Failed to remove team member:", error);
			toast.error("Failed to remove team member");
		}
	};

	const updateMemberRole = async (memberId: string, role: string) => {
		try {
			const response = await fetch(
				`/api/projects/${projectId}/team/${memberId}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ role }),
				},
			);

			if (!response.ok) {
				throw new Error("Failed to update role");
			}

			setTeamMembers((prev) =>
				prev.map((member) =>
					member.id === memberId ? { ...member, role } : member,
				),
			);
		} catch (error) {
			console.error("Failed to update role:", error);
			toast.error("Failed to update team member role");
		}
	};

	const toggleMember = (index: number) => {
		setOpenMembers((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>Team Members</CardTitle>
					{isTeamMember && (
						<div className="flex items-center gap-2">
							<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
								<PopoverTrigger asChild>
									<Button
										type="button"
										variant="outline"
										aria-haspopup="listbox"
										aria-controls="search-results"
										aria-expanded={isPopoverOpen}
										className="w-[200px] justify-between h-9"
									>
										<Search className="mr-2 h-4 w-4" />
										{searchQuery || "Search for team members..."}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-[300px] p-0" align="end">
									<Command shouldFilter={false}>
										<CommandInput
											placeholder="Search by name or email..."
											value={searchQuery}
											onValueChange={(value: string) => {
												setSearchQuery(value);
												searchUsers(value);
											}}
											aria-label="Search for team members"
										/>
										<CommandList id="search-results">
											<CommandEmpty>
												{isSearching ? (
													<div className="flex items-center justify-center py-6">
														<span className="text-sm text-muted-foreground">
															Searching...
														</span>
													</div>
												) : searchQuery.trim() ? (
													"No users found."
												) : (
													"Start typing to search for users."
												)}
											</CommandEmpty>
											<CommandGroup heading="Results">
												{searchResults.map((user) => (
													<CommandItem
														key={user.id}
														onSelect={() => addTeamMember(user)}
														className="flex items-center gap-2 cursor-pointer hover:bg-accent"
													>
														<Avatar className="h-6 w-6 flex-shrink-0">
															<AvatarImage
																src={user.image || "/placeholder.svg"}
																alt={user.name}
															/>
															<AvatarFallback className="bg-primary/10 text-primary text-xs">
																{user.name.charAt(0).toUpperCase()}
															</AvatarFallback>
														</Avatar>
														<div className="flex flex-col overflow-hidden">
															<span className="font-medium truncate text-sm">
																{user.name}
															</span>
															<span className="text-xs text-muted-foreground truncate">
																{user.email}
															</span>
														</div>
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>

							<Button
								onClick={() => setIsPopoverOpen(true)}
								variant="secondary"
								size="icon"
								type="button"
								className="flex-shrink-0 h-9 w-9"
								aria-label="Add team member"
							>
								<UserPlus className="h-4 w-4" />
							</Button>
						</div>
					)}
				</div>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{teamMembers.length > 0 ? (
						teamMembers.map((member, index) => (
							<TeamMemberCard
								key={member.id}
								member={member}
								isTeamMember={isTeamMember}
								onRemove={() => removeTeamMember(member.id)}
								onUpdateRole={(role) => updateMemberRole(member.id, role)}
								isExpanded={openMembers[index]}
								onToggle={() => toggleMember(index)}
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

interface TeamMemberCardProps {
	member: TeamMember;
	isTeamMember: boolean;
	onRemove: () => void;
	onUpdateRole: (role: string) => void;
	isExpanded: boolean;
	onToggle: () => void;
}

function TeamMemberCard({
	member,
	isTeamMember,
	onRemove,
	onUpdateRole,
	isExpanded,
	onToggle,
}: TeamMemberCardProps) {
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
					{isTeamMember ? (
						<Input
							value={member.role}
							onChange={(e) => onUpdateRole(e.target.value)}
							placeholder="Enter role"
							className="h-7 mt-1 text-sm"
						/>
					) : (
						<div className="text-sm text-muted-foreground">{member.role}</div>
					)}

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

				{/* Action buttons */}
				<div className="flex items-center gap-1">
					{isTeamMember && (
						<Button
							variant="ghost"
							size="sm"
							className="h-7 w-7 p-0 text-destructive"
							onClick={onRemove}
							aria-label="Remove team member"
						>
							<Trash2 className="h-4 w-4" />
						</Button>
					)}
					{member.bio && (
						<Button
							variant="ghost"
							size="sm"
							className="h-7 w-7 p-0"
							onClick={onToggle}
						>
							{isExpanded ? (
								<ChevronUp className="h-4 w-4" />
							) : (
								<ChevronDown className="h-4 w-4" />
							)}
						</Button>
					)}
				</div>
			</div>

			{/* Bio section (expandable) */}
			{member.bio && isExpanded && (
				<div className="px-4 pb-4 pt-0 text-sm border-t">
					<p className="text-muted-foreground">{member.bio}</p>
				</div>
			)}
		</div>
	);
}
