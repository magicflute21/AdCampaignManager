import {  type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import useRouteStore, { PageName } from "@/store/useRouteStore"
export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    id: PageName
  }[]
}) {
  const currentPage = useRouteStore((s) => s.currentPage);
  const setCurrentPage = useRouteStore((s) => s.setCurrentPage);
  
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
              tooltip={item.title} 
              isActive={item.id === currentPage.id} 
              onClick={() => setCurrentPage({ id: item.id, name: item.title})}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}