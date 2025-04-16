import { AppSidebar } from "@/components/layout/app-sidebar"
import { SiteHeader } from "@/components/ui/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import useRouteStore from "@/store/useRouteStore"
import Dashboard from "@/pages/Dashboard"
import Campaigns from "@/pages/Campaigns"
import { MainContent } from "./main-content"

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
        <MainContent>
          <ActiveView />
        </MainContent>
      </SidebarInset>
    </SidebarProvider>
  )
}