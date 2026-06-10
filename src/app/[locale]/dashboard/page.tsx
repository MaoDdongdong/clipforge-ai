import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle, XCircle, ListTodo } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/en-US/auth/login");
  }

  const tasks = await db.videoTask.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      status: true,
      progress: true,
    },
  });

  const completedTasks = tasks.filter((t) => t.status === "COMPLETED").length;
  const failedTasks = tasks.filter((t) => t.status === "FAILED").length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/dashboard/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Credits Available
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{session.user.credits}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <ListTodo className="h-5 w-5 text-muted-foreground" />
              <span className="text-3xl font-bold">{tasks.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-3xl font-bold">{completedTasks}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Failed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <span className="text-3xl font-bold">{failedTasks}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Link href="/dashboard/new">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Create New Project
            </Button>
          </Link>
          <Link href="/dashboard/tasks">
            <Button variant="outline">
              <ListTodo className="h-4 w-4 mr-2" />
              View All Tasks
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}