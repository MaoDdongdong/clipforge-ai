"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { TaskStatus } from "@prisma/client";

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const t = useTranslations("status");

  const variantMap: Record<TaskStatus, "default" | "secondary" | "destructive" | "outline"> = {
    PENDING: "secondary",
    REWRITING: "secondary",
    STORYBOARDING: "secondary",
    GENERATING_ASSETS: "secondary",
    VOICEOVER: "secondary",
    SUBTITLES: "secondary",
    COMPOSING: "secondary",
    COMPLETED: "default",
    FAILED: "destructive",
  };

  return (
    <Badge variant={variantMap[status] || "secondary"}>
      {t(status)}
    </Badge>
  );
}