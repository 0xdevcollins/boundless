"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<ThemeProvider>{children}</ThemeProvider>
			<Toaster theme="dark" />
		</SessionProvider>
	);
}
