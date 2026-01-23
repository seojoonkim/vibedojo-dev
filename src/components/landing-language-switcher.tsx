"use client";

import { useTransition, useEffect, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";

const languages = [
  { code: "ko", label: "한국어", flag: "KR" },
  { code: "en", label: "English", flag: "EN" },
];

export function LandingLanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const [currentLocale, setCurrentLocale] = useState("ko");

  useEffect(() => {
    // Read locale from cookie
    const cookies = document.cookie.split(";");
    const localeCookie = cookies.find((c) => c.trim().startsWith("locale="));
    if (localeCookie) {
      const locale = localeCookie.split("=")[1];
      setCurrentLocale(locale);
    }
  }, []);

  const switchLanguage = (locale: string) => {
    startTransition(() => {
      document.cookie = `locale=${locale};path=/;max-age=31536000`;
      window.location.reload();
    });
  };

  const currentLang = languages.find((l) => l.code === currentLocale) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          disabled={isPending}
          className="h-8 px-2 text-xs text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Icons.globe className="h-4 w-4 mr-1" />
          <span className="sr-only md:not-sr-only">{currentLang.flag}</span>
          <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px] focus:outline-none">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className="cursor-pointer"
          >
            <span className="mr-2 text-xs font-medium text-muted-foreground">{lang.flag}</span>
            {lang.label}
            {lang.code === currentLocale && (
              <Check className="h-4 w-4 ml-auto text-violet-500" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
