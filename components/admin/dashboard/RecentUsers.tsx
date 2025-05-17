import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface User {
	id: string;
	name: string | undefined;
	email: string;
	image: string | null;
	role: "USER" | "ADMIN";
	createdAt: string | Date;
}

interface RecentUsersProps {
	users: User[];
}

export function RecentUsers({ users }: RecentUsersProps) {
	return (
		<Card className="col-span-1">
			<CardHeader>
				<CardTitle>Recent Users</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{users.length === 0 ? (
						<p className="text-sm text-muted-foreground">
							No recent users found.
						</p>
					) : (
						users.map((user) => (
							<div key={user.id} className="flex items-center gap-4">
								<Avatar>
									<AvatarImage
										src={user.image || "/placeholder.svg"}
										alt={user.name}
									/>
									<AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
								</Avatar>

								<div className="flex-1 min-w-0">
									<Link
										href={`/admin/users/${user.id}`}
										className="text-sm font-medium hover:underline truncate block"
									>
										{user.name || "Unnamed User"}
									</Link>
									<span className="text-xs text-muted-foreground truncate">
										{user.email}
									</span>
								</div>

								<div className="flex flex-col items-end">
									<Badge
										variant={user.role === "ADMIN" ? "destructive" : "default"}
									>
										{user.role}
									</Badge>
									<span className="text-xs text-muted-foreground mt-1">
										{/* {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })} */}
									</span>
								</div>
							</div>
						))
					)}

					<div className="pt-2">
						<Link
							href="/admin/users"
							className="text-sm text-primary hover:underline"
						>
							View all users
						</Link>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
