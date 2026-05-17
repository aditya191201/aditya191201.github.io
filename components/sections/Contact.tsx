"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Github, Linkedin, Mail, FileText, Send, Copy, Check } from "lucide-react";
import { SOCIALS } from "@/lib/data";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("https://formspree.io/f/xvzypjlg", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to send");
    reset();
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(SOCIALS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24">
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
              05 / contact
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mt-2 text-[var(--foreground)]">
              Let&apos;s Build Something
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left — CTA + socials */}
            <motion.div variants={fadeUp} className="space-y-8">
              <div className="space-y-4">
                <p className="text-[var(--muted)] text-lg leading-relaxed">
                  I&apos;m always interested in hearing about new opportunities, collaborating on
                  interesting projects, or just chatting about AI systems and developer tooling.
                </p>
                <p className="text-[var(--muted)] text-lg leading-relaxed">
                  Whether you have a project in mind, a question about my work, or want to
                  connect — my inbox is open.
                </p>
              </div>

              {/* Social links */}
              <div className="space-y-3">
                {/* GitHub */}
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 transition-all"
                >
                  <div className="p-2.5 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] shrink-0">
                    <Github size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[var(--foreground)] text-sm group-hover:text-[var(--accent)] transition-colors">
                      GitHub
                    </div>
                    <div className="text-xs text-[var(--muted)]">View my code</div>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 transition-all"
                >
                  <div className="p-2.5 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] shrink-0">
                    <Linkedin size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[var(--foreground)] text-sm group-hover:text-[var(--accent)] transition-colors">
                      LinkedIn
                    </div>
                    <div className="text-xs text-[var(--muted)]">Connect with me</div>
                  </div>
                </a>

                {/* Email — with copy button inside */}
                <div className="group flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 transition-all">
                  <div className="p-2.5 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] shrink-0">
                    <Mail size={18} />
                  </div>
                  <a
                    href={`mailto:${SOCIALS.email}`}
                    className="flex-1 min-w-0"
                  >
                    <div className="font-medium text-[var(--foreground)] text-sm group-hover:text-[var(--accent)] transition-colors">
                      Email
                    </div>
                    <div className="text-xs text-[var(--muted)] truncate">{SOCIALS.email}</div>
                  </a>
                  <button
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    className={`p-1.5 rounded-lg transition-all shrink-0 ${
                      copied
                        ? "text-green-400"
                        : "text-[var(--muted)] hover:text-[var(--accent)]"
                    }`}
                  >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                  </button>
                </div>
              </div>

              {/* Resume link */}
              <a
                href={SOCIALS.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3 rounded-xl border-2 border-[var(--secondary)] text-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white transition-all font-medium text-sm w-fit"
              >
                <FileText size={16} />
                View Resume
              </a>
            </motion.div>

            {/* Right — Contact form */}
            <motion.div variants={fadeUp}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {isSubmitSuccessful && (
                  <div className="p-4 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-sm font-medium">
                    Message sent! I&apos;ll get back to you soon.
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                    Name
                  </label>
                  <input
                    {...register("name")}
                    placeholder="Your name"
                    className={`w-full px-4 py-3 rounded-xl border bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none transition-all text-sm ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-[var(--border)] focus:border-[var(--accent)]"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 rounded-xl border bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none transition-all text-sm ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-[var(--border)] focus:border-[var(--accent)]"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell me about your project or just say hi..."
                    className={`w-full px-4 py-3 rounded-xl border bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none transition-all text-sm resize-none ${
                      errors.message
                        ? "border-red-500 focus:border-red-500"
                        : "border-[var(--border)] focus:border-[var(--accent)]"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm bg-[var(--accent)] text-[var(--background)] hover:opacity-90 transition-all shadow-lg shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/40 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
