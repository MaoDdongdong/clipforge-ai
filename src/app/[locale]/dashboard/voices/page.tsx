import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function VoicesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/en-US/auth/login");
  }

  const voices = await db.voice.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Voice Library</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {voices.map((voice) => (
          <Card key={voice.id}>
            <CardHeader>
              <CardTitle className="text-lg">{voice.displayNameEn}</CardTitle>
             <p className="text-sm text-muted-foreground">{voice.displayNameZh}</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{voice.language}</Badge>
                <Badge variant="outline">{voice.gender}</Badge>
                <Badge variant="outline">{voice.style}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Provider: {voice.provider}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}