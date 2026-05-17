"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiPython, SiTypescript, SiJavascript, SiPostgresql,
  SiNextdotjs, SiReact, SiNodedotjs, SiDotnet,
  SiOpenai, SiMongodb, SiRedis,
  SiDocker, SiGit, SiKubernetes,
  SiVercel, SiFigma, SiOpenjdk, SiLangchain,
  SiSwift, SiHtml5, SiExpress, SiSpringboot, SiGraphql,
  SiVitest, SiCypress, SiJest, SiMysql,
} from "react-icons/si";
import { FlaskConical } from "lucide-react";
import { SKILLS } from "@/lib/data";

type IconComponent = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

const ICON_MAP: Record<string, IconComponent> = {
  SiPython: SiPython as IconComponent,
  SiTypescript: SiTypescript as IconComponent,
  SiJavascript: SiJavascript as IconComponent,
  SiOpenjdk: SiOpenjdk as IconComponent,
  SiSwift: SiSwift as IconComponent,
  SiHtml5: SiHtml5 as IconComponent,
  SiPostgresql: SiPostgresql as IconComponent,
  SiNextdotjs: SiNextdotjs as IconComponent,
  SiReact: SiReact as IconComponent,
  SiNodedotjs: SiNodedotjs as IconComponent,
  SiExpress: SiExpress as IconComponent,
  SiSpringboot: SiSpringboot as IconComponent,
  SiGraphql: SiGraphql as IconComponent,
  SiDotnet: SiDotnet as IconComponent,
  SiLangchain: SiLangchain as IconComponent,
  SiOpenai: SiOpenai as IconComponent,
  SiVitest: SiVitest as IconComponent,
  SiPlaywright: FlaskConical as IconComponent, // no SI icon for Playwright
  SiCypress: SiCypress as IconComponent,
  SiJest: SiJest as IconComponent,
  SiMysql: SiMysql as IconComponent,
  SiMongodb: SiMongodb as IconComponent,
  SiRedis: SiRedis as IconComponent,
  SiDocker: SiDocker as IconComponent,
  SiKubernetes: SiKubernetes as IconComponent,
  SiGit: SiGit as IconComponent,
  SiVercel: SiVercel as IconComponent,
  SiFigma: SiFigma as IconComponent,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const groupStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 bg-[var(--card)]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={groupStagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="mb-16">
            <span className="text-[var(--accent)] font-mono text-sm font-medium">
              04 / skills
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-[var(--foreground)]">
              My Toolkit
            </h2>
          </motion.div>

          <div className="space-y-12">
            {SKILLS.map((group) => (
              <motion.div key={group.category} variants={fadeUp}>
                <h3 className="font-mono text-sm font-medium text-[var(--muted)] mb-5 uppercase tracking-widest">
                  {group.category}
                </h3>
                <motion.div
                  variants={stagger}
                  className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3"
                >
                  {group.skills.map((skill) => {
                    const Icon = ICON_MAP[skill.icon];
                    return (
                      <motion.div
                        key={skill.name}
                        variants={scaleIn}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="group flex flex-col items-center gap-2.5 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 transition-all cursor-default"
                      >
                        {Icon ? (
                          <Icon className="text-2xl text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors" />
                        ) : (
                          <div className="w-6 h-6 rounded bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center text-xs font-mono font-bold">
                            {skill.name[0]}
                          </div>
                        )}
                        <span className="text-xs font-mono text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors text-center leading-tight">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
