"use client";

import { ProjectForm } from "@/components/project-form";
import { WithWalletProtection } from "@/components/with-wallet-protection";

export const ProjectFormWrapper = () => {
	return (
		<WithWalletProtection redirectPath="/projects">
			<ProjectForm />
		</WithWalletProtection>
	);
};
