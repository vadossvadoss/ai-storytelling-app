import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "StoryVerse — AI Interactive Storytelling",
  description:
    "Chat with AI characters, explore branching storylines, and create your own worlds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${cinzel.variable} font-sans`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
