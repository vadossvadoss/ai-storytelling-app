"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";

export default function CreateWorldPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/worlds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, isPublic }),
      });
      const data = await res.json();
      router.push(`/world/${data.id}`);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-4xl font-bold">Create World</h1>
          <p className="mt-2 text-muted-foreground">
            Build a setting for your characters to inhabit
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="aspect-[21/9] rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                <Globe className="h-16 w-16 text-accent/30" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">World Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="The Whispering Woods"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the setting, atmosphere, and lore..."
                  rows={5}
                  required
                />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border p-4">
                <div>
                  <Label>Public World</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Visible on the explore page
                  </p>
                </div>
                <Switch checked={isPublic} onCheckedChange={setIsPublic} />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create World"}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
