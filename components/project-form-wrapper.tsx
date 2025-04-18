"use client";

import { ProjectForm } from "@/components/project-form";
import { WithWalletProtection } from "@/components/with-wallet-protection";

interface ProjectFormWrapperProps {
	userId?: string;
}

export const ProjectFormWrapper = ({ userId }: ProjectFormWrapperProps) => {
	return (
		<WithWalletProtection redirectPath="/projects">
			<ProjectForm userId={userId} />
		</WithWalletProtection>
	);
};
