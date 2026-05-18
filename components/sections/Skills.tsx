"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  JavaOriginal,
  JavascriptOriginal,
  TypescriptOriginal,
  PythonOriginal,
  SwiftOriginal,
  Html5Original,
  ReactOriginal,
  NextjsOriginal,
  NodejsOriginal,
  ExpressOriginal,
  SpringOriginal,
  GraphqlPlain,
  VitestOriginal,
  PlaywrightOriginal,
  CypressioOriginal,
  JestPlain,
  MysqlOriginal,
  MongodbOriginal,
  PostgresqlOriginal,
  RedisOriginal,
  DockerOriginal,
  KubernetesPlain,
  GitOriginal,
} from "devicons-react";
// Direct subpath imports bypass the barrel re-export that pulls in @lobehub/ui
// @ts-ignore – no bundled type declarations for this deep path
import ClaudeCodeColor from "@lobehub/icons/es/ClaudeCode/components/Color";
// @ts-ignore
import LangChainColor from "@lobehub/icons/es/LangChain/components/Color";
// @ts-ignore
import CursorMono from "@lobehub/icons/es/Cursor/components/Mono";
import { SKILLS } from "@/lib/data";
import LeetCodeStats from "@/components/ui/LeetCodeStats";

type IconComponent = React.ComponentType<{ size?: number | string; className?: string }>;

// Icons that are naturally black on transparent — invert to white in dark mode
const DARK_INVERT = new Set(["ExpressOriginal"]);

const ICON_MAP: Record<string, IconComponent> = {
  JavaOriginal: JavaOriginal as IconComponent,
  JavascriptOriginal: JavascriptOriginal as IconComponent,
  TypescriptOriginal: TypescriptOriginal as IconComponent,
  PythonOriginal: PythonOriginal as IconComponent,
  SwiftOriginal: SwiftOriginal as IconComponent,
  Html5Original: Html5Original as IconComponent,
  ReactOriginal: ReactOriginal as IconComponent,
  NextjsOriginal: NextjsOriginal as IconComponent,
  NodejsOriginal: NodejsOriginal as IconComponent,
  ExpressOriginal: ExpressOriginal as IconComponent,
  SpringOriginal: SpringOriginal as IconComponent,
  GraphqlPlain: GraphqlPlain as IconComponent,
  VitestOriginal: VitestOriginal as IconComponent,
  PlaywrightOriginal: PlaywrightOriginal as IconComponent,
  CypressioOriginal: CypressioOriginal as IconComponent,
  JestPlain: JestPlain as IconComponent,
  MysqlOriginal: MysqlOriginal as IconComponent,
  MongodbOriginal: MongodbOriginal as IconComponent,
  PostgresqlOriginal: PostgresqlOriginal as IconComponent,
  RedisOriginal: RedisOriginal as IconComponent,
  DockerOriginal: DockerOriginal as IconComponent,
  KubernetesPlain: KubernetesPlain as IconComponent,
  GitOriginal: GitOriginal as IconComponent,
  LangChain: LangChainColor as IconComponent,
  ClaudeCode: ClaudeCodeColor as IconComponent,
  Cursor: CursorMono as IconComponent,
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
                    const invertClass = DARK_INVERT.has(skill.icon) ? " dark:invert" : "";
                    return (
                      <motion.div
                        key={skill.name}
                        variants={scaleIn}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="group flex flex-col items-center gap-2.5 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 transition-all cursor-default"
                      >
                        {Icon ? (
                          <Icon size={28} className={`opacity-85 group-hover:opacity-100 transition-opacity${invertClass}`} />
                        ) : (
                          <div className="w-7 h-7 rounded bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center text-xs font-mono font-bold">
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

          <LeetCodeStats />
        </motion.div>
      </div>
    </section>
  );
}
