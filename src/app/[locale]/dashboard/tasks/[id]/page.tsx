import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { TaskDetailClient } from "@/components/dashboard/task-detail-client";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/auth/login");
  }

  const { id } = await params;

  const task = await db.videoTask.findUnique({
    where: { id },
    include: {
      scenes: {
        orderBy: { sceneIndex: "asc" },
      },
    },
  });

  if (!task) {
    redirect("/dashboard/tasks");
  }

  // Check ownership
  if (task.userId !== session.user.id && session.user.role !== "ADMIN") {
    redirect("/dashboard/tasks");
  }

  return (
    <TaskDetailClient
      task={{
        id: task.id,
        title: task.title,
        originalText: task.originalText,
        rewrittenText: task.rewrittenText,
        status: task.status,
        progress: task.progress,
        outputLanguage: task.outputLanguage,
        category: task.category,
        visualStyle: task.visualStyle,
        createdAt: task.createdAt,
        publishTitle: task.publishTitle,
        publishDescription: task.publishDescription,
        hashtags: task.hashtags,
        outputVideoUrl: task.outputVideoUrl,
        coverUrl: task.coverUrl,
        scenes: task.scenes,
      }}
    />
  );
}