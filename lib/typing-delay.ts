/** Claude.ai-like pace: ~15ms average with organic variation */
const BASE_MS = 15;

export function typingDelayMs(token = ""): number {
  // Bell-shaped jitter — most delays cluster near the base, fewer at extremes
  const jitter = (Math.random() + Math.random()) / 2;
  const spread = 14;
  let ms = BASE_MS + (jitter - 0.5) * spread;

  // Occasional micro-pause (~6% of tokens)
  if (Math.random() < 0.06) {
    ms += 12 + Math.random() * 18;
  }

  const lastChar = token.slice(-1);

  if (/[.!?]/.test(lastChar)) {
    ms += 20 + Math.random() * 30;
  } else if (/[,;:]/.test(lastChar)) {
    ms += 6 + Math.random() * 10;
  } else if (lastChar === "\n") {
    ms += 10 + Math.random() * 15;
  }

  return Math.max(3, Math.min(75, Math.round(ms)));
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function delayBeforeToken(token = ""): Promise<void> {
  await sleep(typingDelayMs(token));
}
