"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCharacterById } from "@/lib/mock-data";

export default function CharacterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const character = getCharacterById(params.id as string);

  if (!character) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Character not found.</p>
      </div>
    );
  }

  const startStory = async () => {
    const res = await fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ characterId: character.id }),
    });
    const data = await res.json();
    router.push(`/chat/${data.id}`);
  };

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explore
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-8 md:grid-cols-2"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border">
            {character.imageUrl && (
              <Image
                src={character.imageUrl}
                alt={character.name}
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>

          <div className="flex flex-col justify-center">
            <Badge variant="secondary" className="w-fit capitalize mb-3">
              {character.genre}
            </Badge>
            <h1 className="font-display text-4xl font-bold">
              {character.name}
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {character.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {character.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <Button size="lg" className="mt-8 gap-2" onClick={startStory}>
              <MessageCircle className="h-5 w-5" />
              Start Story
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
