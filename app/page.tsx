"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
	const router = useRouter();

	return (
		<div className="h-screen grid place-content-center">
			<Button
				onClick={() => router.push("/dashboard")}
				className="py-4 px-10 text-white"
			>
				Visit Dashboard
			</Button>
		</div>
	);
};

export default Page;
