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
    duration: "Jan 2026 – Present",
    location: "Salt Lake City, UT",
    current: true,
    bullets: [
      "Building specialized AI agents leveraging 100+ MCP Commands & Resources with org-specific context and architecture automating tasks right from Product requirements to Deployment promoting Spec-Driven Development",
      "Created multi-agent orchestration system using MCP integrating with Cursor & Claude Code for automated workflows",
      "Implementing semantic search pipeline using Python and LangChain with vector embeddings to retrieve design system patterns, API specs, and codebase context, powering RAG-augmented code generation across 100+ engineers",
      "Deployed PortKeyAI Gateway on Kubernetes proxying to AWS Bedrock instance enabling Claude Code cost tracking",
      "Engineered OpenTelemetry based service with JWT authentication, proxying OTLP traces/metrics/logs to Grafana",
    ],
    tech: ["Python", "LangChain", "MCP", "RAG", "Kubernetes", "AWS Bedrock", "OpenTelemetry", "Claude Code"],
  },
  {
    company: "MasterControl",
    role: "Software Engineer Co-Op",
    duration: "Jan 2025 – Jul 2025",
    location: "Salt Lake City, UT",
    bullets: [
      "Contributed to Design System creating 50+ MUI Wrappers and Shared React components standardizing UI patterns",
      "Migrated 45+ MUI components to v6.0 with new ESLint and TypeScript rules achieving 100% CI/CD success",
      "Engineered imperative Alert system with Zustand store enabling cross-microfrontend notifications for platform users",
      "Built reusable Query hooks with TanStack Query reducing redundant API calls by 40% for UserPicker component",
      "Created Unit and Integration tests using Vitest and Playwright ensuring 90% coverage for design system components",
    ],
    tech: ["React", "TypeScript", "MUI", "Zustand", "TanStack Query", "Vitest", "Playwright", "ESLint"],
  },
  {
    company: "Mindbody",
    role: "Associate Software Engineer",
    duration: "Jan 2023 – Jun 2023",
    location: "Pune, India",
    bullets: [
      "Developed Android components with Jetpack Compose, transitioning from imperative XML to declarative UI pattern",
      "Redefined Time Clock component to Model-View-ViewModel (MVVM), leading to better code-design in Kotlin",
      "Wrote comprehensive Unit and Integration tests with JUnit and Mockito leading to 88% code coverage of components",
      "Applied Hilt and Dagger for Dependency Injection, reducing boilerplate code by 30% and increasing test coverage by 25%",
    ],
    tech: ["Kotlin", "Jetpack Compose", "MVVM", "JUnit", "Mockito", "Hilt", "Dagger"],
  },
  {
    company: "Mahavir AV Solutions",
    role: "Full Stack Engineer",
    duration: "Aug 2022 – Dec 2022",
    location: "Pune, India",
    bullets: [
      "Led UI development of Product Dashboard from prototyping in Figma to developing in React JS with Material UI",
      "Defined a comprehensive REST API for user management functionality using Java Spring Boot MVC architecture",
      "Implemented data encryption in MongoDB for user authentication, enhancing security and protecting sensitive data",
      "Wrote 50+ E2E integration tests in Cypress and 80+ Unit tests in JUnit for backend achieving 90% code coverage",
    ],
    tech: ["React", "Java", "Spring Boot", "MongoDB", "Figma", "Cypress", "JUnit"],
  },
];

