import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/en-US/auth/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/en-US/dashboard");
  }

  return <DashboardShell>{children}</DashboardShell>;
}