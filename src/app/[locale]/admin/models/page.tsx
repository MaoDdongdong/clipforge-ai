import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminModelsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/en-US/dashboard");
  }

  const aiProvider = process.env.AI_PROVIDER || "mock";
  const openAiConfigured =
    !!process.env.OPENAI_COMPATIBLE_API_KEY &&
    !!process.env.OPENAI_COMPATIBLE_BASE_URL;
  const model = process.env.OPENAI_COMPATIBLE_MODEL || "Not set";

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">AI Model Configuration</h1>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Current Provider</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant="default">{aiProvider}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>OpenAI-Compatible Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <Badge variant={openAiConfigured ? "default" : "secondary"}>
                {openAiConfigured ? "Configured" : "Not Configured"}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">API Key</span>
              <span className="text-sm text-muted-foreground">
                {openAiConfigured ? "•••••••• (configured)" : "Not set"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Base URL</span>
              <span className="text-sm text-muted-foreground">
                {process.env.OPENAI_COMPATIBLE_BASE_URL || "Not set"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Model</span>
              <span className="text-sm text-muted-foreground">{model}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}