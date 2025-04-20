"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
	BarChart2,
	Bell,
	Briefcase,
	Cpu,
	Crown,
	Home,
	LogOut,
	Moon,
	Settings,
	Sun,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

interface NavItem {
	icon: React.ElementType;
	label: string;
	href: string;
	isActive?: boolean;
}

const navItems: NavItem[] = [
	{ icon: Home, label: "Dashboard", href: "/dashboard", isActive: true },
	{ icon: Briefcase, label: "My Projects", href: "/projects/my-projects" },
	{ icon: Bell, label: "Explore", href: "/projects" },
	{ icon: BarChart2, label: "Funded Projects", href: "/projects/funded" },
	{ icon: Cpu, label: "Profile", href: "/profile" },
	{ icon: Crown, label: "My Contributions", href: "/my-contributions" },
	{ icon: Settings, label: "Settings", href: "/settings" },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

export function Sidebar({ className, ...props }: SidebarProps) {
	const [theme, setTheme] = React.useState<"light" | "dark">("light");
	const router = useRouter();
	const pathname = usePathname();

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		document.documentElement.classList.toggle("dark");
	};

	const handleCreate = () => {
		router.push("/projects/new");
	};
	const showCreatorCard = pathname !== "/projects/new";
	const handleLogout = async () => {
		await signOut({
			redirect: false,
			callbackUrl: "/auth/signin",
		});
		router.push("/auth/signin");
	};

	return (
		<aside
			className={cn(
				"fixed left-0 top-0 z-40 h-screen w-[280px] border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
				className,
			)}
			{...props}
		>
			<div className="flex h-full flex-col">
				<div className="flex h-16 items-center border-b px-6">
					<Link href="/">
						<Image src="/logo.svg" width={200} height={32} alt="" />
					</Link>
				</div>

				<div className="flex-1 overflow-y-auto">
					<nav className="space-y-1 p-4">
						{navItems.map((item) => (
							<a
								key={item.label}
								href={item.href}
								className={cn(
									"flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
									pathname === item.href
										? "bg-accent text-accent-foreground"
										: "text-muted-foreground",
								)}
							>
								<item.icon className="h-4 w-4" />
								{item.label}
							</a>
						))}
					</nav>
				</div>

				<section>
					{showCreatorCard && (
						<div className="border-t p-4">
							<Card className="bg-primary text-white dark:bg-secondary">
								<CardContent className="p-4">
									<Image
										height={128}
										width={128}
										src="/soroban.png"
										alt=""
										className="mb-4 h-32 w-full rounded-lg object-cover"
									/>
									<h3 className="font-semibold">Become a creator</h3>
									<p className="mt-1 text-sm text-white/80">
										Validate your concept and secure initial funding to
										kickstart your project.
									</p>
								</CardContent>
								<CardFooter className="p-4 pt-0">
									<Button
										onClick={handleCreate}
										className="w-full bg-secondary dark:bg-white dark:text-secondary hover:bg-secondary/30"
										variant="secondary"
									>
										Create now
									</Button>
								</CardFooter>
							</Card>
						</div>
					)}

					<div className="flex items-center justify-between my-4">
						<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="icon"
								className={cn(
									"h-8 w-8",
									theme === "light" ? "text-primary" : "text-muted-foreground",
								)}
								onClick={toggleTheme}
							>
								<Sun className="h-4 w-4" />
								<span className="sr-only">Light mode</span>
							</Button>
							<Button
								variant="ghost"
								size="icon"
								className={cn(
									"h-8 w-8",
									theme === "dark" ? "text-primary" : "text-muted-foreground",
								)}
								onClick={toggleTheme}
							>
								<Moon className="h-4 w-4" />
								<span className="sr-only">Dark mode</span>
							</Button>
						</div>
						<Button
							variant="ghost"
							className="text-muted-foreground hover:text-destructive"
							onClick={handleLogout}
						>
							<LogOut className="mr-2 h-4 w-4" />
							Logout
						</Button>
					</div>
				</section>
			</div>
		</aside>
	);
}
