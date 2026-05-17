"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import Image from "next/image";
import { SOCIALS } from "@/lib/data";

const TITLES = [
  "AI-First Engineer",
  "Software Engineer",
  "MS CS @ Northeastern",
  "MCP & RAG Builder",
];

function TypewriterText() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) {
      setDisplayed(TITLES[0]);
      return;
    }

    const current = TITLES[titleIdx];
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTitleIdx((i) => (i + 1) % TITLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, titleIdx, shouldReduce]);

  return (
    <span className="gradient-text">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}


const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [leetcodeSolved, setLeetcodeSolved] = useState<number | null>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    fetch("https://alfa-leetcode-api.onrender.com/aditya__19/solved")
      .then((r) => r.json())
      .then((data) => setLeetcodeSolved(data.solvedProblem ?? null))
      .catch(() => null);
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Static gradient blobs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[var(--accent)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-[var(--secondary)]/5 rounded-full blur-3xl" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* Left — Text */}
          <motion.div
            variants={shouldReduce ? {} : containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={shouldReduce ? {} : itemVariants}>
              {/* Open to Work badge */}
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-medium rounded-full border border-green-500/30 text-green-400 bg-green-500/10 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Open to opportunities
              </span>
              <p className="text-[var(--muted)] font-mono text-sm tracking-wider mb-2">
                Hi, I&apos;m
              </p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-[var(--foreground)]">
                Aditya Ajay
                <br />
                Deshpande
              </h1>
            </motion.div>

            <motion.div
              variants={shouldReduce ? {} : itemVariants}
              className="text-2xl sm:text-3xl font-display font-semibold h-10"
            >
              <TypewriterText />
            </motion.div>

            <motion.p
              variants={shouldReduce ? {} : itemVariants}
              className="text-[var(--muted)] text-lg leading-relaxed max-w-lg"
            >
              I build{" "}
              <span className="text-[var(--foreground)] font-medium">AI agents</span>,{" "}
              <span className="text-[var(--foreground)] font-medium">MCP systems</span> &{" "}
              <span className="text-[var(--foreground)] font-medium">developer tooling</span>{" "}
              that ships. Currently at{" "}
              <span className="text-[var(--accent)] font-medium">MasterControl</span> as AI
              Context SWE Co-Op.
            </motion.p>

            <motion.div
              variants={shouldReduce ? {} : itemVariants}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={scrollToProjects}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm bg-[var(--accent)] text-[var(--background)] hover:opacity-90 transition-all shadow-lg shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/40"
              >
                View My Work
                <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
              <a
                href={SOCIALS.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
              >
                <FileText size={16} />
                View Resume
              </a>
            </motion.div>

            <motion.div
              variants={shouldReduce ? {} : itemVariants}
              className="flex items-center gap-6 pt-4"
            >
              {[
                { label: "GPA", value: "4.0" },
                { label: "Roles", value: "4+" },
                { label: "Projects", value: "10+" },
                { label: "LeetCode", value: leetcodeSolved !== null ? `${leetcodeSolved}` : "…" },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <div className="font-display text-2xl font-bold gradient-text">{value}</div>
                  <div className="text-xs text-[var(--muted)] mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Photo */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, scale: 0.92 }}
            animate={shouldReduce ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute -inset-3 rounded-full opacity-30 blur-xl"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--accent), var(--secondary), var(--accent))",
                }}
              />
              {/* Spinning gradient border */}
              <div className="relative p-[3px] rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent), var(--secondary), var(--accent))",
                }}
              >
                {/* Photo frame */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden bg-[var(--card)]">
                  <Image
                    src="/profile-picture.png"
                    alt="Aditya Deshpande"
                    fill
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </div>

              {/* Floating badge — Current role */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 -left-6 px-3 py-2 rounded-xl text-xs font-mono font-medium border border-[var(--accent)]/30 bg-[var(--card)] text-[var(--accent)] shadow-lg backdrop-blur-sm whitespace-nowrap"
              >
                🎓 Northeastern · 4.0 GPA
              </motion.div>

              {/* Floating badge — Stack */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-2 -right-6 px-3 py-2 rounded-xl text-xs font-mono font-medium border border-[var(--secondary)]/30 bg-[var(--card)] text-[var(--secondary)] shadow-lg backdrop-blur-sm whitespace-nowrap"
              >
                ⚡ AI · MCP · RAG
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--muted)] cursor-pointer hover:text-[var(--foreground)] transition-colors"
          onClick={scrollToProjects}
        >
          <span className="text-xs font-mono">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
