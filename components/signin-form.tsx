"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function SignInForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		const result = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		if (result?.error === "UNVERIFIED_EMAIL") {
			setError("Your email is not verified. Sending verification code...");

			try {
				const otpResponse = await fetch("/api/auth/resend-otp", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email }),
				});

				if (!otpResponse.ok) {
					const data = await otpResponse.json();
					setError(data.message || "Failed to send verification code");
					return;
				}
				router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
			} catch (err) {
				setError(
					`Failed to send verification code: ${
						err instanceof Error ? err.message : String(err)
					}`,
				);
			} finally {
				setIsLoading(false);
			}
		} else if (result?.error) {
			setError(result.error);
			setIsLoading(false);
		} else {
			setIsLoading(false);
			router.push("/dashboard");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="mt-2 space-y-6">
			<div className="rounded-md shadow-sm -space-y-px">
				<div>
					<label htmlFor="email-address" className="sr-only">
						Email address
					</label>
					<input
						id="email-address"
						name="email"
						type="email"
						autoComplete="email"
						required
						className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Email address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="password" className="sr-only">
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						autoComplete="current-password"
						required
						className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
			</div>

			{error && <p className="text-red-500 text-xs italic">{error}</p>}

			<div>
				<Button
					disabled={isLoading}
					type="submit"
					className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/85 focus:outline-none"
				>
					{isLoading ? "Signing in..." : "Sign in"}
				</Button>
			</div>
		</form>
	);
}
