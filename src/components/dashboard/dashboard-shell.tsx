"use client";

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { Providers } from "@/components/providers/session-provider";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </Providers>
  );
}