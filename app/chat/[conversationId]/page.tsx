import { ChatWindow } from "@/components/chat/ChatWindow";
import { getConversationById } from "@/lib/mock-data";

interface ChatPageProps {
  params: { conversationId: string };
}

export default function ChatPage({ params }: ChatPageProps) {
  const conversation = getConversationById(params.conversationId);

  if (!conversation?.character) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Conversation not found.</p>
      </div>
    );
  }

  return (
    <ChatWindow
      conversationId={params.conversationId}
      character={conversation.character}
      initialMessages={conversation.messages ?? []}
    />
  );
}
