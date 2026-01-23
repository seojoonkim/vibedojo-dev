-- ============================================
-- Seed Data for VibeDojo
-- ============================================

-- Insert Chapters
INSERT INTO public.chapters (id, part, title_ko, title_en, order_index, xp_reward) VALUES
-- Part 1: Getting Started
('01', 1, '바이브코딩 소개', 'Introduction to Vibecoding', 1, 100),
('02', 1, '개발 환경 설정', 'Setting Up Development Environment', 2, 100),
('03', 1, '첫 번째 Claude 대화', 'First Conversation with Claude', 3, 100),
('04', 1, '터미널 기초', 'Terminal Basics', 4, 100),
('05', 1, '파일 시스템 탐색', 'File System Navigation', 5, 100),

-- Part 2: Core Features
('06', 2, '프로젝트 구조 이해', 'Understanding Project Structure', 6, 100),
('07', 2, '컨텍스트 관리', 'Context Management', 7, 100),
('08', 2, '효과적인 프롬프트 작성', 'Writing Effective Prompts', 8, 100),
('09', 2, '코드 탐색과 검색', 'Code Navigation and Search', 9, 100),
('10', 2, '코드 편집 워크플로우', 'Code Editing Workflows', 10, 100),
('11', 2, 'Git 버전 관리', 'Git Version Control', 11, 100),

-- Part 3: Practical Projects I
('12', 3, '포트폴리오 웹사이트 만들기', 'Building a Portfolio Website', 12, 150),
('13', 3, 'Vercel 배포하기', 'Deploying to Vercel', 13, 150),
('14', 3, 'Supabase 데이터베이스 연동', 'Supabase Database Integration', 14, 150),
('15', 3, '브라우저 게임 만들기', 'Creating Browser Games', 15, 150),
('16', 3, '인터랙티브 앱 개발', 'Interactive App Development', 16, 150),

-- Part 4: Practical Projects II
('17', 4, 'CLI 도구 만들기', 'Building CLI Tools', 17, 150),
('18', 4, 'Discord/Slack 봇 개발', 'Discord/Slack Bot Development', 18, 150),
('19', 4, 'REST API 설계', 'REST API Design', 19, 150),
('20', 4, '풀스택 앱과 인증', 'Full-Stack App with Authentication', 20, 200),

-- Part 5: Advanced Usage
('21', 5, '시스템 아키텍처 이해', 'Understanding System Architecture', 21, 200),
('22', 5, '고급 설정 관리', 'Advanced Configuration Management', 22, 200),
('23', 5, '자동화 훅과 커스텀 명령', 'Automation Hooks and Custom Commands', 23, 200),
('24', 5, '특화된 AI 에이전트', 'Specialized AI Agents', 24, 200),
('25', 5, '스킬과 확장 기능', 'Skills and Extensions', 25, 200),
('26', 5, 'CI/CD 파이프라인', 'CI/CD Pipeline Implementation', 26, 200),
('27', 5, '팀 협업 워크플로우', 'Team Collaboration Workflows', 27, 200),

-- Part 6: Web3 Development
('28', 6, '지갑 연동과 토큰/NFT', 'Wallet Integration and Token/NFT', 28, 250),
('29', 6, 'Farcaster Frames 개발', 'Farcaster Frames Development', 29, 250),
('30', 6, 'Base 스마트 컨트랙트', 'Smart Contracts on Base', 30, 250);

-- Insert Badges
INSERT INTO public.badges (id, name_ko, name_en, description_ko, description_en, icon, category, criteria) VALUES
('first-chapter', '첫 발걸음', 'First Step', '첫 챕터를 완료했습니다', 'Completed your first chapter', '📖', 'learning', '{"chapters_completed": 1}'),
('part-1-complete', 'Part 1 마스터', 'Part 1 Master', 'Part 1을 완료했습니다', 'Completed Part 1', '🎯', 'learning', '{"part_completed": 1}'),
('part-2-complete', 'Part 2 마스터', 'Part 2 Master', 'Part 2을 완료했습니다', 'Completed Part 2', '🎯', 'learning', '{"part_completed": 2}'),
('part-3-complete', 'Part 3 마스터', 'Part 3 Master', 'Part 3을 완료했습니다', 'Completed Part 3', '🎯', 'learning', '{"part_completed": 3}'),
('part-4-complete', 'Part 4 마스터', 'Part 4 Master', 'Part 4을 완료했습니다', 'Completed Part 4', '🎯', 'learning', '{"part_completed": 4}'),
('part-5-complete', 'Part 5 마스터', 'Part 5 Master', 'Part 5을 완료했습니다', 'Completed Part 5', '🎯', 'learning', '{"part_completed": 5}'),
('full-curriculum', '풀 커리큘럼', 'Full Curriculum', '전체 30챕터를 완료했습니다', 'Completed all 30 chapters', '🏆', 'learning', '{"chapters_completed": 30}'),
('first-post', '첫 글', 'First Post', '첫 게시글을 작성했습니다', 'Wrote your first post', '✍️', 'community', '{"posts_created": 1}'),
('helper-10', '도우미', 'Helper', '10개의 답변을 작성했습니다', 'Wrote 10 answers', '💡', 'community', '{"comments_created": 10}'),
('accepted-5', '해결사', 'Problem Solver', '5개의 답변이 채택되었습니다', 'Had 5 answers accepted', '⭐', 'community', '{"answers_accepted": 5}'),
('streak-7', '7일 연속', '7 Day Streak', '7일 연속 학습했습니다', 'Studied for 7 consecutive days', '🔥', 'streak', '{"streak_days": 7}'),
('streak-30', '30일 연속', '30 Day Streak', '30일 연속 학습했습니다', 'Studied for 30 consecutive days', '💎', 'streak', '{"streak_days": 30}'),
('showcase-first', '첫 배포', 'First Deploy', '첫 프로젝트를 공유했습니다', 'Shared your first project', '🚀', 'community', '{"showcases_created": 1}'),
('web3-pioneer', 'Web3 파이오니어', 'Web3 Pioneer', 'Part 6을 완료했습니다', 'Completed Part 6', '🔗', 'learning', '{"part_completed": 6}');
