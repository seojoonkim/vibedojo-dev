-- Add content_url column to chapters
ALTER TABLE public.chapters ADD COLUMN IF NOT EXISTS content_url TEXT;
ALTER TABLE public.chapters ADD COLUMN IF NOT EXISTS content_url_ko TEXT;

-- Update chapters with VibecodingCurriculum GitHub raw URLs
-- Part 1: Basics
UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter01-AI-Coding-Intro/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter01-AI-Coding-Intro/README.ko.md'
WHERE id = '01';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter02-Installation/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter02-Installation/README.ko.md'
WHERE id = '02';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter03-First-Conversation/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter03-First-Conversation/README.ko.md'
WHERE id = '03';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter04-Working-with-Files/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter04-Working-with-Files/README.ko.md'
WHERE id = '04';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter05-Terminal-Commands/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter05-Terminal-Commands/README.ko.md'
WHERE id = '05';

-- Part 2: Core Skills
UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter06-Project-Structure/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter06-Project-Structure/README.ko.md'
WHERE id = '06';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter07-Context-and-Memory/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter07-Context-and-Memory/README.ko.md'
WHERE id = '07';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter08-Effective-Prompting/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter08-Effective-Prompting/README.ko.md'
WHERE id = '08';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter09-Exploring-Code/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter09-Exploring-Code/README.ko.md'
WHERE id = '09';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter10-Editing-Code/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter10-Editing-Code/README.ko.md'
WHERE id = '10';

-- Part 3: Version Control & Project Memory
UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter11-Git-Basics/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter11-Git-Basics/README.ko.md'
WHERE id = '11';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter12-Project-Memory/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter12-Project-Memory/README.ko.md'
WHERE id = '12';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter13-Website-Development/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter13-Website-Development/README.ko.md'
WHERE id = '13';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter14-Deployment/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter14-Deployment/README.ko.md'
WHERE id = '14';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter15-Data-Storage/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter15-Data-Storage/README.ko.md'
WHERE id = '15';

-- Part 4: Building Projects
UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter16-Mini-Games/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter16-Mini-Games/README.ko.md'
WHERE id = '16';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter17-CLI-Tools/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter17-CLI-Tools/README.ko.md'
WHERE id = '17';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter18-Chatbots/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter18-Chatbots/README.ko.md'
WHERE id = '18';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter19-Backend-Basics/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter19-Backend-Basics/README.ko.md'
WHERE id = '19';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter20-Full-Stack-Apps/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter20-Full-Stack-Apps/README.ko.md'
WHERE id = '20';

-- Part 5: Advanced Claude Code
UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter21-Architecture/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter21-Architecture/README.ko.md'
WHERE id = '21';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter22-Advanced-Config/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter22-Advanced-Config/README.ko.md'
WHERE id = '22';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter23-Hooks-and-Commands/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter23-Hooks-and-Commands/README.ko.md'
WHERE id = '23';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter24-Agents-and-Skills/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter24-Agents-and-Skills/README.ko.md'
WHERE id = '24';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter25-MCP-Integration/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter25-MCP-Integration/README.ko.md'
WHERE id = '25';

-- Part 6: Professional & Web3
UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter26-CI-CD-Automation/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter26-CI-CD-Automation/README.ko.md'
WHERE id = '26';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter27-Team-Collaboration/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter27-Team-Collaboration/README.ko.md'
WHERE id = '27';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter28-Web3-Basics/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter28-Web3-Basics/README.ko.md'
WHERE id = '28';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter29-Farcaster-Frames/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter29-Farcaster-Frames/README.ko.md'
WHERE id = '29';

UPDATE public.chapters SET
  content_url = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter30-Base-Smart-Contracts/README.md',
  content_url_ko = 'https://raw.githubusercontent.com/vibedojo-by-hashed/VibecodingCurriculum/main/Chapter30-Base-Smart-Contracts/README.ko.md'
WHERE id = '30';
