"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
// import { formatDistanceToNow } from "date-fns";
import {
	Check,
	ChevronLeft,
	ChevronRight,
	Eye,
	MoreHorizontal,
	ShieldAlert,
	ShieldCheck,
	X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UserRole = "USER" | "ADMIN";

interface User {
	id: string;
	name: string | null;
	email: string;
	image: string | null;
	role: UserRole;
	emailVerified: boolean;
	createdAt: string;
	_count: {
		projects: number;
		fundings: number;
	};
}

interface UsersTableProps {
	users: User[];
	currentPage: number;
	totalPages: number;
}

export function UsersTable({
	users,
	currentPage,
	totalPages,
}: UsersTableProps) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<string | null>(null);
	const [showBanDialog, setShowBanDialog] = useState(false);
	const [showRoleDialog, setShowRoleDialog] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [newRole, setNewRole] = useState<"USER" | "ADMIN">("USER");

	const handleBanUser = async () => {
		if (!selectedUser) return;

		setIsLoading(selectedUser.id);
		try {
			const response = await fetch(`/api/admin/users/${selectedUser.id}/ban`, {
				method: "POST",
			});

			if (response.ok) {
				router.refresh();
			} else {
				console.error("Failed to ban user");
			}
		} catch (error) {
			console.error("Error banning user:", error);
		} finally {
			setIsLoading(null);
			setShowBanDialog(false);
			setSelectedUser(null);
		}
	};

	const handleChangeRole = async () => {
		if (!selectedUser) return;

		setIsLoading(selectedUser.id);
		try {
			const response = await fetch(`/api/admin/users/${selectedUser.id}/role`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ role: newRole }),
			});

			if (response.ok) {
				router.refresh();
			} else {
				console.error("Failed to change user role");
			}
		} catch (error) {
			console.error("Error changing user role:", error);
		} finally {
			setIsLoading(null);
			setShowRoleDialog(false);
			setSelectedUser(null);
		}
	};

	return (
		<div className="space-y-4">
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>User</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Role</TableHead>
							<TableHead>Projects</TableHead>
							<TableHead>Joined</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className="text-center py-8 text-muted-foreground"
								>
									No users found
								</TableCell>
							</TableRow>
						) : (
							users.map((user) => (
								<TableRow key={user.id}>
									<TableCell>
										<div className="flex items-center gap-3">
											<Avatar>
												<AvatarImage
													src={user.image || "/placeholder.svg"}
													alt={`${user.name}`}
												/>
												<AvatarFallback>
													{user.name?.charAt(0) || "U"}
												</AvatarFallback>
											</Avatar>
											<div>
												<Link
													href={`/admin/users/${user.id}`}
													className="font-medium hover:underline"
												>
													{user.name || "Unnamed User"}
												</Link>
												{user.emailVerified ? (
													<div className="flex items-center text-xs text-green-600 mt-1">
														<Check className="h-3 w-3 mr-1" />
														Verified
													</div>
												) : (
													<div className="flex items-center text-xs text-amber-600 mt-1">
														<X className="h-3 w-3 mr-1" />
														Unverified
													</div>
												)}
											</div>
										</div>
									</TableCell>
									<TableCell>
										<span className="text-sm">{user.email}</span>
									</TableCell>
									<TableCell>
										<Badge
											variant={
												user.role === "ADMIN" ? "destructive" : "default"
											}
										>
											{user.role}
										</Badge>
									</TableCell>
									<TableCell>
										<div className="text-sm">
											{user._count.projects} projects
											<div className="text-xs text-muted-foreground">
												{user._count.fundings} fundings
											</div>
										</div>
									</TableCell>
									<TableCell>
										<span className="text-sm text-muted-foreground">
											{/* {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })} */}
										</span>
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-2">
											<Link href={`/admin/users/${user.id}`}>
												<Button variant="ghost" size="icon">
													<Eye className="h-4 w-4" />
												</Button>
											</Link>

											<Button
												variant="ghost"
												size="icon"
												onClick={() => {
													setSelectedUser(user);
													setNewRole(user.role === "ADMIN" ? "USER" : "ADMIN");
													setShowRoleDialog(true);
												}}
												disabled={isLoading === user.id}
											>
												{user.role === "ADMIN" ? (
													<ShieldCheck className="h-4 w-4 text-green-500" />
												) : (
													<ShieldAlert className="h-4 w-4 text-muted-foreground" />
												)}
											</Button>

											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="icon">
														<MoreHorizontal className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem asChild>
														<Link href={`/admin/users/${user.id}`}>
															View Details
														</Link>
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() => {
															setSelectedUser(user);
															setShowBanDialog(true);
														}}
														className="text-red-500 focus:text-red-500"
													>
														Ban User
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex items-center justify-between">
					<div className="text-sm text-muted-foreground">
						Page {currentPage} of {totalPages}
					</div>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								const searchParams = new URLSearchParams(
									window.location.search,
								);
								searchParams.set("page", String(currentPage - 1));
								router.push(`?${searchParams.toString()}`);
							}}
							disabled={currentPage <= 1}
						>
							<ChevronLeft className="h-4 w-4 mr-1" />
							Previous
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								const searchParams = new URLSearchParams(
									window.location.search,
								);
								searchParams.set("page", String(currentPage + 1));
								router.push(`?${searchParams.toString()}`);
							}}
							disabled={currentPage >= totalPages}
						>
							Next
							<ChevronRight className="h-4 w-4 ml-1" />
						</Button>
					</div>
				</div>
			)}

			{/* Ban User Dialog */}
			<AlertDialog open={showBanDialog} onOpenChange={setShowBanDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Ban User</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to ban {selectedUser?.name || "this user"}?
							This will prevent them from logging in and using the platform.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isLoading === selectedUser?.id}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleBanUser}
							disabled={isLoading === selectedUser?.id}
							className="bg-destructive hover:bg-destructive/90"
						>
							{isLoading === selectedUser?.id ? "Processing..." : "Ban User"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Change Role Dialog */}
			<AlertDialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Change User Role</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to change{" "}
							{selectedUser?.name || "this user"}&apos;s role to {newRole}?
							{newRole === "ADMIN" &&
								" This will give them full administrative access to the platform."}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isLoading === selectedUser?.id}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleChangeRole}
							disabled={isLoading === selectedUser?.id}
							className={
								newRole === "ADMIN" ? "bg-amber-600 hover:bg-amber-700" : ""
							}
						>
							{isLoading === selectedUser?.id
								? "Processing..."
								: `Change to ${newRole}`}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
