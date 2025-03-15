import type { ValidationStatus } from "@/types/project";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatValidationStatus(
	status: ValidationStatus | null | undefined,
) {
	if (!status) return "Unknown";
	return status.charAt(0) + status.slice(1).toLowerCase();
}

export const formatAddress = (address: string) => {
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
