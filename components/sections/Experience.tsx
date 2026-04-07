"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { EXPERIENCE } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-24 bg-[var(--card)]/30">
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
              02 / experience
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-[var(--foreground)]">
              Where I&apos;ve Worked
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-0 md:left-6 top-0 bottom-0 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, var(--accent), var(--secondary), transparent)",
              }}
            />

            <div className="space-y-10 pl-8 md:pl-20">
              {EXPERIENCE.map((exp, i) => (
                <motion.div key={`${exp.company}-${i}`} variants={fadeUp} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-8 md:-left-20 top-6 flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full border-2 ${
                        exp.current
                          ? "bg-[var(--accent)] border-[var(--accent)]"
                          : "bg-[var(--card)] border-[var(--muted)]"
                      }`}
                    />
                    {exp.current && (
                      <div className="absolute w-3 h-3 rounded-full bg-[var(--accent)] animate-ping opacity-40" />
                    )}
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/40 transition-colors"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-display font-bold text-lg text-[var(--foreground)]">
                            {exp.role}
                          </h3>
                          {exp.current && (
                            <span className="px-2 py-0.5 text-xs font-mono font-semibold rounded-full bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-[var(--accent)] font-medium mt-0.5">{exp.company}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] justify-end">
                          <Calendar size={11} />
                          {exp.duration}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] justify-end">
                          <MapPin size={11} />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-2 mb-4">
                      {exp.bullets.map((bullet, bi) => (
                        <li key={bi} className="flex gap-3 text-sm text-[var(--muted)] leading-relaxed">
                          <span className="text-[var(--accent)] mt-1.5 shrink-0 text-xs">▸</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--border)]">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[var(--secondary)]/10 text-[var(--secondary)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
