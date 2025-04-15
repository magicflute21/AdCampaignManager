import { AppSidebar } from "@/components/ui/app-sidebar"
import { SiteHeader } from "@/components/ui/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import useRouteStore from "@/store/useRouteStore"
import Dashboard from "@/pages/Dashboard"
import Campaigns from "@/pages/Campaigns"

export default function Workspace() {
  const currentPage = useRouteStore((s) => s.currentPage);

  const VIEWS = {
    dashboard: Dashboard,
    campaigns: Campaigns,
  };

  const ActiveView = VIEWS[currentPage.id];

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <ActiveView />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}