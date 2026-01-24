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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const supabase = createClient();

  const validateUsername = (value: string) => {
    if (value.length < 3) {
      return "아이디는 최소 3자 이상이어야 합니다";
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
      return "영문, 숫자, 밑줄(_), 하이픈(-)만 사용 가능합니다";
    }
    return "";
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (value) {
      setUsernameError(validateUsername(value));
    } else {
      setUsernameError("");
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate username
    if (!username.trim()) {
      toast.error("아이디를 입력해주세요");
      return;
    }

    const usernameValidation = validateUsername(username);
    if (usernameValidation) {
      toast.error(usernameValidation);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    // Check if username is already taken
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username.trim())
      .single();

    if (existingUser) {
      toast.error("이미 사용 중인 아이디입니다");
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          username: username.trim(),
          display_name: username.trim(),
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    // If user was created, update the profile with the username
    if (data.user) {
      await supabase
        .from("profiles")
        .update({ username: username.trim(), display_name: username.trim() })
        .eq("id", data.user.id);
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
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-[#0d1117] relative overflow-hidden">
      {/* Subtle glow background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#f0b429]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#79c0ff]/5 rounded-full blur-[120px]" />

      {/* Decorative Kanji */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 text-[12rem] font-serif text-[#f0b429]/[0.03] select-none pointer-events-none hidden lg:block">
        入
      </div>
      <div className="absolute top-1/2 right-10 -translate-y-1/2 text-[12rem] font-serif text-[#f0b429]/[0.03] select-none pointer-events-none hidden lg:block">
        門
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* GitHub Dark Card */}
        <div className="relative bg-[#1c2128] backdrop-blur-sm p-6 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="text-center pb-5">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-1.5 mb-4 group"
            >
              <Icons.vibedojoSymbol className="w-9 h-9 transition-all duration-300" />
              <span className="font-black text-xl text-[#c9d1d9] tracking-tighter group-hover:text-[#f0b429] transition-colors">
                {common("appName")}
              </span>
            </Link>
            <h1 className="text-lg font-bold text-[#c9d1d9] mb-1">{t("signupTitle")}</h1>
            <p className="text-[11px] text-[#8b949e]">
              바이브 도장에 입문하신 것을 환영합니다
            </p>
          </div>

          {/* Content */}
          <div className="space-y-5">
            {/* OAuth Buttons */}
            <div className="space-y-2.5">
              <Button
                variant="outline"
                className="w-full h-10 text-xs rounded-lg bg-[#21262d] border-0 text-[#c9d1d9] hover:bg-[#30363d] hover:text-[#c9d1d9] transition-all duration-300 shadow-[0_2px_6px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                onClick={() => handleOAuthLogin("github")}
                disabled={isLoading}
              >
                <Icons.github className="mr-2 h-4 w-4" />
                {t("continueWithGithub")}
              </Button>
              <Button
                variant="outline"
                className="w-full h-10 text-xs rounded-lg bg-[#21262d] border-0 text-[#c9d1d9] hover:bg-[#30363d] hover:text-[#c9d1d9] transition-all duration-300 shadow-[0_2px_6px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                onClick={() => handleOAuthLogin("google")}
                disabled={isLoading}
              >
                <Icons.google className="mr-2 h-4 w-4" />
                {t("continueWithGoogle")}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-gradient-to-r from-transparent via-[#30363d] to-transparent" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
                <span className="bg-[#161b22] px-3 text-[#8b949e]">
                  {t("orContinueWith")}
                </span>
              </div>
            </div>

            {/* Email Signup Form */}
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-xs text-[#8b949e] uppercase tracking-wider">
                  아이디
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="my_username"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-10 text-xs rounded-lg bg-[#0d1117] border-0 text-[#c9d1d9] placeholder:text-[#484f58] shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)] focus:ring-2 focus:ring-[#f0b429]/30 transition-all"
                />
                {usernameError && (
                  <p className="text-[10px] text-[#f85149]">{usernameError}</p>
                )}
                <p className="text-[10px] text-[#6e7681]">영문, 숫자, 밑줄(_), 하이픈(-) 사용 가능 (최소 3자)</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs text-[#8b949e] uppercase tracking-wider">
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
                  className="h-10 text-xs rounded-lg bg-[#0d1117] border-0 text-[#c9d1d9] placeholder:text-[#484f58] shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)] focus:ring-2 focus:ring-[#f0b429]/30 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs text-[#8b949e] uppercase tracking-wider">
                  {t("password")}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-10 text-xs rounded-lg bg-[#0d1117] border-0 text-[#c9d1d9] placeholder:text-[#484f58] shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)] focus:ring-2 focus:ring-[#f0b429]/30 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-xs text-[#8b949e] uppercase tracking-wider">
                  {t("confirmPassword")}
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-10 text-xs rounded-lg bg-[#0d1117] border-0 text-[#c9d1d9] placeholder:text-[#484f58] shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)] focus:ring-2 focus:ring-[#f0b429]/30 transition-all"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-10 text-xs rounded-lg font-bold uppercase tracking-wider bg-[#f0b429] hover:bg-[#f7c948] text-[#0d1117] border-0 transition-all duration-300 shadow-[0_2px_8px_rgba(240,180,41,0.3)] hover:shadow-[0_4px_16px_rgba(240,180,41,0.4)]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#0d1117]/30 border-t-[#0d1117] rounded-full animate-spin" />
                    {common("loading")}
                  </span>
                ) : (
                  t("signupTitle")
                )}
              </Button>
            </form>

            <p className="text-[10px] text-[#8b949e] text-center">
              {t("termsAgreement")}
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-center text-xs pt-5 mt-5 shadow-[0_-1px_0_rgba(255,255,255,0.05)]">
            <p className="text-[#8b949e]">
              {t("hasAccount")}{" "}
              <Link
                href="/login"
                className="text-[#f0b429] hover:text-[#f7c948] font-medium transition-all"
              >
                {common("login")}
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative bottom element */}
        <div className="h-1 w-full mt-4 bg-gradient-to-r from-[#f0b429]/20 via-[#f0b429]/50 to-[#f0b429]/20 rounded-full" />
      </div>
    </div>
  );
}
