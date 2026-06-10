import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default async function AdminTasksPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const tasks = await db.videoTask.findMany({
    include: {
      user: {
        select: { email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Tasks</h1>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell className="text-muted-foreground">
                  {task.user.email}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      task.status === "COMPLETED"
                        ? "default"
                        : task.status === "FAILED"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>{task.outputLanguage}</TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(task.createdAt), "MMM d, yyyy")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}