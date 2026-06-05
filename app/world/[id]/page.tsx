"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { getWorldById, getCharacterById } from "@/lib/mock-data";

export default function WorldDetailPage() {
  const params = useParams();
  const world = getWorldById(params.id as string);

  if (!world) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">World not found.</p>
      </div>
    );
  }

  const characters = world.characterIds
    .map((id) => getCharacterById(id))
    .filter(Boolean);

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/explore?tab=worlds"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explore
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative mb-10 aspect-[21/9] overflow-hidden rounded-2xl border border-border">
            {world.imageUrl && (
              <Image
                src={world.imageUrl}
                alt={world.name}
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="font-display text-4xl font-bold">{world.name}</h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                {world.description}
              </p>
            </div>
          </div>

          <h2 className="font-display text-2xl font-bold mb-6">
            Characters in this World
          </h2>
          <div className="masonry-grid">
            {characters.map((char, i) =>
              char ? (
                <div key={char.id} className="masonry-item">
                  <CharacterCard character={char} index={i} />
                </div>
              ) : null
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
