"use client";

import { motion } from "framer-motion";
import { buildWelcomeMessage, getCharacterAvatarUrl } from "@/lib/utils";
import type { Character } from "@/lib/types";

interface WelcomeMessageProps {
  character: Character;
}

export function WelcomeMessage({ character }: WelcomeMessageProps) {
  const avatarUrl = getCharacterAvatarUrl(character);
  const message = buildWelcomeMessage(character);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto max-w-lg"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl" />
          <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-primary/40 ring-4 ring-primary/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              alt={character.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <h2 className="font-character text-2xl font-semibold italic tracking-wide text-accent">
          {character.name}
        </h2>
        <span className="mt-1 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs capitalize text-accent">
          {character.genre}
        </span>
        <div className="mt-5 rounded-2xl border border-primary/20 bg-card/60 px-5 py-4 backdrop-blur-sm shadow-glow">
          <p className="text-sm leading-relaxed text-muted-foreground italic">
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
