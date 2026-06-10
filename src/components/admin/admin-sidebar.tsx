"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  ListTodo,
  Cpu,
} from "lucide-react";

export function AdminSidebar() {
  const t = useTranslations("admin.menu");
  const pathname = usePathname();

  const menuItems = [
    { href: "/en-US/admin", icon: LayoutDashboard, label: t("overview") },
    { href: "/en-US/admin/users", icon: Users, label: t("users") },
    { href: "/en-US/admin/tasks", icon: ListTodo, label: t("tasks") },
    { href: "/en-US/admin/models", icon: Cpu, label: t("models") },
  ];

  return (
    <aside className="w-64 min-h-screen border-r bg-card">
      <div className="p-6">
        <Link href="/en-US/admin" className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">CF</span>
          </div>
          <span className="font-bold text-lg">Admin</span>
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
      </div>
    </aside>
  );
}