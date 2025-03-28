"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { NotificationModal } from "./NotificationModal";
interface Notification {
	id: string;
	title: string;
	description: string;
	timestamp: Date;
	isRead: boolean;
}

export function NotificationDropdown() {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [selectedNotification, setSelectedNotification] =
		useState<Notification | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const fetchNotifications = async () => {
		try {
			const response = await fetch("/api/user/notification");
			if (!response.ok) throw new Error("Failed to fetch notifications");
			const data = await response.json();
			setNotifications(data);
		} catch (error) {
			console.error(error);
			toast.error("Error", {
				description: "Failed to fetch notifications",
			});
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchNotifications();
	}, []);

	const unreadCount = notifications.filter((n) => !n.isRead).length;

	const handleMarkAllAsRead = async () => {
		try {
			const response = await fetch("/api/user/notification/mark-all", {
				method: "POST",
			});
			if (!response.ok) throw new Error("Failed to mark notifications as read");

			setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
			toast.success("Success", {
				description: "All notifications marked as read",
			});
		} catch {
			toast.error("Error", {
				description: "Failed to mark notifications as read",
			});
		}
	};

	const handleNotificationClick = async (notification: Notification) => {
		if (!notification.isRead) {
			try {
				const response = await fetch("/api/user/notification/mark-one", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ notificationId: notification.id }),
				});
				if (!response.ok)
					throw new Error("Failed to mark notification as read");

				setNotifications(
					notifications.map((n) =>
						n.id === notification.id ? { ...n, isRead: true } : n,
					),
				);
			} catch {
				toast.error("Error", {
					description: "Failed to mark notification as read",
				});
			}
		}

		setSelectedNotification(notification);
		setIsModalOpen(true);
	};

	const handleKeyDown = (
		e: React.KeyboardEvent,
		notification: Notification,
	) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleNotificationClick(notification);
		}
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon" className="relative">
						<Bell className="h-5 w-5" />
						{unreadCount > 0 && (
							<span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
								{unreadCount}
							</span>
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-80">
					<div className="flex items-center justify-between p-2">
						<h3 className="font-semibold">Notifications</h3>
						{unreadCount > 0 && (
							<Button
								variant="ghost"
								size="sm"
								onClick={handleMarkAllAsRead}
								className="text-xs"
							>
								Mark all as read
							</Button>
						)}
					</div>
					<div className="max-h-[400px] overflow-y-auto">
						{isLoading ? (
							<div className="p-4 text-center text-sm text-muted-foreground">
								Loading notifications...
							</div>
						) : notifications.length === 0 ? (
							<div className="p-4 text-center text-sm text-muted-foreground">
								No notifications
							</div>
						) : (
							notifications.map((notification) => (
								<button
									type="button"
									key={notification.id}
									className={cn(
										"w-full cursor-pointer p-3 text-left hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary",
										!notification.isRead && "bg-accent/50",
									)}
									onClick={() => handleNotificationClick(notification)}
									onKeyDown={(e) => handleKeyDown(e, notification)}
									role="menuitem"
								>
									<div className="flex items-start justify-between">
										<div>
											<p
												className={cn(
													"text-sm font-medium",
													!notification.isRead && "font-semibold",
												)}
											>
												{notification.title}
											</p>
											<p className="mt-1 text-xs text-muted-foreground">
												{notification.description}
											</p>
										</div>
										<span className="ml-2 text-xs text-muted-foreground">
											{new Date(notification.timestamp).toLocaleTimeString()}
										</span>
									</div>
								</button>
							))
						)}
					</div>
				</DropdownMenuContent>
			</DropdownMenu>

			<NotificationModal
				notification={selectedNotification}
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setSelectedNotification(null);
				}}
			/>
		</>
	);
}
