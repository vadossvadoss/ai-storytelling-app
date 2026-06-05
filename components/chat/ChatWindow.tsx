"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { ThinkingIndicator } from "./ThinkingIndicator";
import { ManaModal } from "@/components/layout/ManaModal";
import { useChatStore } from "@/lib/store";
import type { Character, Message } from "@/lib/types";

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
    addMessage(userMessage);
    setIsStreaming(true);
    setStreamingContent("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          characterId: character.id,
          message: content,
        }),
      });

      if (!response.ok) throw new Error("Chat request failed");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let fullContent = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullContent += chunk;
          appendStreamingContent(chunk);
        }

        const assistantMessage: Message = {
          id: `msg-${Date.now() + 1}`,
          conversationId,
          role: "assistant",
          content: fullContent,
          createdAt: new Date().toISOString(),
        };
        addMessage(assistantMessage);
      }
    } catch (error) {
      console.error("Chat error:", error);
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
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          {character.imageUrl && (
            <Image
              src={character.imageUrl}
              alt={character.name}
              width={40}
              height={40}
              className="rounded-full border border-primary/30 object-cover"
            />
          )}
          <div>
            <h1 className="font-display font-semibold">{character.name}</h1>
            <p className="text-xs text-muted-foreground capitalize">
              {character.genre}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5">
          <Zap className="h-4 w-4 text-accent" />
          <span className="text-sm font-semibold text-accent">{mana}</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
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
        {isStreaming && !streamingContent && <ThinkingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSend} disabled={isStreaming} />
      <ManaModal open={showManaModal} onOpenChange={setShowManaModal} />
    </div>
  );
}
