import type { Metadata } from "next";
import { Inter, Cinzel, Cormorant_Garamond } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-character",
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
      <body
        className={`${inter.variable} ${cinzel.variable} ${cormorant.variable} font-sans`}
      >
        <AppProviders>
          <Navbar />
          <main>{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
