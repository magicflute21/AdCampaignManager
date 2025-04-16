import * as React from "react"
import {
  LayoutDashboardIcon,
  ListIcon,
} from "lucide-react"
import { NavMain } from "@/components/layout/nav-main"
import { NavSecondary } from "@/components/layout/nav-secondary"
import { NavUser } from "@/components/layout/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import adcashLogo from "@/assets/adcash-logo.svg" // light version
import adcashLogoDark from "@/assets/adcash-logo-dark.svg"
import { NAV } from "@/lib/constants"
import { useTheme } from "@/components/theme-provider"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboardIcon,
      id: NAV.DASHBOARD,
    },
    {
      title: "Campaigns",
      url: "#",
      icon: ListIcon,
      id: NAV.CAMPAIGNS,
    },
  ],
  navSecondary: [],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme } = useTheme();
  const logo = theme === 'dark' ? adcashLogo : adcashLogoDark;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <img src={logo} alt="adcash logo" className="" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}