"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, MessageCircle, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { WorldCard } from "@/components/worlds/WorldCard";
import { MOCK_CHARACTERS, MOCK_WORLDS } from "@/lib/mock-data";

const features = [
  {
    icon: MessageCircle,
    title: "Living Characters",
    description:
      "AI characters with unique personalities, memories, and evolving relationships.",
  },
  {
    icon: BookOpen,
    title: "Branching Stories",
    description:
      "Every choice shapes the narrative. No two adventures are the same.",
  },
  {
    icon: Wand2,
    title: "Create Your World",
    description:
      "Design characters and worlds, share them publicly, and build your audience.",
  },
];

export default function LandingPage() {
  const featuredCharacters = MOCK_CHARACTERS.slice(0, 4);
  const featuredWorlds = MOCK_WORLDS.slice(0, 2);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-accent">
              <Sparkles className="h-4 w-4" />
              AI-Powered Interactive Fiction
            </div>
            <h1 className="font-display text-5xl font-bold leading-tight sm:text-7xl">
              Every Story
              <br />
              <span className="text-gradient">Begins With You</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Step into worlds of fantasy, sci-fi, romance, and horror. Chat with
              AI characters who remember you, react to your choices, and weave
              stories only you can tell.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/explore">
                <Button size="lg" className="gap-2">
                  Start Exploring
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/create/character">
                <Button variant="secondary" size="lg">
                  Create a Character
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-border bg-card/30 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6 text-center hover:border-primary/30 hover:shadow-glow transition-all"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-3xl font-bold">
              Featured Characters
            </h2>
            <Link
              href="/explore"
              className="text-sm text-accent hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="masonry-grid">
            {featuredCharacters.map((char, i) => (
              <div key={char.id} className="masonry-item">
                <CharacterCard character={char} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card/30 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-3xl font-bold">Featured Worlds</h2>
            <Link
              href="/explore?tab=worlds"
              className="text-sm text-accent hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredWorlds.map((world, i) => (
              <WorldCard key={world.id} world={world} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 p-12 text-center shadow-glow">
          <h2 className="font-display text-3xl font-bold">
            Ready to Write Your Story?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join thousands of storytellers. Start with 100 free Mana — enough for
            100 AI responses.
          </p>
          <Link href="/register">
            <Button size="lg" className="mt-8">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
