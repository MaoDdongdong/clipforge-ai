"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  Plus,
  ListTodo,
  FolderOpen,
  Mic,
  CreditCard,
  Settings,
  Shield,
} from "lucide-react";

export function Sidebar() {
  const t = useTranslations("dashboard.menu");
  const pathname = usePathname();
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === "ADMIN";

  const menuItems = [
    { href: "/en-US/dashboard/new", icon: Plus, label: t("newProject") },
    { href: "/en-US/dashboard/tasks", icon: ListTodo, label: t("tasks") },
    { href: "/en-US/dashboard/assets", icon: FolderOpen, label: t("assets") },
    { href: "/en-US/dashboard/voices", icon: Mic, label: t("voiceLibrary") },
    { href: "/en-US/dashboard/billing", icon: CreditCard, label: t("credits") },
    { href: "/en-US/dashboard/settings", icon: Settings, label: t("settings") },
  ];

  const adminItems = [
    { href: "/en-US/admin", icon: Shield, label: t("overview") },
  ];

  return (
    <aside className="w-64 min-h-screen border-r bg-card">
      <div className="p-6">
        <Link href="/en-US/dashboard" className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">CF</span>
          </div>
          <span className="font-bold text-lg">ClipForge AI</span>
        </Link>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {isAdmin && (
          <div className="mt-8">
            <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Admin
            </p>
            <nav className="space-y-1">
              {adminItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </aside>
  );
}