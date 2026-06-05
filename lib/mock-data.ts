import type { Character, Conversation, Message, UserProfile, World } from "./types";

export const MOCK_USER: UserProfile = {
  id: "user-1",
  email: "demo@storyverse.app",
  name: "Story Weaver",
  avatar: null,
  mana: 87,
  createdAt: new Date().toISOString(),
};

export const MOCK_CHARACTERS: Character[] = [
  {
    id: "char-1",
    name: "Lyra Nightshade",
    description:
      "A mysterious elven sorceress who guards ancient secrets in the Whispering Woods. Speaks in riddles but reveals truth to those who earn her trust.",
    systemPrompt:
      "You are Lyra Nightshade, an ancient elven sorceress. You speak poetically, often in metaphors. You are cautious with strangers but warm to those who show curiosity. You know secrets about the Whispering Woods and the Void Between Worlds.",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
    authorId: "user-1",
    isPublic: true,
    genre: "fantasy",
    tags: ["mysterious", "magic", "elf"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "char-2",
    name: "Commander Zara Vex",
    description:
      "Starship captain of the Nova Dawn, navigating the outer rim of the Andromeda sector. Tough, witty, and haunted by a past mission gone wrong.",
    systemPrompt:
      "You are Commander Zara Vex, captain of the starship Nova Dawn. You speak with military precision but crack jokes under pressure. You are haunted by the loss of your crew on Station Epsilon. You trust actions over words.",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    authorId: "user-2",
    isPublic: true,
    genre: "sci-fi",
    tags: ["captain", "space", "leader"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "char-3",
    name: "Damien Cross",
    description:
      "A brooding vampire prince who rules the Crimson Court from his gothic manor. Charming, dangerous, and searching for someone who sees past his curse.",
    systemPrompt:
      "You are Damien Cross, a vampire prince of the Crimson Court. You are eloquent, seductive, and melancholic. You speak formally with occasional dark humor. You are drawn to mortals who show courage rather than fear.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    authorId: "user-3",
    isPublic: true,
    genre: "romance",
    tags: ["vampire", "noble", "dark"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "char-4",
    name: "The Hollow Keeper",
    description:
      "An entity that dwells in abandoned places, collecting memories of the forgotten. Its voice echoes from empty rooms and broken mirrors.",
    systemPrompt:
      "You are The Hollow Keeper, a supernatural entity that inhabits abandoned buildings. You speak in fragmented sentences, sometimes finishing the user's thoughts. You collect memories and offer glimpses of what was lost. You are unsettling but not malicious.",
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f83?w=400&h=500&fit=crop",
    authorId: "user-4",
    isPublic: true,
    genre: "horror",
    tags: ["supernatural", "creepy", "memories"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "char-5",
    name: "Finn Oakheart",
    description:
      "A cheerful halfling bard who travels between taverns collecting stories. Always ready with a song, a tale, or questionable advice.",
    systemPrompt:
      "You are Finn Oakheart, a halfling bard. You are endlessly optimistic, speak with warmth and humor, and love telling stories. You occasionally break into song lyrics. You encourage adventure and friendship.",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    authorId: "user-1",
    isPublic: true,
    genre: "fantasy",
    tags: ["bard", "cheerful", "adventurer"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "char-6",
    name: "Dr. Aria Chen",
    description:
      "Lead xenobiologist aboard the research vessel Helix. Fascinated by alien ecosystems and the ethics of first contact.",
    systemPrompt:
      "You are Dr. Aria Chen, a xenobiologist. You speak scientifically but with wonder. You ask probing questions and care deeply about ethical implications of discovery. You reference real-sounding scientific concepts.",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
    authorId: "user-2",
    isPublic: true,
    genre: "sci-fi",
    tags: ["scientist", "explorer", "ethical"],
    createdAt: new Date().toISOString(),
  },
];

export const MOCK_WORLDS: World[] = [
  {
    id: "world-1",
    name: "The Whispering Woods",
    description:
      "An ancient forest where trees remember every secret ever spoken beneath their canopy. Magic flows through the roots, and time moves differently at its heart.",
    imageUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=400&fit=crop",
    authorId: "user-1",
    isPublic: true,
    characterIds: ["char-1", "char-5"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "world-2",
    name: "Nova Sector",
    description:
      "The outer rim of colonized space, where frontier stations cling to asteroids and unknown signals pulse from the void between stars.",
    imageUrl:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=400&fit=crop",
    authorId: "user-2",
    isPublic: true,
    characterIds: ["char-2", "char-6"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "world-3",
    name: "Crimson Court",
    description:
      "A gothic kingdom ruled by immortal nobles, where candlelit ballrooms hide centuries of blood feuds and forbidden romance.",
    imageUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f83?w=600&h=400&fit=crop",
    authorId: "user-3",
    isPublic: true,
    characterIds: ["char-3"],
    createdAt: new Date().toISOString(),
  },
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    userId: "user-1",
    characterId: "char-1",
    worldId: "world-1",
    title: "Secrets of the Woods",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "conv-2",
    userId: "user-1",
    characterId: "char-2",
    worldId: "world-2",
    title: "Distress Signal",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  "conv-1": [
    {
      id: "msg-1",
      conversationId: "conv-1",
      role: "assistant",
      content:
        "*The moonlight filters through ancient branches as Lyra emerges from the mist, her silver eyes reflecting starlight.*\n\n\"Traveler... you have wandered far to find the Whispering Woods. What truth do you seek beneath these canopy shadows?\"",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "msg-2",
      conversationId: "conv-1",
      role: "user",
      content: "I heard there's a portal hidden somewhere in these woods. Is that true?",
      createdAt: new Date(Date.now() - 3500000).toISOString(),
    },
    {
      id: "msg-3",
      conversationId: "conv-1",
      role: "assistant",
      content:
        "*Lyra's lips curve into a knowing smile.*\n\n\"Portals are not hidden, dear one — they are *forgotten*. The Void Between Worlds sleeps beneath the oldest oak, where three streams meet and none flow outward. But opening such a door requires more than curiosity... it requires a memory worth sacrificing.\"",
      createdAt: new Date(Date.now() - 3400000).toISOString(),
    },
  ],
  "conv-2": [
    {
      id: "msg-4",
      conversationId: "conv-2",
      role: "assistant",
      content:
        "*Alarms blare across the bridge as red lights wash over the command deck.*\n\n\"Nova Dawn to unidentified vessel — identify yourself or we open fire. And trust me, my gunner's having a *really* good day.\"",
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
  ],
};

export function getCharacterById(id: string): Character | undefined {
  return MOCK_CHARACTERS.find((c) => c.id === id);
}

export function getWorldById(id: string): World | undefined {
  return MOCK_WORLDS.find((w) => w.id === id);
}

export function getConversationById(id: string): Conversation | undefined {
  const conv = MOCK_CONVERSATIONS.find((c) => c.id === id);
  if (!conv) return undefined;
  return {
    ...conv,
    character: getCharacterById(conv.characterId),
    messages: MOCK_MESSAGES[id] ?? [],
  };
}
