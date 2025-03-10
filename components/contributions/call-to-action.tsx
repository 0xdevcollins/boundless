"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function CallToAction() {
	const router = useRouter();

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<Card>
				<CardHeader>
					<CardTitle>Discover New Projects</CardTitle>
					<CardDescription>
						Find new projects to vote on and contribute to the community.
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<Button onClick={() => router.push("/projects")}>
						Browse Projects
					</Button>
				</CardFooter>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Manage Your Projects</CardTitle>
					<CardDescription>
						View and manage the projects you&apos;ve created.
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<Button variant="outline" onClick={() => router.push("/dashboard")}>
						Go to Dashboard
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
