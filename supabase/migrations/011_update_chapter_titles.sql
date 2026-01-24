-- ============================================
-- 11. Update chapter titles to match GitHub markdown H1 titles
-- ============================================

-- Part 1: Getting Started
UPDATE public.chapters SET title_ko = 'AI 코딩이란?', title_en = 'What is AI Coding?' WHERE id = '01';
UPDATE public.chapters SET title_ko = 'Claude Code 설치하기', title_en = 'Installing Claude Code' WHERE id = '02';
UPDATE public.chapters SET title_ko = '첫 대화 시작하기', title_en = 'Starting Your First Conversation' WHERE id = '03';
UPDATE public.chapters SET title_ko = '파일 읽고 쓰기', title_en = 'Reading and Writing Files' WHERE id = '04';
UPDATE public.chapters SET title_ko = '터미널 명령어', title_en = 'Terminal Commands' WHERE id = '05';

-- Part 2: Core Features
UPDATE public.chapters SET title_ko = '프로젝트 구조 이해', title_en = 'Understanding Project Structure' WHERE id = '06';
UPDATE public.chapters SET title_ko = '컨텍스트와 메모리', title_en = 'Context and Memory' WHERE id = '07';
UPDATE public.chapters SET title_ko = '효과적인 프롬프팅', title_en = 'Effective Prompting' WHERE id = '08';
UPDATE public.chapters SET title_ko = '코드 탐색하기', title_en = 'Exploring Code' WHERE id = '09';
UPDATE public.chapters SET title_ko = '코드 편집하기', title_en = 'Editing Code' WHERE id = '10';
UPDATE public.chapters SET title_ko = 'Git 기초', title_en = 'Git Basics' WHERE id = '11';

-- Part 3: Practical Projects I
UPDATE public.chapters SET title_ko = '프로젝트 메모리', title_en = 'Project Memory' WHERE id = '12';
UPDATE public.chapters SET title_ko = '웹사이트 개발', title_en = 'Website Development' WHERE id = '13';
UPDATE public.chapters SET title_ko = '배포하기', title_en = 'Deployment' WHERE id = '14';
UPDATE public.chapters SET title_ko = '데이터 저장', title_en = 'Data Storage' WHERE id = '15';
UPDATE public.chapters SET title_ko = '미니 게임', title_en = 'Mini Games' WHERE id = '16';

-- Part 4: Practical Projects II
UPDATE public.chapters SET title_ko = 'CLI 도구 만들기', title_en = 'Building CLI Tools' WHERE id = '17';
UPDATE public.chapters SET title_ko = '챗봇 만들기', title_en = 'Building Chatbots' WHERE id = '18';
UPDATE public.chapters SET title_ko = '백엔드 기초', title_en = 'Backend Basics' WHERE id = '19';
UPDATE public.chapters SET title_ko = '풀스택 앱 완성하기', title_en = 'Completing Full-Stack Apps' WHERE id = '20';

-- Part 5: Advanced Usage
UPDATE public.chapters SET title_ko = '아키텍처 이해', title_en = 'Understanding Architecture' WHERE id = '21';
UPDATE public.chapters SET title_ko = '설정 심화', title_en = 'Advanced Configuration' WHERE id = '22';
UPDATE public.chapters SET title_ko = 'Hooks & Commands', title_en = 'Hooks & Commands' WHERE id = '23';
UPDATE public.chapters SET title_ko = 'Agents & Skills', title_en = 'Agents & Skills' WHERE id = '24';
UPDATE public.chapters SET title_ko = 'MCP 연동', title_en = 'MCP Integration' WHERE id = '25';
UPDATE public.chapters SET title_ko = 'CI/CD 자동화', title_en = 'CI/CD Automation' WHERE id = '26';
UPDATE public.chapters SET title_ko = '팀 협업', title_en = 'Team Collaboration' WHERE id = '27';

-- Part 6: Web3 Development
UPDATE public.chapters SET title_ko = 'Web3 기초', title_en = 'Web3 Basics' WHERE id = '28';
UPDATE public.chapters SET title_ko = 'Farcaster Frames', title_en = 'Farcaster Frames' WHERE id = '29';
UPDATE public.chapters SET title_ko = 'Base 스마트 컨트랙트', title_en = 'Base Smart Contracts' WHERE id = '30';

-- ============================================
-- Update XP rewards to match curriculum-data.ts
-- ============================================

-- Part 1: 50 XP each
UPDATE public.chapters SET xp_reward = 50 WHERE id IN ('01', '02', '03', '04', '05');

-- Part 2: 100 XP each
UPDATE public.chapters SET xp_reward = 100 WHERE id IN ('06', '07', '08', '09', '10', '11');

-- Part 3: 150 XP each
UPDATE public.chapters SET xp_reward = 150 WHERE id IN ('12', '13', '14', '15', '16');

-- Part 4: 150 XP each (except chapter 20 which is 200)
UPDATE public.chapters SET xp_reward = 150 WHERE id IN ('17', '18', '19');
UPDATE public.chapters SET xp_reward = 200 WHERE id = '20';

-- Part 5: 200 XP each
UPDATE public.chapters SET xp_reward = 200 WHERE id IN ('21', '22', '23', '24', '25', '26', '27');

-- Part 6: 250 XP each
UPDATE public.chapters SET xp_reward = 250 WHERE id IN ('28', '29', '30');
