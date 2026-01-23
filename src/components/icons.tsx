import {
  BookOpen,
  Users,
  Trophy,
  Github,
  Flame,
  Target,
  Rocket,
  Code,
  Zap,
  Star,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Check,
  Globe,
  Moon,
  Sun,
  LogOut,
  User,
  Settings,
  Home,
  MessageSquare,
  Award,
  TrendingUp,
  Play,
  Swords,
  Crown,
  Shield,
  Scroll,
  Brain,
  Quote,
  ArrowLeft,
  Sparkles,
  Link,
  Lock,
  type LucideIcon,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  bookOpen: BookOpen,
  book: BookOpen,
  users: Users,
  trophy: Trophy,
  github: Github,
  flame: Flame,
  target: Target,
  rocket: Rocket,
  code: Code,
  zap: Zap,
  star: Star,
  menu: Menu,
  x: X,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  check: Check,
  globe: Globe,
  moon: Moon,
  sun: Sun,
  logOut: LogOut,
  user: User,
  settings: Settings,
  home: Home,
  messageSquare: MessageSquare,
  award: Award,
  trendingUp: TrendingUp,
  play: Play,
  swords: Swords,
  crown: Crown,
  shield: Shield,
  scroll: Scroll,
  brain: Brain,
  quote: Quote,
  arrowLeft: ArrowLeft,
  sparkles: Sparkles,
  link: Link,
  lock: Lock,
  google: ({ ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  ),
  // VibeDojo 로고 심볼 - 심플한 육각형 + 코드 브래킷
  vibedojoSymbol: ({ ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      {/* 외곽 육각형 - amber/orange gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>
      <path
        d="M16 2L28 9V23L16 30L4 23V9L16 2Z"
        fill="url(#logoGradient)"
      />
      {/* 코드 브래킷 < */}
      <path
        d="M12 11L7 16L12 21"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 코드 브래킷 > */}
      <path
        d="M20 11L25 16L20 21"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 중앙 슬래시 */}
      <path
        d="M18 10L14 22"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};
