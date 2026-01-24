-- ============================================
-- Seed Data for VibeDojo
-- ============================================

-- Insert Chapters
INSERT INTO public.chapters (id, part, title_ko, title_en, order_index, xp_reward) VALUES
-- Part 1: Getting Started
('01', 1, 'AI 코딩이란?', 'What is AI Coding?', 1, 50),
('02', 1, 'Claude Code 설치하기', 'Installing Claude Code', 2, 50),
('03', 1, '첫 대화 시작하기', 'Starting Your First Conversation', 3, 50),
('04', 1, '파일 읽고 쓰기', 'Reading and Writing Files', 4, 50),
('05', 1, '터미널 명령어', 'Terminal Commands', 5, 50),

-- Part 2: Core Features
('06', 2, '프로젝트 구조 이해', 'Understanding Project Structure', 6, 100),
('07', 2, '컨텍스트와 메모리', 'Context and Memory', 7, 100),
('08', 2, '효과적인 프롬프팅', 'Effective Prompting', 8, 100),
('09', 2, '코드 탐색하기', 'Exploring Code', 9, 100),
('10', 2, '코드 편집하기', 'Editing Code', 10, 100),
('11', 2, 'Git 기초', 'Git Basics', 11, 100),

-- Part 3: Practical Projects I
('12', 3, '프로젝트 메모리', 'Project Memory', 12, 150),
('13', 3, '웹사이트 개발', 'Website Development', 13, 150),
('14', 3, '배포하기', 'Deployment', 14, 150),
('15', 3, '데이터 저장', 'Data Storage', 15, 150),
('16', 3, '미니 게임', 'Mini Games', 16, 150),

-- Part 4: Practical Projects II
('17', 4, 'CLI 도구 만들기', 'Building CLI Tools', 17, 150),
('18', 4, '챗봇 만들기', 'Building Chatbots', 18, 150),
('19', 4, '백엔드 기초', 'Backend Basics', 19, 150),
('20', 4, '풀스택 앱 완성하기', 'Completing Full-Stack Apps', 20, 200),

-- Part 5: Advanced Usage
('21', 5, '아키텍처 이해', 'Understanding Architecture', 21, 200),
('22', 5, '설정 심화', 'Advanced Configuration', 22, 200),
('23', 5, 'Hooks & Commands', 'Hooks & Commands', 23, 200),
('24', 5, 'Agents & Skills', 'Agents & Skills', 24, 200),
('25', 5, 'MCP 연동', 'MCP Integration', 25, 200),
('26', 5, 'CI/CD 자동화', 'CI/CD Automation', 26, 200),
('27', 5, '팀 협업', 'Team Collaboration', 27, 200),

-- Part 6: Web3 Development
('28', 6, 'Web3 기초', 'Web3 Basics', 28, 250),
('29', 6, 'Farcaster Frames', 'Farcaster Frames', 29, 250),
('30', 6, 'Base 스마트 컨트랙트', 'Base Smart Contracts', 30, 250);

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
