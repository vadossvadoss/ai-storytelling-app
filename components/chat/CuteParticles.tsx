"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  emoji: string;
}

const EMOJIS = ["✨", "💫", "❤️", "⭐", "🌸"];

export function useCuteParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const burst = useCallback(() => {
    const batch: Particle[] = Array.from({ length: 7 }, (_, i) => ({
      id: Date.now() + i,
      x: 15 + Math.random() * 70,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setParticles((prev) => [...prev, ...batch]);
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !batch.some((b) => b.id === p.id))
      );
    }, 2000);
  }, []);

  const ParticleLayer = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -120, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute bottom-24 text-lg"
            style={{ left: `${p.x}%` }}
          >
            {p.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );

  return { burst, ParticleLayer };
}
