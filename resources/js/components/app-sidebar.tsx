import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { dashboard } from "@/routes";
import products from "@/routes/products";
import users from "@/routes/users";
import { type NavItem } from "@/types";
import { Link } from "@inertiajs/react";
import { Box, Fingerprint, LayoutGrid, Users } from "lucide-react";
import AppLogo from "./app-logo";

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: dashboard(),
    icon: LayoutGrid,
  },
  {
    title: "Product",
    href: products.index(),
    icon: Box,
  },
  // {
  //   title: "Inventory",
  //   href: inventories(),
  //   icon: Package,
  // },
  {
    title: "User",
    href: users.index(),
    icon: Users,
  },
  {
    title: "Role",
    href: dashboard(),
    icon: Fingerprint,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={dashboard()} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
