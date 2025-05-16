import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { authOptions } from "@/lib/auth.config";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import type React from "react";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	if (!session || session.user.role !== "ADMIN") {
		redirect("/auth/signin?callbackUrl=/admin");
	}

	return (
		<div className="flex flex-col md:flex-row min-h-screen">
			<div className="hidden md:block md:w-72 md:flex-shrink-0">
				<AdminSidebar />
			</div>

			<div className="flex-1 w-full overflow-auto">
				<AdminHeader />
				<div className="p-4 md:p-6">{children}</div>
			</div>
		</div>
	);
}
