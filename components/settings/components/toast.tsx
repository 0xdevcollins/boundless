"use client";

import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

interface Toast {
	id: string;
	title: string;
	description?: string;
}

interface ToastContextType {
	toasts: Toast[];
	toast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const toast = ({ title, description }: Omit<Toast, "id">) => {
		const id = Math.random().toString(36).substring(2, 9);
		setToasts((prev) => [...prev, { id, title, description }]);
	};

	return (
		<ToastContext.Provider value={{ toasts, toast }}>
			{children}
			<ToastContainer />
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
}

function ToastContainer() {
	const { toasts, toast: addToast } = useToast();

	return (
		<div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 max-w-md">
			{toasts.map((toast) => (
				<ToastItem key={toast.id} toast={toast} />
			))}
		</div>
	);
}

function ToastItem({ toast }: { toast: Toast }) {
	const { toasts, toast: addToast } = useToast();
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	if (!isVisible) return null;

	return (
		<div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 animate-in slide-in-from-right">
			<div className="flex justify-between items-start">
				<div>
					<h4 className="font-medium text-gray-900">{toast.title}</h4>
					{toast.description && (
						<p className="text-sm text-gray-500 mt-1">{toast.description}</p>
					)}
				</div>
				<button
					type="button"
					onClick={() => setIsVisible(false)}
					className="text-gray-400 hover:text-gray-500"
				>
					✕
				</button>
			</div>
		</div>
	);
}
