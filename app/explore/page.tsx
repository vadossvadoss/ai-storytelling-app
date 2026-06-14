"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { WorldCard } from "@/components/worlds/WorldCard";
import { getCharacters } from "@/lib/api";
import { MOCK_WORLDS } from "@/lib/mock-data";
import type { Character, Genre } from "@/lib/types";

const genres: { value: Genre | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "fantasy", label: "Fantasy" },
  { value: "sci-fi", label: "Sci-Fi" },
  { value: "romance", label: "Romance" },
  { value: "horror", label: "Horror" },
];

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") === "worlds" ? "worlds" : "characters";
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState<Genre | "all">("all");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCharacters() {
      setLoading(true);
      setError(null);
      try {
        const data = await getCharacters();
        if (!cancelled) {
          setCharacters(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load characters"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCharacters();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredCharacters = characters.filter((c) => {
    const matchesGenre = genre === "all" || c.genre === genre;
    const matchesSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchesGenre && matchesSearch && c.isPublic;
  });

  const filteredWorlds = MOCK_WORLDS.filter((w) => {
    const matchesSearch =
      !search ||
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.description.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && w.isPublic;
  });

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-4xl font-bold">Explore</h1>
          <p className="mt-2 text-muted-foreground">
            Discover characters and worlds created by the community
          </p>
        </motion.div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search characters and worlds..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {genres.map((g) => (
              <button
                key={g.value}
                onClick={() => setGenre(g.value)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  genre === g.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <Tabs defaultValue={defaultTab} className="mt-8">
          <TabsList>
            <TabsTrigger value="characters">
              Characters ({loading ? "..." : filteredCharacters.length})
            </TabsTrigger>
            <TabsTrigger value="worlds">
              Worlds ({filteredWorlds.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="characters">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
                <p className="text-sm text-muted-foreground">
                  Loading characters...
                </p>
              </div>
            ) : error ? (
              <div className="py-12 text-center">
                <p className="text-red-400">{error}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Make sure the backend is running and reachable
                </p>
              </div>
            ) : (
              <>
                <div className="masonry-grid mt-4">
                  {filteredCharacters.map((char, i) => (
                    <div key={char.id} className="masonry-item">
                      <CharacterCard character={char} index={i} />
                    </div>
                  ))}
                </div>
                {filteredCharacters.length === 0 && (
                  <p className="py-12 text-center text-muted-foreground">
                    No characters found. Try a different search or genre.
                  </p>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="worlds">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
              {filteredWorlds.map((world, i) => (
                <WorldCard key={world.id} world={world} index={i} />
              ))}
            </div>
            {filteredWorlds.length === 0 && (
              <p className="py-12 text-center text-muted-foreground">
                No worlds found. Try a different search.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
