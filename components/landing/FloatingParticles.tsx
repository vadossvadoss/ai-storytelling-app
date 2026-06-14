"use client";

const PARTICLE_COUNT = 60;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export function FloatingParticles() {
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: `${seededRandom(i) * 100}%`,
    top: `${seededRandom(i + 1) * 100}%`,
    size: seededRandom(i + 2) * 3 + 1,
    delay: seededRandom(i + 3) * 8,
    duration: seededRandom(i + 4) * 6 + 4,
    opacity: seededRandom(i + 5) * 0.5 + 0.2,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle absolute rounded-full bg-accent"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
      <div className="star-field absolute inset-0" />
    </div>
  );
}
