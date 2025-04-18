"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useWalletStore } from "@/store/useWalletStore";
import { Wallet } from "lucide-react";
import { useState } from "react";

interface WalletConnectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccess?: () => void;
	redirectPath?: string;
}

/**
 * Modal component that prompts users to connect their wallet
 */
export const WalletConnectionModal = ({
	isOpen,
	onClose,
	onSuccess,
	redirectPath,
}: WalletConnectionModalProps) => {
	const { connect: connectWallet, publicKey } = useWalletStore();
	const [isConnecting, setIsConnecting] = useState(false);

	const handleConnect = async () => {
		try {
			setIsConnecting(true);
			await connectWallet();

			if (publicKey) {
				onSuccess?.();
				onClose();
			}
		} catch (error) {
			console.error("Failed to connect wallet:", error);
		} finally {
			setIsConnecting(false);
		}
	};

	const handleContinue = () => {
		if (redirectPath && typeof window !== "undefined") {
			window.location.href = redirectPath;
		} else {
			onClose();
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Wallet className="h-5 w-5" />
						Connect Your Wallet
					</DialogTitle>
					<DialogDescription>
						You need to connect your wallet to access this feature.
					</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					<p className="text-sm text-muted-foreground">
						Connecting your wallet allows you to interact with blockchain
						features, sign transactions, and manage your digital assets.
					</p>
				</div>
				<DialogFooter className="flex flex-col sm:flex-row gap-2">
					<Button
						variant="outline"
						onClick={handleContinue}
						disabled={isConnecting}
					>
						Cancel
					</Button>
					<Button onClick={handleConnect} disabled={isConnecting}>
						{isConnecting ? "Connecting..." : "Connect Wallet"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
