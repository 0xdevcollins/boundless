import localFont from "next/font/local";
import "./globals.css";
import { metadata } from "./metadata";
import { Providers } from "./providers";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});

const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export { metadata };

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta
					httpEquiv="Cache-Control"
					content="no-cache, no-store, must-revalidate"
				/>
				<meta httpEquiv="Pragma" content="no-cache" />
				<meta httpEquiv="Expires" content="0" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
