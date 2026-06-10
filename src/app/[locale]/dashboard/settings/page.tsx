"use client";

import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const t = useTranslations("dashboard.settings");
  const { data: session } = useSession();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Account Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t("email")}</Label>
            <Input value={session?.user?.email || ""} disabled />
          </div>
          <div className="space-y-2">
            <Label>{t("name")}</Label>
            <Input placeholder="Your name" defaultValue={session?.user?.name || ""} />
          </div>
          <div className="space-y-2">
            <Label>{t("preferredLanguage")}</Label>
            <Input value={session?.user?.preferredLanguage || "en-US"} disabled />
          </div>
          <Button>Update Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}