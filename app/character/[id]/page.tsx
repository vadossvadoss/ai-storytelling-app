"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCharacterById as getCharacterByIdFromApi } from "@/lib/api";
import { getCharacterById as getCharacterByIdFromMock } from "@/lib/mock-data";
import {
  createMockConversationId,
  saveChatCharacter,
} from "@/lib/chat-storage";
import { getCharacterAvatarUrl } from "@/lib/utils";
import type { Character } from "@/lib/types";

export default function CharacterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const characterId = params.id as string;
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadCharacter() {
      setLoading(true);
      try {
        const fromApi = await getCharacterByIdFromApi(characterId);
        if (!cancelled && fromApi) {
          setCharacter(fromApi);
          return;
        }
      } catch {
        // fall back to local mock data
      }

      if (!cancelled) {
        setCharacter(getCharacterByIdFromMock(characterId) ?? null);
      }
    }

    loadCharacter().finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [characterId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
        <p className="text-muted-foreground">Loading character...</p>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Character not found.</p>
      </div>
    );
  }

  const startStory = () => {
    const conversationId = createMockConversationId(character.id);
    saveChatCharacter(conversationId, character);
    router.push(`/chat/${conversationId}`);
  };

  const avatarUrl = getCharacterAvatarUrl(character);

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
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-primary/20 shadow-glow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              alt={character.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>

          <div className="flex flex-col justify-center">
            <Badge variant="secondary" className="w-fit capitalize mb-3">
              {character.genre}
            </Badge>
            <h1 className="font-character text-4xl font-semibold italic tracking-wide">
              {character.name}
            </h1>
            <p className="mt-1 text-sm italic text-accent/90">
              Waiting just for you...
            </p>
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
