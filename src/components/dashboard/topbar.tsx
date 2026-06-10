"use client";

import { useTranslations } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/marketing/language-selector";
import { LogOut, User } from "lucide-react";

export function Topbar() {
  const t = useTranslations("nav");
  const tDashboard = useTranslations("dashboard.home");
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <LanguageSelector />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{session?.user?.email}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted text-sm font-medium">
            <span className="text-muted-foreground">{tDashboard("availableCredits")}:</span>
            <span>{session?.user?.credits ?? 0}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            className="text-muted-foreground"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {t("logout")}
          </Button>
        </div>
      </div>
    </header>
  );
}