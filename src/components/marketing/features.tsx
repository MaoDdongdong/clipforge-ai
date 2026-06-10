"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Layout, Image, Subtitles, Download, Languages } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "ai-script-rewrite": <FileText className="h-8 w-8" />,
  "storyboard-generation": <Layout className="h-8 w-8" />,
  "visual-prompt-builder": <Image className="h-8 w-8" />,
  "subtitle-assets": <Subtitles className="h-8 w-8" />,
  "mock-export-workflow": <Download className="h-8 w-8" />,
  "bilingual-creation": <Languages className="h-8 w-8" />,
};

export function Features() {
  const t = useTranslations("home.features");

  const features = [
    { key: "aiScriptRewrite", icon: "ai-script-rewrite" },
    { key: "storyboardGeneration", icon: "storyboard-generation" },
    { key: "visualPromptBuilder", icon: "visual-prompt-builder" },
    { key: "subtitleAssets", icon: "subtitle-assets" },
    { key: "mockExportWorkflow", icon: "mock-export-workflow" },
    { key: "bilingualCreation", icon: "bilingual-creation" },
  ];

  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <Card key={feature.key} className="bg-card border-border">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center mb-4 text-primary">
                  {iconMap[feature.icon]}
                </div>
                <CardTitle className="text-xl">
                  {t(`${feature.key}.title`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t(`${feature.key}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
