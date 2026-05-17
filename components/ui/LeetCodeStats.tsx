"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface LeetCodeData {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

interface ProfileData {
  ranking: number;
}

const LEETCODE_URL = "https://leetcode.com/u/aditya__19/";
const ORANGE = "#FFA116";

export default function LeetCodeStats() {
  const [stats, setStats] = useState<LeetCodeData | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("https://alfa-leetcode-api.onrender.com/aditya__19/solved").then((r) => r.json()),
      fetch("https://alfa-leetcode-api.onrender.com/aditya__19").then((r) => r.json()),
    ])
      .then(([solved, prof]) => {
        setStats(solved);
        setProfile(prof);
      })
      .catch(() => setError(true));
  }, []);

  const difficulties = stats
    ? [
        { label: "Easy", solved: stats.easySolved, color: "#00b8a3" },
        { label: "Medium", solved: stats.mediumSolved, color: ORANGE },
        { label: "Hard", solved: stats.hardSolved, color: "#ef4743" },
      ]
    : [];

  const maxSolved = Math.max(...difficulties.map((d) => d.solved), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${ORANGE}20` }}>
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill={ORANGE}>
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
            </svg>
          </div>
          <div>
            <h3 className="font-mono text-sm font-medium text-[var(--foreground)]">LeetCode</h3>
            <p className="text-xs text-[var(--muted)]">aditya__19</p>
          </div>
        </div>
        <a
          href={LEETCODE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Profile <ExternalLink size={12} />
        </a>
      </div>

      {error ? (
        <p className="text-xs text-[var(--muted)] font-mono">Failed to load stats.</p>
      ) : !stats ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-8 w-24 rounded bg-[var(--border)]" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-5 rounded bg-[var(--border)]" />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Total solved */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="32" fill="none" stroke="var(--border)" strokeWidth="6" />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  fill="none"
                  stroke={ORANGE}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 32}`}
                  strokeDashoffset={`${2 * Math.PI * 32 * (1 - Math.min(stats.solvedProblem / 3500, 1))}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold font-mono text-[var(--foreground)]">{stats.solvedProblem}</span>
                <span className="text-[10px] text-[var(--muted)] font-mono">solved</span>
              </div>
            </div>
            {profile && (
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[var(--muted)] font-mono">Global Rank</span>
                <span className="text-sm font-bold font-mono text-[var(--foreground)]">
                  #{profile.ranking.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Difficulty breakdown */}
          <div className="flex-1 space-y-3">
            {difficulties.map(({ label, solved, color }) => (
              <div key={label} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono" style={{ color }}>{label}</span>
                  <span className="text-xs font-mono text-[var(--muted)]">{solved}</span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(solved / maxSolved) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
