-- ============================================
-- Update Quiz to Support 5 Options
-- ============================================

-- Step 1: Drop the old constraint on correct_answer
ALTER TABLE public.chapter_quizzes DROP CONSTRAINT IF EXISTS chapter_quizzes_correct_answer_check;

-- Step 2: Add new constraint for 5 options (0-4)
ALTER TABLE public.chapter_quizzes ADD CONSTRAINT chapter_quizzes_correct_answer_check CHECK (correct_answer BETWEEN 0 AND 4);

-- Step 3: Update existing quiz data to have 5 options

-- Chapter 01: AI 코딩이란?
UPDATE public.chapter_quizzes
SET options = '[{"ko": "개발자를 완전히 대체하는 것"}, {"ko": "코드 작성 속도와 품질을 향상시키는 것"}, {"ko": "프로그래밍 언어를 배울 필요를 없애는 것"}, {"ko": "모든 버그를 자동으로 수정하는 것"}, {"ko": "AI가 모든 결정을 대신 내리는 것"}]'
WHERE chapter_id = '01' AND order_index = 1;

UPDATE public.chapter_quizzes
SET options = '[{"ko": "AI가 생성한 코드를 그대로 사용하기"}, {"ko": "생성된 코드를 이해하고 검토하기"}, {"ko": "가능한 많은 코드를 빠르게 생성하기"}, {"ko": "AI 도구 없이는 코딩하지 않기"}, {"ko": "복잡한 코드만 AI에게 맡기기"}]'
WHERE chapter_id = '01' AND order_index = 2;

UPDATE public.chapter_quizzes
SET options = '[{"ko": "반복적인 코드 작성 시간 단축"}, {"ko": "코드 자동 완성 및 제안"}, {"ko": "프로그래밍 기초 학습의 불필요"}, {"ko": "문서화 및 주석 작성 지원"}, {"ko": "에러 메시지 해석 도움"}]'
WHERE chapter_id = '01' AND order_index = 3;

UPDATE public.chapter_quizzes
SET options = '[{"ko": "영어 실력만 있으면 된다"}, {"ko": "코딩 기초 지식과 문제 해결 능력"}, {"ko": "특정 프로그래밍 언어의 완벽한 숙달"}, {"ko": "AI 모델의 내부 작동 원리 이해"}, {"ko": "수학적 알고리즘 전문 지식"}]'
WHERE chapter_id = '01' AND order_index = 4;

UPDATE public.chapter_quizzes
SET options = '[{"ko": "AI가 항상 최적의 솔루션을 제공한다고 믿기"}, {"ko": "보안에 민감한 코드도 AI에게 전부 맡기기"}, {"ko": "생성된 코드의 라이선스와 보안 검토하기"}, {"ko": "AI 제안을 무조건 거부하기"}, {"ko": "한 번에 전체 프로젝트 코드 생성 요청하기"}]'
WHERE chapter_id = '01' AND order_index = 5;

-- Chapter 02: Cursor 설치 및 설정
UPDATE public.chapter_quizzes
SET options = '[{"ko": "Atom"}, {"ko": "VS Code"}, {"ko": "Sublime Text"}, {"ko": "IntelliJ IDEA"}, {"ko": "Notepad++"}]'
WHERE chapter_id = '02' AND order_index = 1;

UPDATE public.chapter_quizzes
SET options = '[{"ko": "Ctrl + K"}, {"ko": "Ctrl + L"}, {"ko": "Ctrl + Shift + P"}, {"ko": "Ctrl + Space"}, {"ko": "Ctrl + Enter"}]'
WHERE chapter_id = '02' AND order_index = 2;

UPDATE public.chapter_quizzes
SET options = '[{"ko": "Chat"}, {"ko": "Composer"}, {"ko": "Edit"}, {"ko": "Generate"}, {"ko": "Refactor"}]'
WHERE chapter_id = '02' AND order_index = 3;

UPDATE public.chapter_quizzes
SET options = '[{"ko": "디자인 선호도 때문"}, {"ko": "작업 특성에 맞는 모델 선택을 위해"}, {"ko": "저장 공간 절약을 위해"}, {"ko": "인터넷 속도 최적화를 위해"}, {"ko": "언어별 전용 모델이 필요해서"}]'
WHERE chapter_id = '02' AND order_index = 4;

UPDATE public.chapter_quizzes
SET options = '[{"ko": "README.md"}, {"ko": ".cursorrules"}, {"ko": "config.json"}, {"ko": ".gitignore"}, {"ko": "package.json"}]'
WHERE chapter_id = '02' AND order_index = 5;

-- Chapter 03: 첫 번째 웹앱 만들기
UPDATE public.chapter_quizzes
SET options = '[{"ko": "npm install next"}, {"ko": "npx create-next-app@latest"}, {"ko": "npm run next"}, {"ko": "npm start next"}, {"ko": "npm init next-app"}]'
WHERE chapter_id = '03' AND order_index = 1;

UPDATE public.chapter_quizzes
SET options = '[{"ko": "별도의 라우터 설정 파일 필요"}, {"ko": "app 또는 pages 폴더 구조 기반 자동 라우팅"}, {"ko": "수동으로 모든 경로 지정 필요"}, {"ko": "라우팅 기능 없음"}, {"ko": "외부 라우팅 라이브러리 필수"}]'
WHERE chapter_id = '03' AND order_index = 2;

UPDATE public.chapter_quizzes
SET options = '[{"ko": "useEffect"}, {"ko": "useState"}, {"ko": "useContext"}, {"ko": "useRef"}, {"ko": "useMemo"}]'
WHERE chapter_id = '03' AND order_index = 3;

UPDATE public.chapter_quizzes
SET options = '[{"ko": "유틸리티 클래스로 빠른 스타일링"}, {"ko": "반응형 디자인 쉽게 구현"}, {"ko": "CSS 파일 없이 스타일링 가능"}, {"ko": "복잡한 애니메이션 자동 생성"}, {"ko": "다크모드 쉽게 구현"}]'
WHERE chapter_id = '03' AND order_index = 4;

UPDATE public.chapter_quizzes
SET options = '[{"ko": "간단하고 모호한 요청"}, {"ko": "구체적인 요구사항과 예시 포함"}, {"ko": "기술 용어 없이 일상 언어로만"}, {"ko": "최대한 긴 문장으로 요청"}, {"ko": "한 번에 모든 기능 요청"}]'
WHERE chapter_id = '03' AND order_index = 5;
