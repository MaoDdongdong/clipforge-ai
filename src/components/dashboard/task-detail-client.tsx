"use client";

import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { TaskStatusBadge } from "@/components/dashboard/task-status-badge";
import { SceneList } from "@/components/dashboard/scene-list";
import { PublishAssetsCard } from "@/components/dashboard/publish-assets-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Play } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

interface TaskDetailClientProps {
  task: {
    id: string;
    title: string;
    originalText: string;
    rewrittenText: string | null;
    status: string;
    progress: number;
    outputLanguage: string;
    category: string;
    visualStyle: string;
    createdAt: Date;
    publishTitle: string | null;
    publishDescription: string | null;
    hashtags: string[];
    outputVideoUrl: string | null;
    coverUrl: string | null;
    scenes: Array<{
      id: string;
      sceneIndex: number;
      voiceover: string;
      subtitle: string;
      secondarySubtitle: string | null;
      visualDescription: string;
      imagePrompt: string;
      imageUrl: string | null;
      duration: number;
      cameraMotion: string | null;
      transition: string | null;
    }>;
  };
}

export function TaskDetailClient({ task }: TaskDetailClientProps) {
  const t = useTranslations("dashboard.taskDetail");
  const tCommon = useTranslations("common");
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const canGenerate = task.status === "PENDING" || task.status === "FAILED";
  const isGenerating = task.status !== "PENDING" && task.status !== "FAILED" && task.status !== "COMPLETED" && task.status !== "FAILED";

  const handleGenerate = async () => {
    try {
      const response = await fetch(`/api/tasks/${task.id}/generate`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Generation failed");
      }

      toast({
        title: "Success",
        description: "Video generated successfully",
      });

      router.refresh();
    } catch {
      toast({
        title: "Error",
        description: "Failed to generate video",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/en-US/dashboard/tasks">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {tCommon("back")}
          </Button>
        </Link>
        <h1 className="text-3xl font-bold flex-1">{task.title}</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t("title")}</CardTitle>
            <div className="flex items-center gap-4">
              <TaskStatusBadge status={task.status as any} />
              {canGenerate && (
                <Button onClick={handleGenerate} disabled={isGenerating}>
                  <Play className="h-4 w-4 mr-2" />
                  {isGenerating ? t("generating") : t("generate")}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground">{t("status")}</p>
              <p className="text-sm">{task.status}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">{t("progress")}</p>
              <p className="text-sm">{task.progress}%</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">{t("outputLanguage")}</p>
              <p className="text-sm">{task.outputLanguage}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">{t("category")}</p>
              <p className="text-sm">{task.category}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">{t("progress")}</p>
            <Progress value={task.progress} className="h-2" />
          </div>

          <div className="text-sm text-muted-foreground">
            {t("createdAt")}: {format(new Date(task.createdAt), "PPpp")}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("originalScript")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap text-sm">{task.originalText}</p>
        </CardContent>
      </Card>

      {task.rewrittenText && (
        <Card>
          <CardHeader>
            <CardTitle>{t("rewrittenScript")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm">{task.rewrittenText}</p>
          </CardContent>
        </Card>
      )}

      {task.outputVideoUrl && (
        <Card>
          <CardHeader>
            <CardTitle>{t("videoPreview")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden max-w-lg">
              <Image
                src={task.outputVideoUrl}
                alt="Video Preview"
                fill
                className="object-cover"
              />
            </div>
          </CardContent>
        </Card>
      )}

      <PublishAssetsCard
        title={task.publishTitle || undefined}
        description={task.publishDescription || undefined}
        hashtags={task.hashtags}
      />

      <SceneList scenes={task.scenes} />
    </div>
  );
}