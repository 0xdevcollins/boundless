"use client";
import MyContributionsPage from "@/components/contributions";
import Dashboard from "@/components/dashboard";
import { useUserStore } from "@/store/userStore";
import React from "react";

const Page = () => {
	const {
		user,
		isLoading,
		// fetchUserProfile,
		hasCreatedProject,
	} = useUserStore();

	if (isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<>
			{hasCreatedProject() ? (
				<Dashboard />
			) : (
				<MyContributionsPage username={user?.name} />
			)}
		</>
	);
};

export default Page;
