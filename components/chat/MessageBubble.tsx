"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}
    >
      {!isUser && (
        <div className="flex-shrink-0">
          {characterImage ? (
            <Image
              src={characterImage}
              alt={characterName ?? "Character"}
              width={36}
              height={36}
              className="rounded-full border border-primary/30 object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-accent">
              {characterName?.[0] ?? "?"}
            </div>
          )}
        </div>
      )}
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-card border border-border text-foreground rounded-tl-sm"
        )}
      >
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </motion.div>
  );
}
