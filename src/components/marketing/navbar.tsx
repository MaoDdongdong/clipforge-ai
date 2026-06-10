"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const t = useTranslations("nav");
  const tHome = useTranslations("home");
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Extract locale from pathname for logo link - validate against known locales
  const validLocales = ["en-US", "zh-CN"];
  const pathnameLocale = pathname?.split("/")[1];
  const locale = validLocales.includes(pathnameLocale) ? pathnameLocale : "en-US";
  const logoHref = `/${locale}`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href={logoHref} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
              <span className="text-black font-bold text-sm">CF</span>
            </div>
            <span className="font-bold text-lg">ClipForge AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href={logoHref} className="text-sm font-medium hover:text-foreground">
              {t("home")}
            </Link>
            <Link href={`/${locale}/pricing`} className="text-sm font-medium hover:text-foreground">
              {t("pricing")}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <Link href={`/${locale}/dashboard`}>
                <Button variant="ghost" size="sm">
                  {t("dashboard")}
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                {t("logout")}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href={`/${locale}/auth/login`}>
                <Button variant="ghost" size="sm">
                  {t("login")}
                </Button>
              </Link>
              <Link href={`/${locale}/auth/register`}>
                <Button size="sm">{t("register")}</Button>
              </Link>
            </div>
          )}

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href={logoHref} className="text-sm font-medium">
              {t("home")}
            </Link>
            <Link href={`/${locale}/pricing`} className="text-sm font-medium">
              {t("pricing")}
            </Link>
            {!session && (
              <>
                <Link href={`/${locale}/auth/login`} className="text-sm font-medium">
                  {t("login")}
                </Link>
                <Link href={`/${locale}/auth/register`} className="text-sm font-medium">
                  {t("register")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
