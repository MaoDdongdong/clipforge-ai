"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function LanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLocaleChange = (newLocale: string | null) => {
    if (!newLocale) return;
    const segments = pathname.split("/");
    if (segments[1] === "en-US" || segments[1] === "zh-CN") {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join("/"));
  };

  return (
    <Select
      defaultValue="en-US"
      onValueChange={handleLocaleChange}
    >
      <SelectTrigger className="w-[120px] bg-secondary border-border">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border">
        <SelectItem value="en-US">English</SelectItem>
        <SelectItem value="zh-CN">中文</SelectItem>
      </SelectContent>
    </Select>
  );
}
