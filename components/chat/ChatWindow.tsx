"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { ThinkingIndicator } from "./ThinkingIndicator";
import { WelcomeMessage } from "./WelcomeMessage";
import { ManaModal } from "@/components/layout/ManaModal";
import { Badge } from "@/components/ui/badge";
import { useChatStore } from "@/lib/store";
import { streamMessage } from "@/lib/api";
import { getCharacterAvatarUrl } from "@/lib/utils";
import type { Character, Message } from "@/lib/types";
import { useCuteParticles } from "./CuteParticles";

interface ChatWindowProps {
  conversationId: string;
  character: Character;
  initialMessages: Message[];
}

export function ChatWindow({
  conversationId,
  character,
  initialMessages,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showManaModal, setShowManaModal] = useState(false);
  const avatarUrl = getCharacterAvatarUrl(character);
  const { burst, ParticleLayer } = useCuteParticles();

  const {
    messages,
    isStreaming,
    streamingContent,
    mana,
    setMessages,
    addMessage,
    setIsStreaming,
    setStreamingContent,
    appendStreamingContent,
    deductMana,
  } = useChatStore();

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages, setMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent, isStreaming]);

  const showWelcome = messages.length === 0 && !isStreaming;

  const handleSend = async (content: string) => {
    if (!deductMana()) {
      setShowManaModal(true);
      return;
    }

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      role: "user",
      content,
      createdAt: new Date().toISOString(),
    };
    const history = messages.slice(-20).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    addMessage(userMessage);
    burst();
    setIsStreaming(true);
    setStreamingContent("");

    try {
      const result = await streamMessage(
        conversationId,
        content,
        character.id,
        history,
        (token) => appendStreamingContent(token)
      );

      addMessage({
        id: result.messageId,
        conversationId,
        role: "assistant",
        content: result.fullContent,
        createdAt: result.createdAt,
      });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      console.error("Chat error:", errMsg, error);
      addMessage({
        id: `msg-err-${Date.now()}`,
        conversationId,
        role: "assistant",
        content: "*The connection flickers...* Please try again.",
        createdAt: new Date().toISOString(),
      });
    } finally {
      setIsStreaming(false);
      setStreamingContent("");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Character info header */}
      <header className="border-b border-border/60 bg-card/20 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/dashboard"
              className="flex-shrink-0 rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              alt={character.name}
              className="h-11 w-11 flex-shrink-0 rounded-full border-2 border-primary/30 object-cover shadow-sm"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate font-character text-xl font-semibold italic tracking-wide">
                  {character.name}
                </h1>
                <Badge variant="secondary" className="capitalize text-xs">
                  {character.genre}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                1 Mana per message
              </p>
            </div>
          </div>
          <div className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-accent">{mana}</span>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Mana
            </span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="relative flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <ParticleLayer />
        <div className="mx-auto max-w-3xl space-y-5">
          {showWelcome && <WelcomeMessage character={character} />}

          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              role={msg.role}
              content={msg.content}
              characterName={character.name}
              characterImage={character.imageUrl}
            />
          ))}

          {isStreaming && streamingContent && (
            <MessageBubble
              role="assistant"
              content={streamingContent}
              characterName={character.name}
              characterImage={character.imageUrl}
            />
          )}

          {isStreaming && !streamingContent && (
            <ThinkingIndicator
              characterName={character.name}
              characterImage={character.imageUrl}
            />
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSend={handleSend} disabled={isStreaming} />
      <ManaModal open={showManaModal} onOpenChange={setShowManaModal} />
    </div>
  );
}
