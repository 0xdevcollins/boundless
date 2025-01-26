"use client";

import * as React from "react";
import {
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  Map,
  PieChart,
} from "lucide-react";

import { NavItems } from "@/components/nav-items";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";

// Sample Data
const data = {
  user: {
    name: "collins",
    email: "collinschristroa@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  items: [
    {
      name: "Dashboard",
      url: "#",
      icon: LayoutDashboardIcon,
    },
    {
      name: "My Ideas",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Funded Ideas",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className={className} {...props}>
      <SidebarHeader className="flesx items-scenter gap-3">
          <Image src="/logo.svg" width={40} height={40} alt="Logo" className="w-[80%]" />
      </SidebarHeader>

      <SidebarContent>
        <NavItems items={data.items} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            ...data.user,
            avatar: data.user.avatar || "/default-avatar.png",
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
