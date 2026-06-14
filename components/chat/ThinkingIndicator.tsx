"use client";

import { motion } from "framer-motion";
import { getCharacterAvatarUrl } from "@/lib/utils";

interface ThinkingIndicatorProps {
  characterName?: string;
  characterImage?: string | null;
}

export function ThinkingIndicator({
  characterName,
  characterImage,
}: ThinkingIndicatorProps) {
  const avatarUrl = characterName
    ? getCharacterAvatarUrl({
        name: characterName,
        imageUrl: characterImage ?? null,
      })
    : null;

  return (
    <div className="flex max-w-[85%] gap-3">
      {avatarUrl && (
        <div className="flex-shrink-0 pt-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarUrl}
            alt={characterName ?? "Character"}
            className="h-9 w-9 rounded-full border border-primary/30 object-cover"
          />
        </div>
      )}
      <div className="rounded-2xl rounded-tl-md border border-border/80 bg-card px-5 py-4">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="inline-block h-2 w-2 rounded-full bg-accent"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
