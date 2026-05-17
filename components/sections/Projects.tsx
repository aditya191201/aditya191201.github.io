"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X } from "lucide-react";
import { PROJECTS, Project } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full max-w-lg bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 pb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-xl text-[var(--foreground)] mb-1">
              {project.name}
            </h3>
            {project.featured && (
              <span className="inline-block px-2 py-0.5 text-xs font-mono rounded-md bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                Featured
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/50 transition-all shrink-0"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 space-y-5">
          <p className="text-[var(--muted)] text-sm leading-relaxed">
            {project.longDescription ?? project.description}
          </p>

          {/* Tech stack */}
          <div>
            <p className="text-xs font-mono text-[var(--muted)] uppercase tracking-wider mb-2">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
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

          {/* Links */}
          {(project.github || project.demo) && (
            <div className="flex items-center gap-3 pt-1">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-all"
                >
                  <Github size={14} />
                  View Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[var(--accent)] text-[var(--background)] hover:opacity-90 transition-all"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="group relative p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50 transition-all cursor-pointer overflow-hidden"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/0 to-[var(--accent)]/0 group-hover:from-[var(--accent)]/5 group-hover:to-[var(--secondary)]/5 transition-all duration-500 rounded-2xl pointer-events-none" />

      <div className="relative">
        <div>
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
            {project.description}
          </p>
        </div>

        <div>
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

      {/* "Click to read more" hint */}
      {project.longDescription && (
        <div className="absolute bottom-3 right-4 text-[10px] font-mono text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity">
          click for details →
        </div>
      )}
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<Project | null>(null);

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

          {/* All projects — uniform 3-column grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.name}
                project={project}
                onClick={() => setSelected(project)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
