"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-pink-900/20" />
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            AI-Powered Video Creation
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            {t("title")}
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/en-US/dashboard/new">
              <Button size="lg" className="h-12 px-8 text-base">
                {t("primaryCta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/#features">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                <Play className="mr-2 h-4 w-4" />
                {t("secondaryCta")}
              </Button>
            </Link>
          </div>

         <div className="mt-16 relative">
            <div className="relative mx-auto max-w-3xl rounded-xl border bg-card shadow-2xl">
              <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                  <p className="text-muted-foreground">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}