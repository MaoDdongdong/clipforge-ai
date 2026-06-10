"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function PricingPreview() {
  const t = useTranslations("pricing");

  const plans = ["free", "creator", "pro", "enterprise"];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan} className="bg-card border-border flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{t(`${plan}.name`)}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{t(`${plan}.price`)}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {t(`${plan}.period`)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm font-medium mb-4">{t(`${plan}.credits`)}</p>
                <ul className="space-y-2">
                  {(t.raw(`${plan}.features`) as string[]).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/en-US/auth/register" className="w-full">
                  <Button className="w-full" variant={plan === "pro" ? "default" : "outline"}>
                    {t("getStarted")}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
