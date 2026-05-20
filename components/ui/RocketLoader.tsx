"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RocketLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="rocket-loader"
          className="fixed inset-0 z-[9999] flex items-end justify-center overflow-hidden"
          style={{ backgroundColor: "var(--background)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Stars />

          <motion.div
            className="relative flex flex-col items-center"
            style={{ marginBottom: -6 }}
            initial={{ y: 0 }}
            animate={{ y: "-115vh" }}
            transition={{ duration: 1.3, ease: [0.2, 1, 0.3, 1], delay: 0.2 }}
          >
            <Flame />

            {/* Outline rocket — 40px wide, 88px tall */}
            <svg
              width="40"
              height="88"
              viewBox="0 0 40 88"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Nose cone */}
              <path
                d="M20 2 L8 28 L32 28 Z"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              {/* Body */}
              <rect
                x="8" y="28" width="24" height="36"
                stroke="var(--accent)"
                strokeWidth="1.5"
              />
              {/* Porthole */}
              <circle
                cx="20" cy="44" r="5"
                stroke="var(--accent)"
                strokeWidth="1.5"
              />
              {/* Left fin */}
              <path
                d="M8 50 L2 72 L8 65"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {/* Right fin */}
              <path
                d="M32 50 L38 72 L32 65"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {/* Nozzle */}
              <path
                d="M14 64 L14 68 L26 68 L26 64"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Flame() {
  return (
    <motion.div
      style={{ position: "relative", width: 18, height: 32, marginTop: 2 }}
      animate={{ scaleY: [1, 1.25, 0.85, 1.15, 1], scaleX: [1, 0.88, 1.08, 0.94, 1] }}
      transition={{ duration: 0.18, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Soft outer glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 0%, var(--accent) 0%, var(--secondary) 50%, transparent 80%)",
          filter: "blur(4px)",
          opacity: 0.5,
          borderRadius: "0 0 60% 60%",
        }}
      />
      {/* Bright core streak */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          transform: "translateX(-50%)",
          width: 3,
          height: 22,
          background: "linear-gradient(to bottom, #fff 0%, var(--accent) 55%, transparent 100%)",
          borderRadius: "0 0 50% 50%",
          opacity: 0.9,
        }}
      />
    </motion.div>
  );
}

function Stars() {
  const [stars, setStars] = useState<
    { id: number; x: number; y: number; size: number; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 55 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        delay: Math.random() * 2,
        duration: Math.random() * 1.5 + 1,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            backgroundColor: "var(--foreground)",
            opacity: 0.25,
          }}
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
}
