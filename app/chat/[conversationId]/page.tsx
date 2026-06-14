"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { getConversationById } from "@/lib/mock-data";
import { loadChatCharacter } from "@/lib/chat-storage";
import type { Character, Message } from "@/lib/types";

export default function ChatPage() {
  const params = useParams();
  const conversationId = params.conversationId as string;
  const [character, setCharacter] = useState<Character | null>(null);
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadConversation() {
      setLoading(true);

      const localConversation = getConversationById(conversationId);
      if (localConversation?.character) {
        if (!cancelled) {
          setCharacter(localConversation.character);
          setInitialMessages(localConversation.messages ?? []);
          setLoading(false);
        }
        return;
      }

      try {
        const res = await fetch(`/api/conversations/${conversationId}`);
        if (res.ok) {
          const data = (await res.json()) as {
            character?: Character;
            messages?: Message[];
          };
          if (data.character && !cancelled) {
            setCharacter(data.character);
            setInitialMessages(data.messages ?? []);
            setLoading(false);
            return;
          }
        }
      } catch {
        // fall through to localStorage
      }

      const storedCharacter = loadChatCharacter(conversationId);
      if (storedCharacter && !cancelled) {
        setCharacter(storedCharacter);
        setInitialMessages([]);
        setLoading(false);
        return;
      }

      if (!cancelled) {
        setCharacter(null);
        setLoading(false);
      }
    }

    loadConversation();

    return () => {
      cancelled = true;
    };
  }, [conversationId]);

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
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Conversation not found.</p>
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
