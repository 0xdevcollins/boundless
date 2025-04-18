"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useWalletStore } from "@/store/useWalletStore";
import { Wallet } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ConnectWalletPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirectPath = searchParams.get("redirect") || "/";

	const { connect: connectWallet, publicKey, isConnected } = useWalletStore();
	const [isConnecting, setIsConnecting] = useState(false);

	const handleConnect = async () => {
		try {
			setIsConnecting(true);
			await connectWallet();

			if (publicKey) {
				router.push(redirectPath);
			}
		} catch (error) {
			console.error("Failed to connect wallet:", error);
		} finally {
			setIsConnecting(false);
		}
	};

	const handleCancel = () => {
		router.push("/");
	};

	if (isConnected && publicKey) {
		router.push(redirectPath);
		return null;
	}

	return (
		<div className="container flex items-center justify-center min-h-[80vh] py-12">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="flex justify-center mb-4">
						<div className="bg-primary/10 p-3 rounded-full">
							<Wallet className="h-8 w-8 text-primary" />
						</div>
					</div>
					<CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
					<CardDescription>
						You need to connect your wallet to access this feature
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-sm text-muted-foreground text-center">
						Connecting your wallet allows you to interact with blockchain
						features, sign transactions, and manage your digital assets.
					</p>
					<div className="bg-muted p-4 rounded-lg">
						<p className="text-sm font-medium">Redirecting to:</p>
						<p className="text-sm text-muted-foreground break-all">
							{redirectPath}
						</p>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col sm:flex-row gap-2">
					<Button
						variant="outline"
						onClick={handleCancel}
						className="w-full sm:w-auto"
						disabled={isConnecting}
					>
						Cancel
					</Button>
					<Button
						onClick={handleConnect}
						className="w-full sm:w-auto"
						disabled={isConnecting}
					>
						{isConnecting ? "Connecting..." : "Connect Wallet"}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
