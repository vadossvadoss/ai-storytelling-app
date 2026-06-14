"use client";

import { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border/60 bg-card/30 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl border border-border/60 bg-background/80 p-2 pl-4 shadow-lg ring-1 ring-primary/10 focus-within:border-primary/40 focus-within:ring-primary/20 transition-all">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Say something to me~"
          disabled={disabled}
          rows={1}
          className="min-h-[52px] max-h-36 flex-1 resize-none bg-transparent py-3.5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <Button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          size="icon"
          className="mb-1 h-11 w-11 flex-shrink-0 rounded-xl shadow-glow"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
      <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-muted-foreground">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
