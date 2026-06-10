"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { FileEdit, Sparkles, Download } from "lucide-react";

export function Workflow() {
  const t = useTranslations("home.workflow");

  const steps = [
    { key: "step1", icon: <FileEdit className="h-6 w-6" /> },
    { key: "step2", icon: <Sparkles className="h-6 w-6" /> },
    { key: "step3", icon: <Download className="h-6 w-6" /> },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <Card key={step.key} className="relative bg-card border-border">
              <CardContent className="pt-6">
                <div className="absolute -top-4 left-6 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center mb-4 text-primary">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t(`${step.key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(`${step.key}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
