"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { SOCIALS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[var(--muted)]">
            <span className="font-display font-semibold text-[var(--foreground)]">
              Aditya Deshpande
            </span>{" "}
            · © {new Date().getFullYear()} · Built with Next.js + Three.js
          </div>
          <div className="flex items-center gap-4">
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${SOCIALS.email}`}
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
