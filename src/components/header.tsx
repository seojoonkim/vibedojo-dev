"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isLoggedIn?: boolean;
}

export function Header({ isLoggedIn = false }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const navItems = [
    { href: "/curriculum", label: "수련 과정", labelShort: "수련" },
    { href: "/community", label: "광장", labelShort: "광장" },
    { href: "/leaderboard", label: "명예의 전당", labelShort: "전당" },
  ];

  const logoHref = isLoggedIn ? "/dashboard" : "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-300 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo - left */}
        <Link href={logoHref} className="flex items-center gap-1.5 group">
          <Icons.vibedojoSymbol className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-105" />
          <span className="text-base sm:text-lg text-stone-800 tracking-tighter font-black group-hover:text-stone-600 transition-colors">
            VibeDojo
          </span>
        </Link>

        {/* Navigation - center (desktop) */}
        <nav className="hidden md:flex items-center justify-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center px-3 lg:px-4 py-1.5 text-sm lg:text-[15px] font-medium transition-all outline-none focus:outline-none focus-visible:outline-none rounded-sm",
                  isActive
                    ? "text-stone-800 bg-stone-100"
                    : "text-stone-600 hover:text-stone-800 hover:bg-stone-50"
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-16px)] h-[2px] bg-stone-700" />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher />
          {isLoggedIn ? (
            <div className="flex items-center gap-1 sm:gap-1.5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-sm h-8 w-8 sm:h-9 sm:w-9 text-stone-500 hover:text-stone-700 hover:bg-stone-100 border border-transparent hover:border-stone-300 transition-all"
                  >
                    <Icons.settings className="h-4 w-4" />
                    <span className="sr-only">설정</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-white backdrop-blur-sm border-stone-300 outline-none rounded-sm shadow-lg"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 cursor-pointer text-stone-700 focus:text-stone-800 focus:bg-stone-100 focus:outline-none focus-visible:outline-none focus-visible:ring-0 rounded-sm"
                    >
                      <Icons.settings className="h-4 w-4" />
                      설정
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-stone-200" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 focus:outline-none focus-visible:outline-none focus-visible:ring-0 rounded-sm"
                  >
                    <Icons.logOut className="h-4 w-4" />
                    {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                asChild
                size="sm"
                className="rounded-sm h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm font-semibold bg-stone-800 hover:bg-stone-700 text-white shadow-md transition-all border-0"
              >
                <Link href="/dashboard">
                  내 도장
                </Link>
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-sm h-8 px-4 text-xs font-medium border-stone-300 text-stone-600 hover:text-stone-800 hover:bg-stone-50 hover:border-stone-400 bg-transparent transition-all"
              >
                <Link href="/login">로그인</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="rounded-sm h-8 px-4 text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-white shadow-md transition-all border-0"
              >
                <Link href="/signup">입문하기</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-sm h-8 w-8 sm:h-9 sm:w-9 text-stone-500 hover:text-stone-700 hover:bg-stone-100 border border-transparent hover:border-stone-300 transition-all"
              >
                <Icons.menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] p-0 bg-white backdrop-blur-sm border-l border-stone-300 rounded-none"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-stone-200">
                  <Link
                    href={logoHref}
                    className="flex items-center gap-1.5 group"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icons.vibedojoSymbol className="w-8 h-8 transition-transform duration-300 group-hover:scale-105" />
                    <span className="text-lg text-stone-800 tracking-tighter font-black group-hover:text-stone-600 transition-colors">
                      VibeDojo
                    </span>
                  </Link>
                </div>
                <nav className="flex-1 p-3 space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "relative flex items-center px-4 py-3 text-base font-medium transition-all rounded-sm",
                          isActive
                            ? "text-stone-800 bg-stone-100 border border-stone-200"
                            : "text-stone-600 hover:text-stone-800 hover:bg-stone-50 border border-transparent hover:border-stone-200"
                        )}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-stone-700 rounded-r-full" />
                        )}
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
                {!isLoggedIn && (
                  <div className="p-4 border-t border-stone-200 space-y-2">
                    <Button
                      asChild
                      variant="outline"
                      size="default"
                      className="w-full rounded-sm h-10 text-sm border-stone-300 text-stone-600 hover:text-stone-800 hover:bg-stone-50 hover:border-stone-400 bg-transparent transition-all"
                    >
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        로그인
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="default"
                      className="w-full rounded-sm h-10 text-sm font-semibold bg-stone-800 hover:bg-stone-700 text-white shadow-md border-0"
                    >
                      <Link href="/signup" onClick={() => setIsOpen(false)}>
                        입문하기
                      </Link>
                    </Button>
                  </div>
                )}
                {isLoggedIn && (
                  <div className="p-4 border-t border-stone-200 space-y-2">
                    <Button
                      asChild
                      size="default"
                      className="w-full rounded-sm h-10 text-sm font-semibold bg-stone-800 hover:bg-stone-700 text-white shadow-md border-0"
                    >
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        내 도장
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="default"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      disabled={isLoggingOut}
                      className="w-full rounded-sm h-10 text-sm border-red-300 text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-400 bg-transparent transition-all"
                    >
                      {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
