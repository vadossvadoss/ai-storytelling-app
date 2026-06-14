"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Compass,
  MessageSquare,
  PenLine,
  Sparkles,
  Users,
  Globe,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { FloatingParticles } from "@/components/landing/FloatingParticles";
import { Footer } from "@/components/landing/Footer";
import { getCharacters } from "@/lib/api";
import { MOCK_CHARACTERS } from "@/lib/mock-data";
import type { Character } from "@/lib/types";

const stats = [
  { value: "10,000+", label: "Stories Created", icon: BookOpen },
  { value: "500+", label: "Characters", icon: Users },
  { value: "50+", label: "Worlds", icon: Globe },
];

const steps = [
  {
    step: "01",
    icon: Compass,
    title: "Choose a Character",
    description:
      "Browse hundreds of AI characters — from elven sorceresses to starship captains — each with unique personalities and memories.",
  },
  {
    step: "02",
    icon: MessageSquare,
    title: "Start Your Story",
    description:
      "Jump into an immersive chat adventure. Every message shapes the narrative in real time with streaming AI responses.",
  },
  {
    step: "03",
    icon: PenLine,
    title: "Shape the Narrative",
    description:
      "Your choices matter. Characters remember you, storylines branch, and no two adventures are ever the same.",
  },
];

function AnimatedCounter({
  value,
  label,
  icon: Icon,
  index,
}: {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-8 text-center backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:shadow-glow"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
        className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/20"
      >
        <Icon className="h-7 w-7 text-accent" />
      </motion.div>
      <p className="relative font-display text-4xl font-bold text-gradient sm:text-5xl">
        {value}
      </p>
      <p className="relative mt-2 text-sm font-medium text-muted-foreground">
        {label}
      </p>
    </motion.div>
  );
}

function StepCard({
  step,
  icon: Icon,
  title,
  description,
  index,
}: (typeof steps)[0] & { index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-8 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-glow">
        <span className="absolute right-6 top-6 font-display text-5xl font-bold text-primary/10 transition-colors duration-500 group-hover:text-primary/20">
          {step}
        </span>
        <motion.div
          whileHover={{ scale: 1.08, rotate: 3 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/25 to-accent/10 ring-1 ring-primary/30"
        >
          <Icon className="h-8 w-8 text-accent" />
        </motion.div>
        <h3 className="font-display text-xl font-semibold">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      {index < steps.length - 1 && (
        <div className="absolute -right-4 top-1/2 hidden h-px w-8 bg-gradient-to-r from-primary/40 to-transparent lg:block" />
      )}
    </motion.div>
  );
}

export default function LandingPage() {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    getCharacters()
      .then((data) => setCharacters(data.slice(0, 4)))
      .catch(() => setCharacters(MOCK_CHARACTERS.slice(0, 4)));
  }, []);

  const featuredCharacters =
    characters.length > 0 ? characters : MOCK_CHARACTERS.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] overflow-hidden flex items-center px-4 py-24 sm:px-6">
        <FloatingParticles />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/25 via-background to-background" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="relative mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm text-accent backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4" />
              AI-Powered Interactive Fiction
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-7xl lg:text-8xl"
            >
              Every Story
              <br />
              <span className="text-gradient">Begins With You</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed"
            >
              Step into worlds of fantasy, sci-fi, romance, and horror. Chat with
              AI characters who remember you, react to your choices, and weave
              stories only you can tell.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link href="/explore">
                <Button size="lg" className="gap-2 px-8 text-base shadow-glow-lg">
                  Start Exploring
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/create/character">
                <Button variant="secondary" size="lg" className="px-8 text-base">
                  Create a Character
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative px-4 py-20 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              A Universe of Stories
            </h2>
            <p className="mt-3 text-muted-foreground">
              Join a growing community of storytellers and adventurers
            </p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <AnimatedCounter key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-border/50 bg-card/20 px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
              Simple as 1-2-3
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              From first message to epic saga — your adventure starts in seconds
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <StepCard key={step.step} {...step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Characters */}
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
          >
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
                Meet the Cast
              </p>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                Featured Characters
              </h2>
            </div>
            <Link
              href="/explore"
              className="group flex items-center gap-1 text-sm text-accent transition-colors hover:text-accent/80"
            >
              View all characters
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCharacters.map((char, i) => (
              <CharacterCard key={char.id} character={char} index={i} featured />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-primary/30 p-12 text-center sm:p-16"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/5 to-background" />
          <FloatingParticles />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Ready to Write Your Story?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Join thousands of storytellers. Start with 100 free Mana — enough
              for 100 AI responses.
            </p>
            <Link href="/register">
              <Button size="lg" className="mt-8 gap-2 px-10 shadow-glow-lg">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
