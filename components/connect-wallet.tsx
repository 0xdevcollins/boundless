"use client";

import React, { useState, useEffect } from "react";
import {
	allowAllModules,
	FREIGHTER_ID,
	type ISupportedWallet,
	StellarWalletsKit,
	WalletNetwork,
} from "@creit.tech/stellar-wallets-kit";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";

const kit = new StellarWalletsKit({
	network: WalletNetwork.TESTNET,
	selectedWalletId: FREIGHTER_ID,
	modules: allowAllModules(),
});

const ConnectWalletButton = ({ className = "" }) => {
	const [isChecking, setIsChecking] = useState(true);
	const [isConnecting, setIsConnecting] = useState(false);
	const [walletAddress, setWalletAddress] = useState<string | null>(null);

	useEffect(() => {
		const checkConnection = async () => {
			try {
				const savedWallet = localStorage.getItem("stellar_wallet");
				if (savedWallet) {
					const parsedWallet = JSON.parse(savedWallet);
					const { address } = await kit.getAddress();

					if (address === parsedWallet.address) {
						setWalletAddress(address);
						toast.success("Wallet Reconnected", {
							description: `Welcome back! Address: ${address}`,
						});
					} else {
						disconnectWallet();
					}
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

			await kit.openModal({
				onWalletSelected: async (option: ISupportedWallet) => {
					kit.setWallet(option.id);
					const { address } = await kit.getAddress();

					if (!address) throw new Error("Failed to retrieve wallet address");

					setWalletAddress(address);
					localStorage.setItem("stellar_wallet", JSON.stringify({ address }));

					toast.success("Wallet Connected", {
						description: `Connected to ${option.id}. Address: ${address}`,
					});
				},
			});
		} catch (error) {
			toast.error("Connection Failed", {
				description: "Failed to connect to the wallet.",
			});
		} finally {
			setIsConnecting(false);
		}
	};

	const disconnectWallet = () => {
		setWalletAddress(null);
		localStorage.removeItem("stellar_wallet");
		toast.info("Wallet Disconnected", {
			description: "You have been disconnected.",
		});
	};

	return (
		<div className="flex items-center space-x-2">
			<Button
				onClick={connectWallet}
				disabled={isChecking || isConnecting || walletAddress !== null}
				className={className}
			>
				{isChecking ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Checking...
					</>
				) : isConnecting ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Connecting...
					</>
				) : walletAddress ? (
					`Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
				) : (
					"Connect Wallet"
				)}
			</Button>

			{walletAddress && (
				<Button onClick={disconnectWallet} variant="outline">
					<LogOut className="mr-2 h-4 w-4" /> Disconnect
				</Button>
			)}
		</div>
	);
};

export default ConnectWalletButton;
