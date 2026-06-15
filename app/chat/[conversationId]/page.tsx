"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { getConversationMessages } from "@/lib/api";
import { useAuthStore } from "@/lib/auth-store";
import type { Character, Message } from "@/lib/types";

export default function ChatPage() {
  const params = useParams();
  const conversationId = params.conversationId as string;
  const { token, isHydrated } = useAuthStore();
  const [character, setCharacter] = useState<Character | null>(null);
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isHydrated || !token) return;

    let cancelled = false;

    async function loadConversation() {
      setLoading(true);
      setError(null);

      console.log("[chat] loading conversation:", conversationId);

      try {
        const data = await getConversationMessages(conversationId);
        if (!cancelled) {
          setCharacter(data.character);
          setInitialMessages(data.messages);
        }
      } catch (err) {
        if (!cancelled) {
          setCharacter(null);
          setInitialMessages([]);
          setError(
            err instanceof Error ? err.message : "Failed to load conversation"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadConversation();

    return () => {
      cancelled = true;
    };
  }, [conversationId, isHydrated, token]);

  if (!isHydrated || !token) {
    return (
      <div className="flex h-screen items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
        <p className="text-muted-foreground">Loading auth...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
        <p className="text-muted-foreground">Loading conversation...</p>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2 px-4">
        <p className="text-muted-foreground">Conversation not found.</p>
        {error && (
          <p className="text-sm text-red-400 text-center max-w-md">{error}</p>
        )}
      </div>
    );
  }

  return (
    <ChatWindow
      conversationId={conversationId}
      character={character}
      initialMessages={initialMessages}
    />
  );
}
