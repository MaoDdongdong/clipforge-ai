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

  // Extract locale from pathname for dynamic links
  const validLocales = ["en-US", "zh-CN"];
  const pathnameLocale = pathname?.split("/")[1];
  const locale = validLocales.includes(pathnameLocale) ? pathnameLocale : "en-US";

  const menuItems = [
    { href: `/${locale}/dashboard/new`, icon: Plus, label: t("newProject") },
    { href: `/${locale}/dashboard/tasks`, icon: ListTodo, label: t("tasks") },
    { href: `/${locale}/dashboard/assets`, icon: FolderOpen, label: t("assets") },
    { href: `/${locale}/dashboard/voices`, icon: Mic, label: t("voiceLibrary") },
    { href: `/${locale}/dashboard/billing`, icon: CreditCard, label: t("credits") },
    { href: `/${locale}/dashboard/settings`, icon: Settings, label: t("settings") },
  ];

  const adminItems = [
    { href: `/${locale}/admin`, icon: Shield, label: t("overview") },
  ];

  return (
    <aside className="w-64 min-h-screen border-r bg-card">
      <div className="p-6">
        <Link href={`/${locale}/dashboard`} className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
            <span className="text-black font-bold text-sm">CF</span>
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
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
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
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
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
