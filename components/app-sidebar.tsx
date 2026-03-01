"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { BoxIcon, LayoutDashboard, User, TagsIcon, Badge } from "lucide-react";

const navigationSection = [
  {
    label: "Main",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
        disabled: false,
      },
      {
        title: "Users",
        icon: User,
        href: "/users",
        disabled: false,
      },
      {
        title: "Leads",
        icon: TagsIcon,
        href: "/admin/categories",
        disabled: false,
      },
      {
        title: "Pipeline",
        icon: Badge,
        href: "/admin/brands",
        disabled: false,
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="dark">
      <SidebarHeader />

      <SidebarContent>
        {navigationSection.map((section) => (
          <SidebarGroup key={section.label}>
            <div className="relative z-20 flex items-center text-lg font-medium text-white mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              NextCRM
            </div>
            <SidebarMenu>
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem
                    key={item.title}
                    className="hover:bg-gray-800 rounded"
                  >
                    <SidebarMenuButton asChild disabled={item.disabled}>
                      <Link
                        href={item.href}
                        className="text-white"
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>t</SidebarFooter>
    </Sidebar>
  );
}
