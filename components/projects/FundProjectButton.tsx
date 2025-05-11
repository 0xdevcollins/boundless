"use client";

import { useWalletStore } from "@/store/useWalletStore";
import { useState } from "react";
import { Button } from "../ui/button";
import { FundProjectDialog } from "./FundProjectDialog";
// import { Button } from "@/components/ui/button";
// import { useWallet } from "@/hooks/use-wallet";
// import { useState } from "react";
// import { FundProjectDialog } from "./FundProjectDialog";

interface FundProjectButtonProps {
	projectId: string;
	onSuccess?: () => void;
}

export function FundProjectButton({
	projectId,
	onSuccess,
}: FundProjectButtonProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { isConnected, connect } = useWalletStore();

	const handleClick = async () => {
		if (!isConnected) {
			try {
				await connect();
			} catch (error) {
				console.error("Failed to connect wallet:", error);
				return;
			}
		}
		setIsDialogOpen(true);
	};

	return (
		<>
			<Button onClick={handleClick}>
				{isConnected ? "Fund Project" : "Connect Wallet to Fund"}
			</Button>

			<FundProjectDialog
				projectId={projectId}
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				onSuccess={onSuccess}
			/>
		</>
	);
}
