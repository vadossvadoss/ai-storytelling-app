import { create } from "zustand";
import type { Message } from "./types";

interface ChatState {
  messages: Message[];
  isStreaming: boolean;
  streamingContent: string;
  mana: number;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setIsStreaming: (streaming: boolean) => void;
  setStreamingContent: (content: string) => void;
  appendStreamingContent: (chunk: string) => void;
  setMana: (mana: number) => void;
  deductMana: () => boolean;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isStreaming: false,
  streamingContent: "",
  mana: 100,
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setIsStreaming: (isStreaming) => set({ isStreaming }),
  setStreamingContent: (streamingContent) => set({ streamingContent }),
  appendStreamingContent: (chunk) =>
    set((state) => ({
      streamingContent: state.streamingContent + chunk,
    })),
  setMana: (mana) => set({ mana }),
  deductMana: () => {
    const { mana } = get();
    if (mana <= 0) return false;
    set({ mana: mana - 1 });
    return true;
  },
}));
