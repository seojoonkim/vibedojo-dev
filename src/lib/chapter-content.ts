// Sample chapter content for VibeDojo
// This can be replaced with actual content from a CMS or GitHub repo later

export const chapterContent: Record<string, string> = {
  "01": `
# 바이브코딩 소개

바이브코딩(Vibecoding)은 AI와 함께 코드를 작성하는 새로운 프로그래밍 패러다임입니다.

## 바이브코딩이란?

바이브코딩은 2025년 Andrej Karpathy가 처음 언급한 개념으로, AI 코드 어시스턴트와 자연어로 소통하면서 코드를 작성하는 방식을 의미합니다.

### 핵심 특징

1. **자연어 중심**: 코드 문법보다 의도를 자연어로 표현
2. **AI 협업**: AI가 코드를 생성하고, 개발자는 검토하고 수정
3. **빠른 프로토타이핑**: 아이디어를 빠르게 코드로 구현
4. **학습 곡선 단축**: 프로그래밍 경험이 없어도 시작 가능

## 왜 바이브코딩인가?

기존 프로그래밍 방식과 비교했을 때:

| 전통적 방식 | 바이브코딩 |
|------------|-----------|
| 문법 암기 필요 | 의도 표현에 집중 |
| 에러 디버깅 어려움 | AI가 에러 해결 도움 |
| 높은 진입 장벽 | 누구나 시작 가능 |
| 반복적인 boilerplate | AI가 자동 생성 |

## 시작하기 전에

바이브코딩을 시작하기 위해 필요한 것들:

- **AI 코드 어시스턴트**: Cursor, GitHub Copilot, Claude 등
- **기본 컴퓨터 지식**: 파일 시스템, 터미널 기초
- **열린 마음**: 새로운 방식에 대한 수용력

다음 챕터에서는 개발 환경을 설정하는 방법을 알아봅니다.
  `,

  "02": `
# 개발 환경 설정

바이브코딩을 위한 최적의 개발 환경을 구축해봅시다.

## 필수 도구 설치

### 1. Cursor 설치

Cursor는 바이브코딩에 최적화된 AI-first 코드 에디터입니다.

\`\`\`bash
# macOS
brew install --cask cursor

# Windows
# https://cursor.sh 에서 다운로드
\`\`\`

### 2. Node.js 설치

JavaScript/TypeScript 개발을 위한 런타임:

\`\`\`bash
# Node.js 설치 확인
node --version

# npm 설치 확인
npm --version
\`\`\`

### 3. Git 설치

버전 관리를 위한 필수 도구:

\`\`\`bash
git --version
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
\`\`\`

## Cursor 설정

### AI 모델 선택

1. Cursor 설정(Cmd/Ctrl + ,) 열기
2. "Models" 탭 선택
3. 다음 모델 중 선택:
   - **Claude 3.5 Sonnet**: 균형 잡힌 성능 (추천)
   - **GPT-4**: 복잡한 로직에 강함
   - **Claude 3 Opus**: 최고 품질 (느림)

### .cursorrules 파일

프로젝트 루트에 \`.cursorrules\` 파일을 만들어 AI 동작을 커스터마이징:

\`\`\`
You are an expert in TypeScript and React.
Always use functional components.
Prefer arrow functions.
Use Korean for comments.
\`\`\`

## 첫 프로젝트 생성

\`\`\`bash
# 새 Next.js 프로젝트 생성
npx create-next-app@latest my-vibe-project

# 프로젝트 폴더로 이동
cd my-vibe-project

# Cursor로 열기
cursor .
\`\`\`

다음 챕터에서는 AI 코드 어시스턴트의 동작 원리를 알아봅니다.
  `,

  "03": `
# AI 코드 어시스턴트 이해하기

AI 어시스턴트가 어떻게 작동하는지 이해하면 더 효과적으로 활용할 수 있습니다.

## LLM의 기본 원리

### 토큰화

AI는 텍스트를 **토큰** 단위로 처리합니다:

\`\`\`
"Hello World" → ["Hello", " World"]
"function add(a, b)" → ["function", " add", "(", "a", ",", " b", ")"]
\`\`\`

### 컨텍스트 윈도우

AI가 한 번에 처리할 수 있는 텍스트 양:

| 모델 | 컨텍스트 크기 |
|------|--------------|
| GPT-4 | 128K tokens |
| Claude 3.5 | 200K tokens |
| Claude 3 Opus | 200K tokens |

## 주요 AI 어시스턴트 비교

### Cursor

- **장점**: AI-first 설계, 빠른 응답, Composer 기능
- **단점**: 유료, 일부 기능 제한

### GitHub Copilot

- **장점**: GitHub 통합, 안정적
- **단점**: 컨텍스트 이해 제한적

### Claude (API)

- **장점**: 긴 컨텍스트, 정확한 이해
- **단점**: API 직접 사용 필요

## 효과적인 사용법

### 1. 명확한 의도 전달

\`\`\`
❌ "버튼 만들어"
✅ "클릭하면 카운트가 1씩 증가하는 버튼 컴포넌트를 만들어.
    현재 카운트를 표시하고, 스타일은 Tailwind CSS 사용"
\`\`\`

### 2. 컨텍스트 제공

\`\`\`
❌ "이 함수 수정해"
✅ "이 함수는 사용자 데이터를 가져오는데,
    에러 처리가 없어서 네트워크 오류 시 크래시가 발생해.
    try-catch로 에러 처리 추가해줘"
\`\`\`

### 3. 단계적 요청

복잡한 작업은 작은 단계로 나눠서 요청하세요.

다음 챕터에서는 첫 바이브코딩 프로젝트를 직접 만들어봅니다!
  `,

  "04": `
# 첫 바이브코딩 프로젝트

실제로 AI와 함께 간단한 프로젝트를 만들어봅시다.

## 프로젝트: Todo 앱

오늘 만들 것:
- Todo 추가/삭제 기능
- 완료 표시 토글
- 로컬 스토리지 저장

## Step 1: 프로젝트 생성

Cursor의 Composer(Cmd+I)를 열고 다음을 입력:

\`\`\`
Next.js 14 프로젝트를 생성하고,
간단한 Todo 앱을 만들어줘.

요구사항:
- App Router 사용
- TypeScript
- Tailwind CSS로 스타일링
- 할 일 추가, 삭제, 완료 토글 기능
- 로컬 스토리지에 저장
\`\`\`

## Step 2: 생성된 코드 검토

AI가 생성한 코드를 검토합니다:

\`\`\`tsx
// app/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  // 로컬 스토리지에서 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  // 변경 시 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, {
      id: Date.now(),
      text: input,
      completed: false
    }]);
    setInput('');
  };

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Todos</h1>
      {/* ... */}
    </main>
  );
}
\`\`\`

## Step 3: 수정 요청

코드에 개선이 필요하면 AI에게 요청:

\`\`\`
할 일 항목에 우선순위(높음/중간/낮음)를 추가하고,
우선순위별로 정렬해서 보여줘
\`\`\`

## 핵심 포인트

1. **구체적으로 요청**: 기능, 기술 스택, 스타일 명시
2. **점진적 개선**: 한 번에 완벽하지 않아도 됨
3. **코드 이해**: 생성된 코드를 읽고 이해하기

다음 챕터에서는 더 효과적인 프롬프트 작성법을 배웁니다.
  `,

  "05": `
# 효과적인 프롬프트 작성법

좋은 프롬프트는 좋은 코드의 시작입니다.

## 프롬프트 구조

### CRISP 프레임워크

- **C**ontext: 상황/배경 설명
- **R**equirements: 구체적 요구사항
- **I**nput/Output: 입출력 예시
- **S**tyle: 코드 스타일/규칙
- **P**riority: 중요도 순서

### 예시

\`\`\`
[Context]
Next.js 14 App Router 프로젝트에서 사용자 인증 기능을 구현 중이야.
현재 Supabase Auth를 사용하고 있어.

[Requirements]
- 로그인 폼 컴포넌트 생성
- 이메일/비밀번호 입력
- 에러 메시지 표시
- 로딩 상태 처리

[Input/Output]
- 입력: 이메일, 비밀번호
- 성공 시: /dashboard로 리다이렉트
- 실패 시: 에러 메시지 표시

[Style]
- TypeScript 사용
- shadcn/ui 컴포넌트
- react-hook-form으로 폼 관리

[Priority]
1. 기본 로그인 기능
2. 에러 처리
3. 로딩 상태
\`\`\`

## 자주 쓰는 프롬프트 패턴

### 1. 버그 수정

\`\`\`
이 코드에서 [증상] 문제가 발생해.
예상 동작: [원하는 동작]
실제 동작: [현재 동작]
에러 메시지: [에러 내용]
\`\`\`

### 2. 리팩토링

\`\`\`
이 코드를 리팩토링해줘.
목표:
- 가독성 향상
- 중복 제거
- [특정 패턴] 적용

현재 코드:
[코드]
\`\`\`

### 3. 새 기능 추가

\`\`\`
기존 [컴포넌트/함수]에 다음 기능을 추가해:
- [기능 1]
- [기능 2]

기존 동작은 유지하면서 추가해.
\`\`\`

## 피해야 할 프롬프트

❌ 너무 모호함: "코드 개선해줘"
❌ 너무 광범위: "전체 앱 만들어줘"
❌ 맥락 부족: "버그 고쳐줘"

다음 Part에서는 실제 웹 애플리케이션 구축을 시작합니다!
  `,
};

export function getChapterContent(chapterId: string): string | null {
  return chapterContent[chapterId] || null;
}
