"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { TASK_STATUSES } from "@/lib/constants";
import { TaskStatus } from "@prisma/client";
import { Eye } from "lucide-react";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    status: TaskStatus;
    progress: number;
    outputLanguage: string;
    category: string;
    createdAt: Date;
  };
}

export function TaskCard({ task }: TaskCardProps) {
  const t = useTranslations("dashboard.taskList.table");
  const tStatus = useTranslations("status");

  const statusLabel = tStatus(task.status);
  const statusInfo = TASK_STATUSES.find((s) => s.value === task.status);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-medium line-clamp-1">
            {task.title}
          </CardTitle>
          <Badge
            variant={task.status === "COMPLETED" ? "default" : "secondary"}
            className="ml-2"
          >
            {statusLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{t("progress")}</span>
            <span className="font-medium">{task.progress}%</span>
          </div>

          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${task.progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{task.outputLanguage === "en-US" ? "EN" : "中"}</span>
            <span>{format(new Date(task.createdAt), "MMM d, yyyy")}</span>
          </div>

          <Link href={`/dashboard/tasks/${task.id}`}>
            <Button variant="outline" size="sm" className="w-full mt-2">
              <Eye className="h-4 w-4 mr-2" />
              {t("actions")}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}