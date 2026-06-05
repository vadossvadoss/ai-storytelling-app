"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Character } from "@/lib/types";
import { getCharacterAvatarUrl } from "@/lib/utils";

interface CharacterCardProps {
  character: Character;
  index?: number;
}

export function CharacterCard({ character, index = 0 }: CharacterCardProps) {
  const avatarUrl = getCharacterAvatarUrl(character);
  const isDicebear = avatarUrl.includes("api.dicebear.com");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <article className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-glow">
        <Link href={`/character/${character.id}`} className="block">
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/20 to-accent/10">
            {isDicebear ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={character.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <Image
                src={avatarUrl}
                alt={character.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 group-hover:opacity-0">
              <Badge variant="secondary" className="mb-2 capitalize">
                {character.genre}
              </Badge>
              <h3 className="font-display text-lg font-bold text-foreground">
                {character.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {character.description}
              </p>
            </div>
          </div>
        </Link>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <Button
            asChild
            size="lg"
            className="pointer-events-auto gap-2 shadow-glow-lg"
          >
            <Link href={`/character/${character.id}`}>
              <MessageCircle className="h-5 w-5" />
              Start Story
            </Link>
          </Button>
        </div>
      </article>
    </motion.div>
  );
}
