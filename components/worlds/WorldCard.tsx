"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import type { World } from "@/lib/types";

interface WorldCardProps {
  world: World;
  index?: number;
}

export function WorldCard({ world, index = 0 }: WorldCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Link href={`/world/${world.id}`}>
        <article className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-glow">
          <div className="relative aspect-[16/9] overflow-hidden">
            {world.imageUrl ? (
              <Image
                src={world.imageUrl}
                alt={world.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                <Globe className="h-16 w-16 text-accent/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="font-display text-xl font-bold">{world.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {world.description}
              </p>
              <p className="mt-2 text-xs text-accent">
                {world.characterIds.length} characters
              </p>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
