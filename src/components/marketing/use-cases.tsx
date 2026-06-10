"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, GraduationCap, Megaphone, BookOpen } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  socialMedia: <Smartphone className="h-8 w-8" />,
  education: <GraduationCap className="h-8 w-8" />,
  marketing: <Megaphone className="h-8 w-8" />,
  storytelling: <BookOpen className="h-8 w-8" />,
};

export function UseCases() {
  const t = useTranslations("home.useCases");

  const cases = [
    { key: "socialMedia", icon: "socialMedia" },
    { key: "education", icon: "education" },
    { key: "marketing", icon: "marketing" },
    { key: "storytelling", icon: "storytelling" },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {cases.map((caseItem) => (
            <Card key={caseItem.key} className="bg-card border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center mb-4 text-primary">
                  {iconMap[caseItem.icon]}
                </div>
                <CardTitle className="text-lg">
                  {t(`${caseItem.key}.title`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t(`${caseItem.key}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
