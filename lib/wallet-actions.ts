"use client";

import { useWalletStore } from "@/store/useWalletStore";
import { useState } from "react";

/**
 * Higher-order function that ensures a wallet is connected before executing an action
 * @param action The action to execute if wallet is connected
 * @returns A function that checks wallet connection before executing the action
 */
export const withWalletProtection = <T extends (...args: unknown[]) => unknown>(
	action: T,
): ((...args: Parameters<T>) => void) => {
	return (...args: Parameters<T>) => {
		const { isConnected, publicKey } = useWalletStore();

		if (!isConnected || !publicKey) {
			return;
		}

		action(...args);
	};
};

/**
 * Hook that provides wallet protection with modal support
 * @returns An object with the protected action and modal state
 */
export const useWalletProtection = <T extends (...args: unknown[]) => unknown>(
	action: T,
) => {
	const { isConnected, publicKey } = useWalletStore();
	const [showModal, setShowModal] = useState(false);

	const protectedAction = (...args: Parameters<T>) => {
		if (!isConnected || !publicKey) {
			setShowModal(true);
			return;
		}

		action(...args);
	};

	return {
		protectedAction,
		showModal,
		setShowModal,
		isWalletConnected: isConnected && !!publicKey,
	};
};

/**
 * Example usage:
 *
 * const { protectedAction, showModal, setShowModal } = useWalletProtection(async (data) => {
 *   // This code will only run if a wallet is connected
 *   await submitProject(data);
 * });
 *
 * return (
 *   <>
 *     <Button onClick={protectedAction}>Submit Project</Button>
 *     <WalletConnectionModal
 *       isOpen={showModal}
 *       onClose={() => setShowModal(false)}
 *       onSuccess={() => protectedAction(data)}
 *     />
 *   </>
 * );
 */
