"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { connect, disconnect, getPublicKey } from "@/hooks/useStellarWallet";

const ConnectWalletButton = ({ className = "" }) => {
	const [isChecking, setIsChecking] = useState(true);
	const [isConnecting, setIsConnecting] = useState(false);
	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		const checkConnection = async () => {
			try {
				const address = await getPublicKey();
				if (address) {
					setWalletAddress(address);
					toast.success("Wallet Reconnected", {
						description: "Welcome back!",
					});
				}
			} catch (error) {
				console.log("No wallet connected.", error);
			} finally {
				setIsChecking(false);
			}
		};

		checkConnection();
	}, []);

	const connectWallet = async () => {
		try {
			setIsConnecting(true);
			await connect(async () => {
				const address = await getPublicKey();
				if (!address) throw new Error("Failed to retrieve wallet address");

				setWalletAddress(address);
				toast.success("Wallet Connected", {
					description: "Successfully connected to wallet",
				});
			});
		} catch (error) {
			console.log(error);
			toast.error("Connection Failed", {
				description: "Failed to connect to the wallet.",
			});
		} finally {
			setIsConnecting(false);
		}
	};

	const disconnectWallet = async () => {
		await disconnect();
		setWalletAddress(null);
		toast.info("Wallet Disconnected", {
			description: "You have been disconnected.",
		});
	};

	const copyToClipboard = async () => {
		if (!walletAddress) return;

		try {
			await navigator.clipboard.writeText(walletAddress);
			setIsCopied(true);
			toast.success("Address Copied", {
				description: "Wallet address copied to clipboard",
			});

			// Reset the copied state after 2 seconds
			setTimeout(() => {
				setIsCopied(false);
			}, 2000);
		} catch (error) {
			toast.error(error as string, {
				description: "Failed to copy address to clipboard",
			});
		}
	};

	const formatAddress = (address: string) => {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	return (
		<div className="flex items-center space-x-2">
			{isChecking ? (
				<Button disabled className={className}>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking...
				</Button>
			) : isConnecting ? (
				<Button disabled className={className}>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting...
				</Button>
			) : walletAddress ? (
				<Button
					variant="outline"
					onClick={copyToClipboard}
					className={`${className} flex items-center gap-2 cursor-pointer bg-primary text-white`}
				>
					{formatAddress(walletAddress)}
					{isCopied ? (
						<Check className="h-4 w-4 text-green-500" />
					) : (
						<Copy className="h-4 w-4" />
					)}
				</Button>
			) : (
				<Button onClick={connectWallet} className={className}>
					Connect Wallet
				</Button>
			)}

			{walletAddress && (
				<Button onClick={disconnectWallet} variant="outline">
					<LogOut className="mr-2 h-4 w-4" /> Disconnect
				</Button>
			)}
		</div>
	);
};

export default ConnectWalletButton;
