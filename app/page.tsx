import RecentActivity from "@/components/recent-activity";
import { AppSidebar } from "@/components/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { PlusSquare, View } from "lucide-react";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Boundless
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <div className=" rounded-xl bg-muted/50 px-6 py-4">
              <h3 className="font-bold text-2xl">Total Ideas</h3>
              <p>24</p>
            </div>
            <div className="rounded-xl bg-muted/50 px-6 py-4">
              <h3 className="font-bold text-2xl">Funded Projects</h3>
              <p>24</p>
            </div>
            <div className="rounded-xl bg-muted/50 px-6 py-4">
              <h3 className="font-bold text-2xl">Total Raised</h3>
              <p>145,230 XLM</p>
            </div>
            <div className="rounded-xl bg-muted/50 px-6 py-4">
              <h3 className="font-bold text-2xl">Supporters</h3>
              <p>89</p>
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p">
            <div className="flex gap-4">
              <Button size="lg" className="w-full py-10">
                <PlusSquare /> Create New Idea
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full py-10 border-black border-2"
              >
                <View /> Explore Community Ideas
              </Button>
            </div>
            <div className="p-4">
              <RecentActivity />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
