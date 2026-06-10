"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  CATEGORIES,
  VISUAL_STYLES,
  LANGUAGES,
  OUTPUT_LANGUAGES,
  ASPECT_RATIOS,
  DURATIONS,
  GENERATION_MODES,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const taskFormSchema = z.object({
  title: z.string().max(120).optional(),
  originalText: z.string().min(20).max(20000),
  category: z.string(),
  inputLanguage: z.string(),
  outputLanguage: z.string(),
  subtitleLanguage: z.string().optional(),
  secondarySubtitleLanguage: z.string().optional(),
  bilingualSubtitles: z.boolean(),
  aspectRatio: z.string(),
  visualStyle: z.string(),
  voiceId: z.string(),
  duration: z.string(),
  generationMode: z.string(),
});

type TaskFormData = z.infer<typeof taskFormSchema>;

function setValueHelper(setValue: any, field: string, value: string | null, fallback: string) {
  setValue(field, value ?? fallback);
}

export function NewTaskForm() {
  const t = useTranslations("dashboard.newTask.form");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      originalText: "",
      category: "storytelling",
      inputLanguage: "auto",
      outputLanguage: "en-US",
      subtitleLanguage: "en-US",
      bilingualSubtitles: false,
      secondarySubtitleLanguage: "zh-CN",
      aspectRatio: "9:16",
      visualStyle: "cinematic",
      voiceId: "en_calm_narrator",
      duration: "60",
      generationMode: "standard",
    },
  });

  const bilingualSubtitles = watch("bilingualSubtitles");

  const onSubmit = async (data: TaskFormData) => {
    try {
      const submitData = {
        ...data,
        duration: parseInt(data.duration),
      };

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create task");
      }

      const task = await response.json();
      toast({
        title: tCommon("create"),
        description: "Project created successfully",
      });

      router.push(`/en-US/dashboard/tasks/${task.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label>{t("title")}</Label>
            <Input
              placeholder={t("titlePlaceholder")}
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{String(errors.title.message)}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>{t("originalText")}</Label>
            <Textarea
              placeholder={t("originalTextPlaceholder")}
              className="min-h-[200px]"
              {...register("originalText")}
            />
            {errors.originalText && (
              <p className="text-sm text-destructive">{String(errors.originalText.message)}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("category")}</Label>
              <Select
                defaultValue="storytelling"
                onValueChange={(value) => setValueHelper(setValue, "category", value, "storytelling")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("inputLanguage")}</Label>
              <Select
                defaultValue="auto"
                onValueChange={(value) => setValueHelper(setValue, "inputLanguage", value, "auto")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("outputLanguage")}</Label>
              <Select
                defaultValue="en-US"
                onValueChange={(value) => setValueHelper(setValue, "outputLanguage", value, "en-US")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {OUTPUT_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("aspectRatio")}</Label>
              <Select
                defaultValue="9:16"
                onValueChange={(value) => setValueHelper(setValue, "aspectRatio", value, "9:16")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ASPECT_RATIOS.map((ratio) => (
                    <SelectItem key={ratio.value} value={ratio.value}>
                      {ratio.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("visualStyle")}</Label>
              <Select
                defaultValue="cinematic"
                onValueChange={(value) => setValueHelper(setValue, "visualStyle", value, "cinematic")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {VISUAL_STYLES.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("duration")}</Label>
              <Select
                defaultValue="60"
                onValueChange={(value) => setValueHelper(setValue, "duration", value, "60")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DURATIONS.map((dur) => (
                    <SelectItem key={dur.value} value={String(dur.value)}>
                      {dur.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t("generationMode")}</Label>
              <Select
                defaultValue="standard"
                onValueChange={(value) => setValueHelper(setValue, "generationMode", value, "standard")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GENERATION_MODES.map((mode) => (
                    <SelectItem key={mode.value} value={mode.value}>
                      {mode.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="bilingualSubtitles"
              checked={bilingualSubtitles}
              onCheckedChange={(checked) => setValue("bilingualSubtitles", checked)}
            />
            <Label htmlFor="bilingualSubtitles">{t("bilingualSubtitles")}</Label>
          </div>

          {bilingualSubtitles && (
            <div className="space-y-2">
              <Label>{t("secondarySubtitleLanguage")}</Label>
              <Select
                defaultValue="zh-CN"
                onValueChange={(value) => setValueHelper(setValue, "secondarySubtitleLanguage", value, "zh-CN")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {OUTPUT_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? tCommon("loading") : t("submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}