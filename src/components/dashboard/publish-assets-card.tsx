"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PublishAssetsCardProps {
  title?: string;
  description?: string;
  hashtags?: string[];
}

export function PublishAssetsCard({
  title,
  description,
  hashtags = [],
}: PublishAssetsCardProps) {
  const t = useTranslations("dashboard.taskDetail");
  const publishAssetsLabel = t("publishAssets");

  if (!title && !description && hashtags.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{publishAssetsLabel}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No publish assets generated yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{publishAssetsLabel}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {title && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">
              {t("publishTitle")}
            </p>
            <p className="font-medium">{title}</p>
          </div>
        )}

        {description && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">
              {t("publishDescription")}
            </p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        )}

        {hashtags.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              {t("hashtags")}
            </p>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}