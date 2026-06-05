"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Genre } from "@/lib/types";

export default function CreateCharacterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [genre, setGenre] = useState<Genre>("fantasy");
  const [description, setDescription] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [tags, setTags] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tagList = tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          genre,
          description,
          systemPrompt,
          tags: tagList,
          isPublic,
        }),
      });
      const data = await res.json();
      router.push(`/character/${data.id}`);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-4xl font-bold">Create Character</h1>
          <p className="mt-2 text-muted-foreground">
            Bring a new character to life in StoryVerse
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Character Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Lyra Nightshade"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Genre</Label>
              <Select
                value={genre}
                onValueChange={(v) => setGenre(v as Genre)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fantasy">Fantasy</SelectItem>
                  <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                  <SelectItem value="romance">Romance</SelectItem>
                  <SelectItem value="horror">Horror</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Public Bio</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief description visible to other users..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="systemPrompt">AI System Prompt (Private)</Label>
              <Textarea
                id="systemPrompt"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Define personality, speech style, backstory, and behavior rules..."
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Personality Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="mysterious, magic, elf"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border p-4">
              <div>
                <Label>Public Character</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Visible on the explore page
                </p>
              </div>
              <Switch checked={isPublic} onCheckedChange={setIsPublic} />
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Character"}
            </Button>
          </div>

          <div>
            <div className="sticky top-24">
              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                Preview
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-4">
                    <span className="font-display text-6xl text-accent/30">
                      {name[0] ?? "?"}
                    </span>
                  </div>
                  <Badge variant="secondary" className="capitalize mb-2">
                    {genre}
                  </Badge>
                  <h3 className="font-display text-xl font-bold">
                    {name || "Character Name"}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-4">
                    {description || "Character description will appear here..."}
                  </p>
                  {tagList.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {tagList.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
