"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  DollarSign,
  Milestone,
  Settings,
  Menu,
  Newspaper,
  LogOut,
  Moon,
  Sun,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { signOut } from "next-auth/react"
import { useThemeStore } from "@/store/useThemeStore"

export default function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useThemeStore()
  const router = useRouter()

  const handleThemeToggle = () => {
    toggleTheme()
    document.documentElement.classList.toggle("dark")
  }

  const handleLogout = async () => {
    await signOut({
      redirect: false,
      callbackUrl: "/auth/signin",
    })
    router.push("/auth/signin")
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: FolderKanban,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Blog",
      href: "/admin/blog",
      icon: Newspaper,
    },
    {
      name: "Funding",
      href: "/admin/funding",
      icon: DollarSign,
    },
    {
      name: "Milestones",
      href: "/admin/milestones",
      icon: Milestone,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col min-h-screen">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl text-foreground font-bold">Boundless Admin</h2>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-3 hover:text-secondary text-sm rounded-md transition-colors",
              pathname === item.href || pathname.startsWith(`admin/${item.href}`)
                ? "bg-primary text-secondary hover:text-secondary font-medium"
                : "text-muted-foreground hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-foreground",
            )}
            onClick={() => setOpen(false)}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="flex items-center justify-between my-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", theme === "light" ? "text-primary" : "text-muted-foreground")}
            onClick={handleThemeToggle}
          >
            <Sun className="h-4 w-4" />
            <span className="sr-only">Light mode</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", theme === "dark" ? "text-primary" : "text-muted-foreground")}
            onClick={handleThemeToggle}
          >
            <Moon className="h-4 w-4" />
            <span className="sr-only">Dark mode</span>
          </Button>
        </div>
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-destructive dark:hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      <div className="p-4 border-t border-border">
        <Link
          href="/dashboard"
          className="flex items-center px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
          onClick={() => setOpen(false)}
        >
          Back to Site
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile sidebar using Sheet */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-background border-r border-border">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar - always visible */}
      <div className="hidden md:block bg-background border-r border-border min-w-72">
        <SidebarContent />
      </div>
    </>
  )
}
