"use client";

import { motion } from "framer-motion";
import { cn, getCharacterAvatarUrl } from "@/lib/utils";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  characterName?: string;
  characterImage?: string | null;
}

export function MessageBubble({
  role,
  content,
  characterName,
  characterImage,
}: MessageBubbleProps) {
  const isUser = role === "user";
  const avatarUrl =
    characterName && !isUser
      ? getCharacterAvatarUrl({
          name: characterName,
          imageUrl: characterImage ?? null,
        })
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "flex gap-3",
        isUser ? "flex-row-reverse ml-auto max-w-[85%]" : "flex-row max-w-[85%]"
      )}
    >
      {!isUser && avatarUrl && (
        <div className="flex-shrink-0 pt-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarUrl}
            alt={characterName ?? "Character"}
            className="h-9 w-9 rounded-full border border-primary/30 object-cover shadow-sm"
          />
        </div>
      )}
      <div
        className={cn(
          "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
          isUser
            ? "rounded-tr-md bg-primary text-primary-foreground shadow-primary/20"
            : "rounded-tl-md border border-border/80 bg-card text-foreground"
        )}
      >
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </motion.div>
  );
}
