"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { PROJECTS, Project } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`group relative p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50 transition-all cursor-default overflow-hidden ${
        featured ? "lg:col-span-3" : ""
      }`}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/0 to-[var(--accent)]/0 group-hover:from-[var(--accent)]/5 group-hover:to-[var(--secondary)]/5 transition-all duration-500 rounded-2xl pointer-events-none" />

      <div className={`relative ${featured ? "lg:flex lg:gap-10 lg:items-start" : ""}`}>
        <div className={`${featured ? "lg:flex-1" : ""}`}>
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="font-display font-bold text-xl text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
              {project.name}
            </h3>
            <div className="flex items-center gap-2 shrink-0">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all"
                  aria-label="Demo"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          <p className="text-[var(--muted)] text-sm leading-relaxed mb-4">
            {featured && project.longDescription ? project.longDescription : project.description}
          </p>
        </div>

        <div className={`${featured ? "lg:shrink-0 lg:w-72" : ""}`}>
          <div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--border)]">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const featured = PROJECTS.find((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-16">
            <span className="text-[var(--accent)] font-mono text-sm font-medium">
              03 / projects
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-[var(--foreground)]">
              What I&apos;ve Built
            </h2>
          </motion.div>

          {/* Featured project */}
          {featured && (
            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              <ProjectCard project={featured} featured />
            </div>
          )}

          {/* Other projects */}
          <div className="grid md:grid-cols-2 gap-6">
            {rest.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
