"use client";

import { signTransaction } from "@/hooks/useStellarWallet";
import { contractClient } from "@/src/contracts/boundless_contract";
import { useWalletStore } from "@/store/useWalletStore";
import { convertUSDToStroops, getXLMPrice } from "@/utils/price";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/components/ui/use-toast";
// import { contractClient } from "@/src/contracts/boundless_contract";
// import { useWalletStore } from "@/hooks/use-wallet";
// import { useState } from "react";

interface FundProjectDialogProps {
	projectId: string;
	isOpen: boolean;
	onClose: () => void;
	onSuccess?: () => void;
}

export function FundProjectDialog({
	projectId,
	isOpen,
	onClose,
	onSuccess,
}: FundProjectDialogProps) {
	const [amount, setAmount] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [xlmPrice, setXlmPrice] = useState<number | null>(null);
	const { publicKey } = useWalletStore();

	useEffect(() => {
		const fetchPrice = async () => {
			try {
				const price = await getXLMPrice();
				setXlmPrice(price);
			} catch (error) {
				console.error("Failed to fetch XLM price:", error);
			}
		};
		fetchPrice();
	}, []);

	const handleFund = async () => {
		if (!publicKey || !signTransaction) {
			toast.error("Please connect your wallet first");
			return;
		}
		contractClient.options.publicKey = publicKey;
		contractClient.options.signTransaction = signTransaction;
		toast.success("Funding project...");

		if (!xlmPrice) {
			toast.error("Failed to fetch XLM price. Please try again.");
			return;
		}

		try {
			setIsLoading(true);

			const tx = await contractClient.fund_project({
				project_id: projectId,
				amount: convertUSDToStroops(Number(amount), xlmPrice),
				funder: publicKey,
				token_contract:
					"CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC", // Native XLM asset address
			});

			// Sign and send the transaction
			const result = await tx.signAndSend();

			if (result) {
				toast.success("Project funded successfully!");
				onSuccess?.();
				onClose();
			} else {
				throw new Error("Transaction failed");
			}
		} catch (error) {
			console.error("Funding error:", error);
			toast.error("Failed to fund project. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Fund Project</DialogTitle>
					<DialogDescription>
						Enter the amount you want to fund in USD
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="amount">Amount (USD)</Label>
						<Input
							id="amount"
							type="number"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							placeholder="Enter amount in USD"
						/>
						{xlmPrice && amount && (
							<p className="text-sm text-gray-500">
								≈ {(Number(amount) / xlmPrice).toFixed(2)} XLM
							</p>
						)}
					</div>
					<Button
						onClick={handleFund}
						disabled={isLoading || !amount || Number(amount) <= 0}
					>
						{isLoading ? "Funding..." : "Fund Project"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
