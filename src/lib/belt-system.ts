// VibeDojo Belt Ranking System
// Traditional martial arts belt progression with XP requirements

export interface Belt {
  id: string;
  name: string;
  nameKo: string;
  rank: string; // Roman numeral (I, II, III, etc.)
  color: string;
  bgColor: string;
  borderColor: string;
  minXp: number;
  maxXp: number;
  level: number;
  description: string;
}

export const BELTS: Belt[] = [
  {
    id: "white",
    name: "White Belt",
    nameKo: "흰띠",
    rank: "I",
    color: "#f5f5f5",
    bgColor: "bg-gray-200",
    borderColor: "border-gray-300",
    minXp: 0,
    maxXp: 199,
    level: 1,
    description: "바이브코딩의 첫 발걸음",
  },
  {
    id: "yellow",
    name: "Yellow Belt",
    nameKo: "노란띠",
    rank: "II",
    color: "#fde68a",
    bgColor: "bg-yellow-200",
    borderColor: "border-yellow-300",
    minXp: 200,
    maxXp: 499,
    level: 2,
    description: "기초를 깨우친 수련생",
  },
  {
    id: "orange",
    name: "Orange Belt",
    nameKo: "주황띠",
    rank: "III",
    color: "#fed7aa",
    bgColor: "bg-orange-200",
    borderColor: "border-orange-300",
    minXp: 500,
    maxXp: 999,
    level: 3,
    description: "실전에 눈을 뜬 전사",
  },
  {
    id: "green",
    name: "Green Belt",
    nameKo: "초록띠",
    rank: "IV",
    color: "#bbf7d0",
    bgColor: "bg-green-200",
    borderColor: "border-green-300",
    minXp: 1000,
    maxXp: 1999,
    level: 4,
    description: "성장하는 바이브 코더",
  },
  {
    id: "blue",
    name: "Blue Belt",
    nameKo: "파란띠",
    rank: "V",
    color: "#bfdbfe",
    bgColor: "bg-blue-200",
    borderColor: "border-blue-300",
    minXp: 2000,
    maxXp: 3499,
    level: 5,
    description: "숙련된 프롬프트 마스터",
  },
  {
    id: "purple",
    name: "Purple Belt",
    nameKo: "보라띠",
    rank: "VI",
    color: "#e9d5ff",
    bgColor: "bg-purple-200",
    borderColor: "border-purple-300",
    minXp: 3500,
    maxXp: 5499,
    level: 6,
    description: "AI와 하나가 된 경지",
  },
  {
    id: "brown",
    name: "Brown Belt",
    nameKo: "갈색띠",
    rank: "VII",
    color: "#d6b99a",
    bgColor: "bg-amber-300",
    borderColor: "border-amber-400",
    minXp: 5500,
    maxXp: 7999,
    level: 7,
    description: "마스터에 근접한 고수",
  },
  {
    id: "red",
    name: "Red Belt",
    nameKo: "빨간띠",
    rank: "VIII",
    color: "#fecaca",
    bgColor: "bg-red-200",
    borderColor: "border-red-300",
    minXp: 8000,
    maxXp: 11999,
    level: 8,
    description: "전설의 바이브 전사",
  },
  {
    id: "black",
    name: "Black Belt",
    nameKo: "검은띠",
    rank: "IX",
    color: "#374151",
    bgColor: "bg-gray-700",
    borderColor: "border-gray-600",
    minXp: 12000,
    maxXp: Infinity,
    level: 9,
    description: "바이브코딩의 그랜드마스터",
  },
];

export function getBeltByXp(xp: number): Belt {
  return BELTS.find((belt) => xp >= belt.minXp && xp <= belt.maxXp) || BELTS[0];
}

export function getBeltById(id: string): Belt | undefined {
  return BELTS.find((belt) => belt.id === id);
}

export function getNextBelt(currentBelt: Belt): Belt | null {
  const currentIndex = BELTS.findIndex((b) => b.id === currentBelt.id);
  if (currentIndex < BELTS.length - 1) {
    return BELTS[currentIndex + 1];
  }
  return null;
}

export function getXpToNextBelt(xp: number): number {
  const currentBelt = getBeltByXp(xp);
  const nextBelt = getNextBelt(currentBelt);
  if (nextBelt) {
    return nextBelt.minXp - xp;
  }
  return 0;
}

export function getBeltProgress(xp: number): number {
  const currentBelt = getBeltByXp(xp);
  const nextBelt = getNextBelt(currentBelt);
  if (!nextBelt) return 100;

  const xpInCurrentBelt = xp - currentBelt.minXp;
  const xpNeededForNextBelt = nextBelt.minXp - currentBelt.minXp;
  return Math.min(100, Math.round((xpInCurrentBelt / xpNeededForNextBelt) * 100));
}
