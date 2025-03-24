import React from "react";
import ConnectWalletButton from "@/components/connect-wallet";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { Sidebar } from "@/components/sidebar";

export const metadata = {
  title: "Dashboard",
  description: "User dashboard layout",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <ConnectWalletButton />
        </header>

        <main className="flex-1 p-5">{children}</main>
      </div>
    </div>
  );
}
