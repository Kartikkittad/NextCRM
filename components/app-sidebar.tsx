"use client";

import { useState } from "react";
import { Zap, ChevronRight } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";

const navItems = [
  "Overview",
  "Leads",
  "Pipeline",
  "Analytics",
  "Campaigns",
  "Integrations",
] as const;

type NavItem = (typeof navItems)[number];

export function AppSidebar() {
  const [activeNav, setActiveNav] = useState<NavItem>("Overview");

  return (
    <Sidebar className="bg-[#0D1018]">
      <SidebarHeader
        style={{
          padding: "28px 16px 0 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "40px",
            paddingLeft: "8px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #6EE7B7, #818CF8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={16} color="#0F111A" strokeWidth={2.5} />
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: "15px",
              letterSpacing: "-0.02em",
              color: "#E5E7EB",
            }}
          >
            NextCRM
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent style={{ padding: "0 16px" }}>
        <SidebarMenu
          style={{ display: "flex", flexDirection: "column", gap: "4px" }}
        >
          {navItems.map((item) => {
            const isActive = activeNav === item;
            return (
              <SidebarMenuItem key={item}>
                <SidebarMenuButton
                  isActive={isActive}
                  onClick={() => setActiveNav(item)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "9px 12px",
                    borderRadius: "9px",
                    border: "none",
                    borderLeft: isActive
                      ? "2px solid #6EE7B7"
                      : "2px solid transparent",
                    background: isActive
                      ? "rgba(110,231,183,0.1)"
                      : "transparent",
                    color: isActive ? "#6EE7B7" : "#6B7280",
                    fontSize: "13px",
                    fontWeight: isActive ? 600 : 400,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    width: "100%",
                    textAlign: "left",
                    fontFamily: "'Sora', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.04)";
                      e.currentTarget.style.color = "#9CA3AF";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#6B7280";
                    }
                  }}
                >
                  {item}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter style={{ padding: "0 16px 28px 16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #818CF8, #F9A8D4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: 700,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            AK
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{ fontSize: "12px", fontWeight: 600, color: "#E5E7EB" }}
            >
              Alex Kim
            </div>
            <div style={{ fontSize: "11px", color: "#6B7280" }}>Admin</div>
          </div>
          <ChevronRight size={13} color="#4B5563" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppSidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