export const PROJECTS: Project[] = [
  {
    name: "Study Buddy",
    description: "Full-stack AI study platform that processes educational videos into interactive flashcards, mind maps and quizzes",
    longDescription:
      "Built a full-stack AI study platform processing educational videos into interactive flashcards, mind maps and quizzes. Leveraged GenAI tools (LangChain, Gemini AI, Google Speech-to-Text) and AI coding assistants (Cursor) to accelerate feature development and content generation. Developed a Flask backend with MongoDB and a Next.js frontend using TypeScript, Tailwind CSS, and Radix UI.",
    tech: ["Next.js", "TypeScript", "Flask", "Python", "LangChain", "Gemini AI", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/aditya191201/StudyBuddy",
    featured: true,
  },
  {
    name: "Doubt-Stack Exchange",
    description: "Full-stack doubt-solving forum with JWT auth, 2FA, rate limiting, and optimized SQL-backed APIs",
    longDescription:
      "Built a full-stack doubt-solving forum with a React.js frontend and Express.js REST APIs powered by a SQL database. Implemented MUI components, JWT authentication, 2-factor authorization, middlewares and rate limiter for security. Optimized performance through server-side caching, SQL query tuning, and pagination for efficient data retrieval.",
    tech: ["React.js", "Express.js", "TypeScript", "SQL", "MUI", "JWT", "Docker"],
    github: "https://github.com/aditya191201/DoubtStackFrontend",
  },
  {
    name: "Image Processing Application",
    description: "Java Swing image manipulation platform with OOP/SOLID principles, MVC pattern, and 100+ TDD tests",
    longDescription:
      "Created an Image Manipulation platform using Java Swing following Object-Oriented Programming & SOLID Principles. Followed best practices using design patterns like MVC and wrote 100+ tests following Test Driven Development. Provided features like image rotation, resizing, grayscale, color-correction, histogram, sepia, color-contrast, and RGB splits.",
    tech: ["Java", "Swing", "MVC", "OOP", "SOLID", "JUnit", "TDD"],
  },
  {
    name: "Screenshot MCP Server",
    description: "MCP server that enables Claude to capture and analyze screenshots — published and installable via uvx",
    longDescription:
      "Built a Model Context Protocol (MCP) server that gives Claude the ability to capture screenshots of your screen directly within a conversation. Screenshots are automatically compressed to JPEG for efficient transfer. Installable without cloning via uvx, and configures directly into Claude Desktop. Built for macOS with Python 3.13+.",
    tech: ["Python", "MCP", "Claude Desktop", "uv", "PyAutoGUI"],
    github: "https://github.com/aditya191201/MCP-Server-Deployment",
  },
  {
    name: "Stripe iOS Integration",
    description: "Full-stack iOS app with Stripe PaymentSheet, SwiftUI interface, and a local Express.js backend",
    longDescription:
      "A complete iOS app demonstrating Stripe PaymentSheet integration with a local Node.js backend. Features customer creation and management, secure payment processing, and a clean SwiftUI interface. Backend powered by Express.js handling Stripe API calls. Runs in test mode and targets iOS 26+.",
    tech: ["Swift", "SwiftUI", "Stripe SDK", "Node.js", "Express.js", "iOS"],
    github: "https://github.com/aditya191201/Stripe_IOS_Integration",
  },
  {
    name: "TCP/UDP Key-Value Store",
    description: "Distributed client-server key-value store supporting both TCP and UDP protocols, containerized with Docker",
    longDescription:
      "Built a single-threaded client-server key-value store in Java supporting both TCP and UDP transport protocols. Implements a clean handler abstraction over both protocols, with structured logging on client and server. Containerized with Docker for easy deployment. Demonstrates core distributed systems and networking concepts.",
    tech: ["Java", "TCP", "UDP", "Docker", "Distributed Systems", "Networking"],
    github: "https://github.com/aditya191201/TCPUDPKeyValueStore",
  },
];

export const SKILLS: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      { name: "Java", icon: "JavaOriginal" },
      { name: "JavaScript", icon: "JavascriptOriginal" },
      { name: "TypeScript", icon: "TypescriptOriginal" },
      { name: "Python", icon: "PythonOriginal" },
      { name: "Swift", icon: "SwiftOriginal" },
      { name: "HTML/CSS", icon: "Html5Original" },
    ],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      { name: "React.js", icon: "ReactOriginal" },
      { name: "Next.js", icon: "NextjsOriginal" },
      { name: "Node.js", icon: "NodejsOriginal" },
      { name: "Express.js", icon: "ExpressOriginal" },
      { name: "Spring Boot", icon: "SpringOriginal" },
      { name: "GraphQL", icon: "GraphqlPlain" },
    ],
  },
  {
    category: "Testing",
    skills: [
      { name: "Vitest", icon: "VitestOriginal" },
      { name: "Playwright", icon: "PlaywrightOriginal" },
      { name: "Cypress", icon: "CypressioOriginal" },
      { name: "Jest", icon: "JestPlain" },
      { name: "JUnit", icon: "JavaOriginal" },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MySQL", icon: "MysqlOriginal" },
      { name: "MongoDB", icon: "MongodbOriginal" },
      { name: "PostgreSQL", icon: "PostgresqlOriginal" },
      { name: "Redis", icon: "RedisOriginal" },
    ],
  },
  {
    category: "AI & DevOps",
    skills: [
      { name: "LangChain", icon: "LangChain" },
      { name: "Claude Code", icon: "ClaudeCode" },
      { name: "Cursor", icon: "Cursor" },
      { name: "Docker", icon: "DockerOriginal" },
      { name: "Kubernetes", icon: "KubernetesPlain" },
      { name: "Git", icon: "GitOriginal" },
    ],
  },
];

export const EDUCATION = [
  {
    school: "Northeastern University",
    degree: "Master of Science in Computer Science",
    duration: "Sep 2023 – Dec 2025",
    location: "Boston, MA",
    gpa: "4.0 / 4.0",
    highlights: ["Khoury College of Computer Sciences"],
  },
  {
    school: "Savitribai Phule Pune University",
    degree: "Bachelor of Technology in Information Technology",
    duration: "Aug 2019 – Jun 2023",
    location: "Pune, MH, India",
    gpa: "9.7 / 10",
    highlights: [],
  },
];

export const SOCIALS = {
  github: "https://github.com/aditya191201",
  linkedin: "https://www.linkedin.com/in/aditya-deshpande-cs19/",
  email: "deshpande.adu01@gmail.com",
  resume: "https://drive.google.com/file/d/1IkG2rjvRwE1pHpaVAyNCVnFx5S2liz5C/view?usp=sharing",
};
