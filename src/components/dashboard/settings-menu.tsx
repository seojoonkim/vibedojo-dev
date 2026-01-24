"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SettingsMenu() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-md text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d] border border-transparent hover:border-[#30363d] transition-all"
        >
          <Icons.settings className="h-5 w-5" />
          <span className="sr-only">설정</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-[#161b22] backdrop-blur-sm border-[#30363d] outline-none rounded-md shadow-lg"
      >
        <DropdownMenuItem asChild>
          <Link
            href="/settings"
            className="flex items-center gap-2 cursor-pointer text-[#c9d1d9] focus:text-[#c9d1d9] focus:bg-[#21262d] focus:outline-none focus-visible:outline-none focus-visible:ring-0 rounded-md"
          >
            <Icons.settings className="h-4 w-4" />
            설정
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[#30363d]" />
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoading}
          className="flex items-center gap-2 cursor-pointer text-[#f85149] focus:text-[#f85149] focus:bg-[#f85149]/10 focus:outline-none focus-visible:outline-none focus-visible:ring-0 rounded-md"
        >
          <Icons.logOut className="h-4 w-4" />
          {isLoading ? "로그아웃 중..." : "로그아웃"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
