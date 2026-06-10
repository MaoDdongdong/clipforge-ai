"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function LanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common");

  const handleLocaleChange = (newLocale: string | null) => {
    if (!newLocale) return;
    // Replace the current locale in the pathname with the new locale
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
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en-US">English</SelectItem>
        <SelectItem value="zh-CN">中文</SelectItem>
      </SelectContent>
    </Select>
  );
}