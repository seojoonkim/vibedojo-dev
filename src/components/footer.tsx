import Link from "next/link";
import { Icons } from "@/components/icons";

export function Footer() {
  return (
    <footer className="py-5 sm:py-6 px-4 bg-gradient-to-r from-slate-950 to-slate-900 border-t border-slate-700/50">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <Icons.vibedojoSymbol className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="font-semibold text-xs sm:text-sm text-gray-200">
            VibeDojo
          </span>
        </div>
        <div className="flex flex-col items-center gap-0.5 sm:gap-1 order-last sm:order-none">
          <p className="text-xs sm:text-sm text-gray-500">
            © 2025 VibeDojo. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-gray-400">
            Powered by{" "}
            <Link
              href="https://www.hashed.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400/80 hover:text-violet-400 transition-colors font-medium"
            >
              #Hashed
            </Link>
          </p>
        </div>
        <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Icons.github className="h-4 w-4" />
        </Link>
      </div>
    </footer>
  );
}
