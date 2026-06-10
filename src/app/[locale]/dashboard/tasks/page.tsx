import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskCard } from "@/components/dashboard/task-card";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function TasksPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/auth/login");
  }

  const tasks = await db.videoTask.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <Link href="/dashboard/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      {tasks.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-lg font-medium mb-2">No tasks yet</p>
            <p className="text-muted-foreground mb-6">
              Create your first project to get started
            </p>
            <Link href="/dashboard/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Project
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={{
                id: task.id,
                title: task.title,
                status: task.status,
                progress: task.progress,
                outputLanguage: task.outputLanguage,
                category: task.category,
                createdAt: task.createdAt,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}