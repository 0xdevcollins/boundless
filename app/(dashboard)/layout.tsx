import { MobileSidebar } from "@/components/mobile-sidebar";
import { Sidebar } from "@/components/sidebar";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-screen">
			{/* Desktop Sidebar */}
			<div className="hidden border-r md:block">
				<Sidebar />
			</div>

			{/* Main Content */}
			<div className="flex w-full flex-1 flex-col">
				{/* Mobile Header with Menu */}
				<header className="flex h-14 items-center border-b px-4 lg:px-6">
					<MobileSidebar />
				</header>

				<main className="flex-1 p-5">{children}</main>
			</div>
		</div>
	);
}
