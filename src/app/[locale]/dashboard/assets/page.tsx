import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";

export default function AssetsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Assets</h1>

      <Card>
        <CardContent className="py-16 text-center">
          <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-medium mb-2">No assets yet</p>
          <p className="text-muted-foreground">
            Your generated video assets will appear here
          </p>
        </CardContent>
      </Card>
    </div>
  );
}