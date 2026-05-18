"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import RocketLoader from "@/components/ui/RocketLoader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

const HeroBackground = dynamic(() => import("@/components/three/HeroBackground"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <RocketLoader />

      {/* Fixed full-page 3D background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {mounted && <HeroBackground isDark={resolvedTheme === "dark"} />}
      </div>

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
