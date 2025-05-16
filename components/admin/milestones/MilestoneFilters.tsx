"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface MilestoneFiltersProps {
	projects: any[];
	currentStatus?: string;
	currentProject?: string;
	searchQuery?: string;
}

export function MilestoneFilters({
	projects,
	currentStatus,
	currentProject,
	searchQuery,
}: MilestoneFiltersProps) {
	const router = useRouter();
	const [search, setSearch] = useState(searchQuery || "");

	// Update search state when searchQuery prop changes
	useEffect(() => {
		setSearch(searchQuery || "");
	}, [searchQuery]);

	const handleStatusChange = (value: string) => {
		const searchParams = new URLSearchParams(window.location.search);
		if (value && value !== "all") {
			searchParams.set("status", value);
		} else {
			searchParams.delete("status");
		}
		searchParams.delete("page");
		router.push(`?${searchParams.toString()}`);
	};

	const handleProjectChange = (value: string) => {
		const searchParams = new URLSearchParams(window.location.search);
		if (value && value !== "all") {
			searchParams.set("projectId", value);
		} else {
			searchParams.delete("projectId");
		}
		searchParams.delete("page");
		router.push(`?${searchParams.toString()}`);
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const searchParams = new URLSearchParams(window.location.search);
		if (search) {
			searchParams.set("search", search);
		} else {
			searchParams.delete("search");
		}
		searchParams.delete("page");
		router.push(`?${searchParams.toString()}`);
	};

	const handleClearFilters = () => {
		router.push("/admin/milestones");
		setSearch("");
	};

	const hasFilters = currentStatus || currentProject || searchQuery;

	return (
		<div className="space-y-4">
			<div className="flex flex-col sm:flex-row gap-4">
				<form onSubmit={handleSearch} className="flex-1 flex gap-2">
					<div className="relative flex-1">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search milestones..."
							className="pl-8"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
					<Button type="submit">Search</Button>
				</form>

				<div className="flex gap-2">
					<Select
						value={currentStatus || "all"}
						onValueChange={handleStatusChange}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="All Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Status</SelectItem>
							<SelectItem value="PENDING">Pending</SelectItem>
							<SelectItem value="IN_PROGRESS">In Progress</SelectItem>
							<SelectItem value="COMPLETED">Completed</SelectItem>
							<SelectItem value="REJECTED">Rejected</SelectItem>
						</SelectContent>
					</Select>

					<Select
						value={currentProject || "all"}
						onValueChange={handleProjectChange}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="All Projects" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Projects</SelectItem>
							{projects.map((project) => (
								<SelectItem key={project.id} value={project.id}>
									{project.title}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			{hasFilters && (
				<div className="flex items-center">
					<Button
						variant="ghost"
						size="sm"
						onClick={handleClearFilters}
						className="text-muted-foreground"
					>
						<X className="h-4 w-4 mr-1" />
						Clear filters
					</Button>
				</div>
			)}
		</div>
	);
}
