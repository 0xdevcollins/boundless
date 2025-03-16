"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const error =
		searchParams.get("error") || "An unexpected auth error occurred.";

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#dffce8] py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-lg text-center">
				<AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
				<h2 className="text-2xl font-bold text-[#194247]">
					Authentication Error
				</h2>
				<p className="text-gray-600">{error}</p>

				<motion.button
					whileTap={{ scale: 0.95 }}
					className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#194247] hover:bg-[#153a3f] focus:outline-none"
					onClick={() => router.push("/auth/signin")}
				>
					Go to Login
				</motion.button>
			</div>
		</div>
	);
}
