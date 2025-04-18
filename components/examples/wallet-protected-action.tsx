"use client";

import { Button } from "@/components/ui/button";
import { WalletConnectionModal } from "@/components/wallet-connection-modal";
import { useWalletProtection } from "@/lib/wallet-actions";
import { toast } from "sonner";

/**
 * Example component that demonstrates how to use the useWalletProtection hook
 */
export const WalletProtectedAction = () => {
	// Define the action that requires wallet connection
	const handleProtectedAction = async () => {
		// This code will only run if a wallet is connected
		toast.success("Protected action executed", {
			description: "This action required a wallet connection.",
		});

		// Simulate an async operation
		await new Promise((resolve) => setTimeout(resolve, 1000));

		return "Action completed successfully";
	};

	// Use the hook to get the protected action and modal state
	const { protectedAction, showModal, setShowModal } = useWalletProtection(
		handleProtectedAction,
	);

	return (
		<div className="space-y-4">
			<h3 className="text-lg font-medium">Wallet Protected Action</h3>
			<p className="text-sm text-muted-foreground">
				This button will show a modal to connect your wallet if needed.
			</p>
			<Button onClick={protectedAction}>Execute Protected Action</Button>

			{/* Render the wallet connection modal */}
			<WalletConnectionModal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				onSuccess={protectedAction}
			/>
		</div>
	);
};
