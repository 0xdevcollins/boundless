import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth.config";
import AdminSidebar from "@/components/admin/AdminSidebarBar";
import AdminHeader from "@/components/admin/AdminHeader";

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
        <div className="flex min-h-screen">
            <AdminSidebar />
            <div className="overflow-auto w-full">
                <AdminHeader />
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
}
