"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, Plus, Share2, Flag } from "lucide-react";

interface ProjectActionsProps {
	isTeamMember: boolean;
}

export function ProjectActions({ isTeamMember }: ProjectActionsProps) {
	return (
		<div className="flex gap-2">
			{isTeamMember ? (
				<>
					<Button size="sm" variant="outline">
						<Edit className="mr-2 h-4 w-4" /> Edit Project
					</Button>
					<Button size="sm">
						<Plus className="mr-2 h-4 w-4" /> New Update
					</Button>
				</>
			) : (
				<Button size="sm">Support Project</Button>
			)}

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="icon">
						<MoreVertical className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>
						<Share2 className="mr-2 h-4 w-4" /> Share
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="text-destructive">
						<Flag className="mr-2 h-4 w-4" /> Report
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
