import { ProjectForm } from "@/components/project-form";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth.config";

const Page = async () => {
	const session = await getServerSession(authOptions);

	return (
		<div className="container max-w-2xl py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold">Create a New Project</h1>
				<p className="text-muted-foreground">Submit your project for funding</p>
			</div>
			<ProjectForm userId={session?.user?.id} />
		</div>
	);
};

export default Page;
