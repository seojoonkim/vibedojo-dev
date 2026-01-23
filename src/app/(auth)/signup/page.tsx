"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/icons";
import { toast } from "sonner";

export default function SignupPage() {
  const t = useTranslations("auth");
  const common = useTranslations("common");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const supabase = createClient();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    toast.success("Check your email for the confirmation link!");
    setIsLoading(false);
  };

  const handleOAuthLogin = async (provider: "github" | "google") => {
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-b from-stone-100 to-stone-200 relative overflow-hidden">
      {/* Subtle warm glow background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-800/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-stone-600/5 rounded-full blur-[120px]" />

      {/* Wood floor texture overlay */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(139,90,43,0.2) 60px, rgba(139,90,43,0.2) 61px)`
      }} />

      {/* Decorative Kanji */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 text-[12rem] font-serif text-stone-400/[0.08] select-none pointer-events-none hidden lg:block">
        入
      </div>
      <div className="absolute top-1/2 right-10 -translate-y-1/2 text-[12rem] font-serif text-stone-400/[0.08] select-none pointer-events-none hidden lg:block">
        門
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Traditional Dojo Card */}
        <div className="relative bg-white/95 backdrop-blur-sm border border-stone-300 p-6 rounded-sm shadow-lg">
          {/* Header */}
          <div className="text-center pb-5">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-1.5 mb-4 group"
            >
              <Icons.vibedojoSymbol className="w-9 h-9 transition-all duration-300" />
              <span className="font-black text-xl text-stone-800 tracking-tighter group-hover:text-stone-600 transition-colors">
                {common("appName")}
              </span>
            </Link>
            <h1 className="text-lg font-bold text-stone-800 mb-1">{t("signupTitle")}</h1>
            <p className="text-[11px] text-stone-500">
              바이브 도장에 입문하신 것을 환영합니다
            </p>
          </div>

          {/* Content */}
          <div className="space-y-5">
            {/* OAuth Buttons */}
            <div className="space-y-2.5">
              <Button
                variant="outline"
                className="w-full h-10 text-xs rounded-sm bg-stone-50 border border-stone-300 text-stone-700 hover:bg-stone-100 hover:border-stone-400 hover:text-stone-800 transition-all duration-300"
                onClick={() => handleOAuthLogin("github")}
                disabled={isLoading}
              >
                <Icons.github className="mr-2 h-4 w-4" />
                {t("continueWithGithub")}
              </Button>
              <Button
                variant="outline"
                className="w-full h-10 text-xs rounded-sm bg-stone-50 border border-stone-300 text-stone-700 hover:bg-stone-100 hover:border-stone-400 hover:text-stone-800 transition-all duration-300"
                onClick={() => handleOAuthLogin("google")}
                disabled={isLoading}
              >
                <Icons.google className="mr-2 h-4 w-4" />
                {t("continueWithGoogle")}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
                <span className="bg-white px-3 text-stone-500">
                  {t("orContinueWith")}
                </span>
              </div>
            </div>

            {/* Email Signup Form */}
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs text-stone-600 uppercase tracking-wider">
                  {t("email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-10 text-xs rounded-sm bg-stone-50 border-stone-300 text-stone-800 placeholder:text-stone-400 focus:border-stone-500 focus:ring-1 focus:ring-stone-400/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs text-stone-600 uppercase tracking-wider">
                  {t("password")}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-10 text-xs rounded-sm bg-stone-50 border-stone-300 text-stone-800 placeholder:text-stone-400 focus:border-stone-500 focus:ring-1 focus:ring-stone-400/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-xs text-stone-600 uppercase tracking-wider">
                  {t("confirmPassword")}
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-10 text-xs rounded-sm bg-stone-50 border-stone-300 text-stone-800 placeholder:text-stone-400 focus:border-stone-500 focus:ring-1 focus:ring-stone-400/50 transition-all"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-10 text-xs rounded-sm font-bold uppercase tracking-wider bg-stone-800 hover:bg-stone-700 text-white border-0 shadow-md transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {common("loading")}
                  </span>
                ) : (
                  t("signupTitle")
                )}
              </Button>
            </form>

            <p className="text-[10px] text-stone-500 text-center">
              {t("termsAgreement")}
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-center text-xs pt-5 mt-5 border-t border-stone-200">
            <p className="text-stone-500">
              {t("hasAccount")}{" "}
              <Link
                href="/login"
                className="text-stone-700 hover:text-stone-900 font-medium transition-all"
              >
                {common("login")}
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative bottom element */}
        <div className="h-1 w-full mt-4 bg-gradient-to-r from-stone-400/30 via-stone-500/50 to-stone-400/30 rounded-full" />
      </div>
    </div>
  );
}
