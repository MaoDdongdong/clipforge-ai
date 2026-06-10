"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface Scene {
  id: string;
  sceneIndex: number;
  voiceover: string;
  subtitle: string;
  secondarySubtitle?: string | null;
  visualDescription: string;
  imagePrompt: string;
  imageUrl?: string | null;
  duration: number;
  cameraMotion?: string | null;
  transition?: string | null;
}

interface SceneListProps {
  scenes: Scene[];
}

export function SceneList({ scenes }: SceneListProps) {
  const t = useTranslations("dashboard.taskDetail");

  if (!scenes || scenes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("scenes")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No scenes generated yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("scenes")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {scenes.map((scene) => (
          <div
            key={scene.id}
            className="border rounded-lg p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {t("sceneIndex")} {scene.sceneIndex}
                </Badge>
                <Badge variant="secondary">
                  {scene.duration}s
                </Badge>
              </div>
              {scene.cameraMotion && (
                <span className="text-xs text-muted-foreground">
                  {scene.cameraMotion}
                </span>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {t("voiceover")}
                  </p>
                  <p className="text-sm">{scene.voiceover}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {t("subtitle")}
                  </p>
                  <p className="text-sm">{scene.subtitle}</p>
                </div>
                {scene.secondarySubtitle && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      {t("secondarySubtitle")}
                    </p>
                    <p className="text-sm">{scene.secondarySubtitle}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {t("visualDescription")}
                  </p>
                  <p className="text-sm">{scene.visualDescription}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  {scene.imageUrl ? (
                    <Image
                      src={scene.imageUrl}
                      alt={`Scene ${scene.sceneIndex}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                      No image
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {t("imagePrompt")}
                  </p>
                  <p className="text-xs text-muted-foreground bg-muted p-2 rounded">
                    {scene.imagePrompt}
                  </p>
                </div>
              </div>
            </div>

            {scene.transition && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{t("transition")}:</span>
                <Badge variant="secondary" className="text-xs">
                  {scene.transition}
                </Badge>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}