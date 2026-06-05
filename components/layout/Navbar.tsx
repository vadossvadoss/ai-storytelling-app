"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/create/character", label: "Create" },
];

export function Navbar() {
  const pathname = usePathname();
  const mana = useChatStore((s) => s.mana);
  const isChat = pathname?.startsWith("/chat");

  if (isChat) return null;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors">
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <span className="font-display text-xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            StoryVerse
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-accent bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-accent">{mana}</span>
            <span className="text-xs text-muted-foreground">Mana</span>
          </div>
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
