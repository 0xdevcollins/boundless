"use client";

import SignInButtons from "@/components/signin-buttons";
import SignInForm from "@/components/signin-form";
import { AnimatePresence, type Variants, motion } from "framer-motion";
// import type { BuiltInProviderType } from "next-auth/providers/index";
// import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RegistrationForm from "./registeration-form";

const tabVariants: Variants = {
	active: {
		backgroundColor: "#194247",
		color: "white",
		transition: { duration: 0.2 },
	},
	inactive: {
		backgroundColor: "#dffce8",
		color: "#194247",
		transition: { duration: 0.2 },
	},
};

const contentVariants: Variants = {
	enter: {
		x: -20,
		opacity: 0,
	},
	center: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: "easeOut",
		},
	},
	exit: {
		x: 20,
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: "easeIn",
		},
	},
};

// interface AuthTabsProps {
// 	providers: Record<
// 		LiteralUnion<BuiltInProviderType, string>,
// 		ClientSafeProvider
// 	> | null;
// }

export default function AuthTabs() {
	const [activeTab, setActiveTab] = useState<"signin" | "register">("signin");
	const { status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "authenticated") {
			router.push("/dashboard");
		}
	}, [status, router]);

	if (status === "loading") {
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#dffce8]">
				<div className="text-center">
					<p className="text-[#194247]">Loading...</p>
				</div>
			</div>
		);
	}

	if (status === "authenticated") {
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#dffce8]">
				<div className="text-center">
					<p className="text-[#194247]">Redirecting to dashboard...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#dffce8] py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-lg">
				<div className="flex flex-col items-center">
					<Link href="/">
						<Image
							src="/logo.svg"
							alt="Boundless"
							width={180}
							height={180}
							className="mb-4"
						/>
					</Link>
					<h2 className="mt-2 text-center text-3xl font-extrabold text-[#194247]">
						{activeTab === "signin"
							? "Sign in to your account"
							: "Create an account"}
					</h2>
				</div>

				<fieldset className="flex rounded-md shadow-sm -mb-2">
					<motion.button
						variants={tabVariants}
						animate={activeTab === "signin" ? "active" : "inactive"}
						onClick={() => setActiveTab("signin")}
						className="w-full rounded-l-md border border-[#194247] px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#194247] focus:z-10"
					>
						Sign In
					</motion.button>
					<motion.button
						variants={tabVariants}
						animate={activeTab === "register" ? "active" : "inactive"}
						onClick={() => setActiveTab("register")}
						className="w-full rounded-r-md border border-[#194247] px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#194247] focus:z-10"
					>
						Register
					</motion.button>
				</fieldset>

				<motion.div
					className="relative overflow-hidden mt-0"
					layout
					transition={{ duration: 0.4 }}
				>
					<AnimatePresence mode="wait">
						<motion.div
							key={activeTab}
							variants={contentVariants}
							initial="enter"
							animate="center"
							exit="exit"
							className="w-full"
						>
							{activeTab === "signin" ? <SignInForm /> : <RegistrationForm />}
						</motion.div>
					</AnimatePresence>
				</motion.div>

				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-[#194247]" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white text-[#194247]">
								Or continue with
							</span>
						</div>
					</div>
					<SignInButtons />
					<div className="mt-4 text-center text-primary">
						<Link href="/auth/forgot-password" className="text-center">
							Forgot password?
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
