"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Star } from "lucide-react";
import { EDUCATION } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-16">
            <span className="text-[var(--accent)] font-mono text-sm font-medium">
              01 / about
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-[var(--foreground)]">
              Who I Am
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Bio */}
            <motion.div variants={fadeUp} className="space-y-5">
              <p className="text-[var(--muted)] text-lg leading-relaxed">
                I&apos;m an AI-first software engineer pursuing my{" "}
                <span className="text-[var(--foreground)] font-medium">
                  MS in Computer Science at Northeastern University
                </span>{" "}
                (4.0 GPA), currently working as an{" "}
                <span className="text-[var(--accent)] font-medium">
                  AI Context Software Engineer Co-Op at MasterControl
                </span>
                .
              </p>
              <p className="text-[var(--muted)] text-lg leading-relaxed">
                My work sits at the intersection of{" "}
                <span className="text-[var(--foreground)] font-medium">
                  AI systems engineering and product development
                </span>
                . I specialize in building{" "}
                <span className="text-[var(--foreground)] font-medium">
                  MCP (Model Context Protocol) systems
                </span>
                ,{" "}
                <span className="text-[var(--foreground)] font-medium">RAG pipelines</span>,
                and{" "}
                <span className="text-[var(--foreground)] font-medium">
                  multi-agent orchestration frameworks
                </span>{" "}
                — tools that make AI models genuinely useful in production.
              </p>
              <p className="text-[var(--muted)] text-lg leading-relaxed">
                When I&apos;m not building AI tooling, I&apos;m thinking about developer experience,
                distributed systems, and how to make software that both humans and AI models can
                reason about effectively.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  "AI Agents",
                  "MCP Systems",
                  "RAG Pipelines",
                  "Multi-Agent Orchestration",
                  "Full-Stack",
                  "Developer Tooling",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono rounded-full border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Education cards */}
            <div className="space-y-4">
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={edu.school}
                  variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/40 transition-colors cursor-default glow"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] shrink-0">
                      <GraduationCap size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <h3 className="font-display font-semibold text-[var(--foreground)] text-base leading-tight">
                          {edu.school}
                        </h3>
                        <span className="flex items-center gap-1 text-xs text-[var(--accent)] font-mono font-medium shrink-0">
                          <Star size={10} className="fill-current" />
                          {edu.gpa}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--muted)] mt-0.5">{edu.degree}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-[var(--muted)]">
                        <span className="flex items-center gap-1">
                          <MapPin size={10} />
                          {edu.location}
                        </span>
                        <span>·</span>
                        <span>{edu.duration}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {edu.highlights.map((h) => (
                          <span
                            key={h}
                            className="px-2 py-0.5 text-xs rounded bg-[var(--secondary)]/10 text-[var(--secondary)] font-mono"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
