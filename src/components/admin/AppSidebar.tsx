"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Star, 
  Image as ImageIcon, 
  LayoutTemplate, 
  BarChart3, 
  Search, 
  Settings,
  FolderTree,
  Tags,
  LogOut
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navGroups = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    label: "Catalog",
    items: [
      { title: "Products", url: "/admin/products", icon: Package },
      { title: "Categories", url: "/admin/categories", icon: FolderTree },
      { title: "Collections", url: "/admin/collections", icon: Tags },
    ],
  },
  {
    label: "Sales",
    items: [
      { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
      { title: "Customers", url: "/admin/customers", icon: Users },
    ],
  },
  {
    label: "Content",
    items: [
      { title: "Homepage Builder", url: "/admin/homepage", icon: LayoutTemplate },
      { title: "Media Library", url: "/admin/media", icon: ImageIcon },
      { title: "Reviews", url: "/admin/reviews", icon: Star },
    ],
  },
  {
    label: "Analytics & Settings",
    items: [
      { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
      { title: "SEO", url: "/admin/seo", icon: Search },
      { title: "Settings", url: "/admin/settings", icon: Settings },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="p-4 flex items-center justify-center border-b">
        <Link href="/admin" className="font-bold tracking-tighter text-xl uppercase">
          LUMIÈRE ADMIN
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url || pathname?.startsWith(`${item.url}/`)
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        isActive={isActive} 
                        render={<Link href={item.url} />}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link href="/" />}>
              <LogOut className="rotate-180" />
              <span>Back to Store</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
