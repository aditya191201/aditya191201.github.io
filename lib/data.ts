export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  current?: boolean;
  bullets: string[];
  tech: string[];
}

export interface Project {
  name: string;
  description: string;
  longDescription?: string;
  tech: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface SkillGroup {
  category: string;
  skills: { name: string; icon: string }[];
}

export const EXPERIENCE: Experience[] = [
  {
    company: "MasterControl",
    role: "AI Context Software Engineer Co-Op",
    duration: "Jan 2025 – Present",
    location: "Salt Lake City, UT (Remote)",
    current: true,
    bullets: [
      "Built AI agents using MCP (Model Context Protocol) to automate quality management workflows, reducing manual QA overhead by ~40%",
      "Designed and deployed RAG pipelines over internal documentation using vector embeddings and semantic search",
      "Implemented multi-agent orchestration system enabling parallel task execution across MasterControl's platform",
      "Developed context-aware developer tooling that integrates with Claude AI for intelligent code suggestions within the MasterControl ecosystem",
      "Contributed to the architecture of an AI-first developer experience layer on top of existing SaaS infrastructure",
    ],
    tech: ["Python", "TypeScript", "MCP", "RAG", "Claude AI", "Vector DBs", "Next.js"],
  },
  {
    company: "MasterControl",
    role: "Software Engineer Co-Op",
    duration: "May 2024 – Dec 2024",
    location: "Salt Lake City, UT (Remote)",
    bullets: [
      "Developed full-stack features for MasterControl's quality management SaaS platform serving 1000+ enterprise clients",
      "Built RESTful APIs and microservices using .NET and C# with high test coverage",
      "Improved front-end performance by 30% through code splitting and lazy loading optimizations",
      "Collaborated on CI/CD pipeline improvements using GitHub Actions, reducing deployment time by 25%",
      "Participated in agile sprints, code reviews, and architectural discussions",
    ],
    tech: ["C#", ".NET", "React", "TypeScript", "SQL", "Azure", "GitHub Actions"],
  },
  {
    company: "Mindbody",
    role: "Software Engineer Intern",
    duration: "Jun 2023 – Aug 2023",
    location: "San Luis Obispo, CA",
    bullets: [
      "Developed internal tooling that automated data pipeline monitoring, saving 10+ engineering hours per week",
      "Contributed to the migration of legacy services to a modern microservices architecture",
      "Built dashboards for real-time system health monitoring using React and GraphQL",
      "Wrote comprehensive unit and integration tests achieving 90%+ code coverage on new features",
    ],
    tech: ["React", "GraphQL", "Python", "PostgreSQL", "Docker", "Kubernetes"],
  },
  {
    company: "Mahavir AV Solutions",
    role: "Web Development Intern",
    duration: "Jun 2022 – Aug 2022",
    location: "Pune, India",
    bullets: [
      "Designed and developed responsive e-commerce web application increasing online sales by 35%",
      "Built product catalog management system with search and filter capabilities",
      "Optimized website load time by 50% through image compression and caching strategies",
    ],
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
  },
];

export const PROJECTS: Project[] = [
  {
    name: "Study Buddy",
    description: "AI-powered study companion with multi-agent orchestration for personalized learning",
    longDescription:
      "A multi-agent AI study platform that generates personalized quizzes, explains concepts at adaptive difficulty levels, and tracks learning progress. Built with a RAG pipeline over course materials and an orchestration layer that routes between specialized agents for different subjects. Features real-time feedback, spaced repetition scheduling, and voice-mode Q&A.",
    tech: ["Next.js", "Python", "FastAPI", "RAG", "LangChain", "Pinecone", "OpenAI API", "PostgreSQL"],
    github: "https://github.com/adityadeshpande",
    featured: true,
  },
  {
    name: "Doubt-Stack Exchange",
    description: "Developer Q&A platform with AI-assisted answer ranking and semantic search",
    longDescription:
      "A Stack Overflow-inspired platform with an AI layer that semantically searches existing answers before posting a new question, suggests related threads, and ranks answers by contextual relevance using embeddings.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Vector Embeddings", "Redis", "Docker"],
    github: "https://github.com/adityadeshpande",
  },
  {
    name: "Image Processing Application",
    description: "Real-time image manipulation pipeline with GPU-accelerated filters and ML segmentation",
    longDescription:
      "A desktop application for batch image processing with a plugin-based filter system. Features GPU-accelerated operations via WebGL, ML-powered background removal using a segmentation model, and a node-graph UI for composing filter pipelines.",
    tech: ["Python", "OpenCV", "PyTorch", "WebGL", "Electron", "NumPy"],
    github: "https://github.com/adityadeshpande",
  },
];

export const SKILLS: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      { name: "Python", icon: "SiPython" },
      { name: "TypeScript", icon: "SiTypescript" },
      { name: "JavaScript", icon: "SiJavascript" },
      { name: "C#", icon: "SiCsharp" },
      { name: "Java", icon: "SiOpenjdk" },
      { name: "SQL", icon: "SiPostgresql" },
    ],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      { name: "Next.js", icon: "SiNextdotjs" },
      { name: "React", icon: "SiReact" },
      { name: "FastAPI", icon: "SiFastapi" },
      { name: "Node.js", icon: "SiNodedotjs" },
      { name: ".NET", icon: "SiDotnet" },
      { name: "LangChain", icon: "SiLangchain" },
    ],
  },
  {
    category: "AI & ML",
    skills: [
      { name: "RAG Pipelines", icon: "SiOpenai" },
      { name: "MCP", icon: "SiAnthropic" },
      { name: "LangChain", icon: "SiLangchain" },
      { name: "PyTorch", icon: "SiPytorch" },
      { name: "Vector DBs", icon: "SiPinecone" },
      { name: "Claude AI", icon: "SiAnthropic" },
    ],
  },
  {
    category: "Databases & Cloud",
    skills: [
      { name: "PostgreSQL", icon: "SiPostgresql" },
      { name: "MongoDB", icon: "SiMongodb" },
      { name: "Redis", icon: "SiRedis" },
      { name: "Azure", icon: "SiMicrosoftazure" },
      { name: "AWS", icon: "SiAmazonwebservices" },
      { name: "Docker", icon: "SiDocker" },
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Git", icon: "SiGit" },
      { name: "GitHub Actions", icon: "SiGithubactions" },
      { name: "Kubernetes", icon: "SiKubernetes" },
      { name: "Vercel", icon: "SiVercel" },
      { name: "Figma", icon: "SiFigma" },
      { name: "Linux", icon: "SiLinux" },
    ],
  },
];

export const EDUCATION = [
  {
    school: "Northeastern University",
    degree: "Master of Science, Computer Science",
    duration: "Sep 2023 – May 2025",
    location: "Boston, MA",
    gpa: "4.0 / 4.0",
    highlights: ["Khoury College of Computer Sciences", "Focus: AI Systems & Distributed Computing"],
  },
  {
    school: "Savitribai Phule Pune University",
    degree: "Bachelor of Technology, Information Technology",
    duration: "Aug 2019 – May 2023",
    location: "Pune, India",
    gpa: "9.2 / 10.0",
    highlights: ["First Class with Distinction", "Departmental Rank: Top 5%"],
  },
];

export const SOCIALS = {
  github: "https://github.com/adityadeshpande",
  linkedin: "https://linkedin.com/in/adityadeshpande",
  email: "deshpande.adi@northeastern.edu",
};
