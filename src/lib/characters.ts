// VibeDojo Character System
// 32 martial arts animal characters

export interface Character {
  id: string;
  name: string;
  nameKo: string;
  description: string;
  image: number; // 1-4 for image sheet, position
  row: number;
  col: number;
}

// Characters organized by image sheets
export const CHARACTERS: Character[] = [
  // Sheet 1 (characters-1.png) - Row 1
  { id: "koala", name: "Koala", nameKo: "코알라", description: "차분한 수련생", image: 1, row: 0, col: 0 },
  { id: "owl", name: "Owl", nameKo: "부엉이", description: "지혜로운 현자", image: 1, row: 0, col: 1 },
  { id: "otter", name: "Otter", nameKo: "수달", description: "재치있는 닌자", image: 1, row: 0, col: 2 },
  { id: "hedgehog", name: "Hedgehog", nameKo: "고슴도치", description: "꼼꼼한 전사", image: 1, row: 0, col: 3 },
  // Sheet 1 - Row 2
  { id: "elephant", name: "Elephant", nameKo: "코끼리", description: "묵직한 장군", image: 1, row: 1, col: 0 },
  { id: "monkey", name: "Monkey", nameKo: "원숭이", description: "민첩한 수련생", image: 1, row: 1, col: 1 },
  { id: "lion", name: "Lion", nameKo: "사자", description: "용맹한 왕", image: 1, row: 1, col: 2 },
  { id: "wolf-cyber", name: "Cyber Wolf", nameKo: "사이버 늑대", description: "미래의 전사", image: 1, row: 1, col: 3 },

  // Sheet 2 (characters-2.png) - Row 1
  { id: "panda", name: "Panda", nameKo: "판다", description: "태평한 도장 주인", image: 2, row: 0, col: 0 },
  { id: "fox", name: "Fox", nameKo: "여우", description: "영리한 책사", image: 2, row: 0, col: 1 },
  { id: "cat", name: "Cat", nameKo: "고양이", description: "우아한 검객", image: 2, row: 0, col: 2 },
  { id: "squirrel", name: "Squirrel", nameKo: "다람쥐", description: "부지런한 수집가", image: 2, row: 0, col: 3 },
  // Sheet 2 - Row 2
  { id: "rabbit-cyber", name: "Cyber Rabbit", nameKo: "사이버 토끼", description: "빠른 해커", image: 2, row: 1, col: 0 },
  { id: "raccoon", name: "Raccoon", nameKo: "너구리", description: "장난꾸러기 도둑", image: 2, row: 1, col: 1 },
  { id: "bear", name: "Bear", nameKo: "곰", description: "든든한 수호자", image: 2, row: 1, col: 2 },
  { id: "shiba", name: "Shiba", nameKo: "시바견", description: "충직한 동료", image: 2, row: 1, col: 3 },

  // Sheet 3 (characters-3.png) - Row 1
  { id: "penguin", name: "Penguin", nameKo: "펭귄", description: "시원한 분석가", image: 3, row: 0, col: 0 },
  { id: "giraffe", name: "Giraffe", nameKo: "기린", description: "높은 시야의 관찰자", image: 3, row: 0, col: 1 },
  { id: "rhino", name: "Rhino", nameKo: "코뿔소", description: "돌파력의 달인", image: 3, row: 0, col: 2 },
  { id: "platypus", name: "Platypus", nameKo: "오리너구리", description: "독특한 발명가", image: 3, row: 0, col: 3 },
  // Sheet 3 - Row 2
  { id: "beaver", name: "Beaver", nameKo: "비버", description: "건축의 대가", image: 3, row: 1, col: 0 },
  { id: "cheetah", name: "Cheetah", nameKo: "치타", description: "최속의 러너", image: 3, row: 1, col: 1 },
  { id: "penguin-cyber", name: "Cyber Penguin", nameKo: "사이버 펭귄", description: "냉철한 AI", image: 3, row: 1, col: 2 },
  { id: "rhino-cyber", name: "Cyber Rhino", nameKo: "사이버 코뿔소", description: "강철의 방패", image: 3, row: 1, col: 3 },

  // Sheet 4 (characters-4.png) - Row 1
  { id: "deer", name: "Deer", nameKo: "사슴", description: "평화의 사절", image: 4, row: 0, col: 0 },
  { id: "crocodile", name: "Crocodile", nameKo: "악어", description: "기다림의 마스터", image: 4, row: 0, col: 1 },
  { id: "horse", name: "Horse", nameKo: "말", description: "성실한 달리기꾼", image: 4, row: 0, col: 2 },
  { id: "sheep", name: "Sheep", nameKo: "양", description: "포근한 치유사", image: 4, row: 0, col: 3 },
  // Sheet 4 - Row 2
  { id: "kangaroo", name: "Kangaroo", nameKo: "캥거루", description: "점프의 명수", image: 4, row: 1, col: 0 },
  { id: "sloth", name: "Sloth", nameKo: "나무늘보", description: "느긋한 현자", image: 4, row: 1, col: 1 },
  { id: "dolphin", name: "Dolphin", nameKo: "돌고래", description: "영민한 소통가", image: 4, row: 1, col: 2 },
  { id: "croc-cyber", name: "Cyber Croc", nameKo: "사이버 악어", description: "데이터의 포식자", image: 4, row: 1, col: 3 },
];

export function getCharacterById(id: string): Character | undefined {
  return CHARACTERS.find((c) => c.id === id);
}

export function getCharactersBySheet(sheetNumber: number): Character[] {
  return CHARACTERS.filter((c) => c.image === sheetNumber);
}
