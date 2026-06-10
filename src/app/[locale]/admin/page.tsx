import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { MetricCard } from "@/components/admin/metric-card";
import { Users, ListTodo, CheckCircle, XCircle } from "lucide-react";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/en-US/dashboard");
  }

  const [userCount, taskCount, completedCount, failedCount] = await Promise.all([
    db.user.count(),
    db.videoTask.count(),
    db.videoTask.count({ where: { status: "COMPLETED" } }),
    db.videoTask.count({ where: { status: "FAILED" } }),
  ]);

   const totalCreditsConsumed = await db.creditTransaction.aggregate({
    _sum: { amount: true },
    where: { amount: { lt: 0 } },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-4">
        <MetricCard
          title="Total Users"
          value={userCount}
        />
        <MetricCard
          title="Total Tasks"
          value={taskCount}
        />
        <MetricCard
          title="Completed Tasks"
          value={completedCount}
        />
        <MetricCard
          title="Failed Tasks"
          value={failedCount}
        />
      </div>

      <MetricCard
        title="Total Credits Consumed"
        value={Math.abs(totalCreditsConsumed._sum.amount || 0)}
        description="All time credit usage across all users"
      />
    </div>
  );
}