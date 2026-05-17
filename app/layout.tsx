import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adityadeshpande.dev"),
  title: "Aditya Ajay Deshpande — AI-First Engineer",
  description:
    "MS CS student at Northeastern (4.0 GPA) and AI Context Software Engineer at MasterControl. I build AI agents, MCP systems, RAG pipelines, and multi-agent orchestration.",
  keywords: [
    "Aditya Ajay Deshpande",
    "AI Engineer",
    "Software Engineer",
    "MCP",
    "RAG",
    "AI Agents",
    "Next.js",
    "Northeastern University",
    "MasterControl",
  ],
  authors: [{ name: "Aditya Ajay Deshpande" }],
  creator: "Aditya Ajay Deshpande",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adityadeshpande.dev",
    title: "Aditya Ajay Deshpande — AI-First Engineer",
    description:
      "I build AI agents, MCP systems, RAG pipelines & developer tooling that ships.",
    siteName: "Aditya Ajay Deshpande Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aditya Ajay Deshpande — AI-First Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Ajay Deshpande — AI-First Engineer",
    description: "I build AI agents, MCP systems, RAG pipelines & developer tooling that ships.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
