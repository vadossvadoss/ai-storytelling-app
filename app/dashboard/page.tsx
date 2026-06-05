"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Plus, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MOCK_CONVERSATIONS,
  MOCK_CHARACTERS,
  MOCK_USER,
  getCharacterById,
} from "@/lib/mock-data";

export default function DashboardPage() {
  const myCharacters = MOCK_CHARACTERS.filter(
    (c) => c.authorId === MOCK_USER.id
  );

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-4xl font-bold">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back, {MOCK_USER.name}
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Mana Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              <span className="text-3xl font-bold text-accent">
                {MOCK_USER.mana}
              </span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Stories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold">
                {MOCK_CONVERSATIONS.length}
              </span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Characters Created
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              <span className="text-3xl font-bold">{myCharacters.length}</span>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold">Recent Stories</h2>
            <Link href="/explore">
              <Button variant="secondary" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                New Story
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_CONVERSATIONS.map((conv, i) => {
              const character = getCharacterById(conv.characterId);
              return (
                <motion.div
                  key={conv.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/chat/${conv.id}`}>
                    <Card className="hover:border-primary/40 hover:shadow-glow transition-all cursor-pointer">
                      <CardContent className="flex items-center gap-4 p-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                          <MessageCircle className="h-6 w-6 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{conv.title}</p>
                          <p className="text-sm text-muted-foreground">
                            with {character?.name ?? "Unknown"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(conv.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold">My Characters</h2>
            <Link href="/create/character">
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Create Character
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {myCharacters.map((char) => (
              <Link key={char.id} href={`/character/${char.id}`}>
                <Card className="hover:border-primary/40 hover:shadow-glow transition-all">
                  <CardContent className="p-5">
                    <p className="font-display font-semibold">{char.name}</p>
                    <p className="text-sm text-muted-foreground capitalize mt-1">
                      {char.genre} · {char.isPublic ? "Public" : "Private"}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
