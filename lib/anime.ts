const ANIME_EXPRESSIONS = [
  "*tilts head curiously*",
  "*smiles mysteriously*",
  "*leans closer*",
  "*twirls a lock of hair*",
  "*giggles softly*",
  "*eyes sparkle*",
  "*blushes slightly*",
];

const WELCOME_TEMPLATES = [
  (name: string) =>
    `Oh my~ A new traveler appears! *twirls hair* I'm ${name}... and I don't talk to just anyone. But you seem... interesting. ✨`,
  (name: string) =>
    `*eyes light up* Well, well~ Look who wandered in... I'm ${name}. You're not like the others, are you? 💫`,
  (name: string) =>
    `Hehe~ *waves playfully* ${name}, at your service! Something tells me you're going to be fun~ ✨`,
  (name: string) =>
    `*smiles mysteriously* So... you've come to see me, ${name}? How bold~ I like that already. ❤️`,
];

export function getCharacterShortName(fullName: string): string {
  return fullName.split(/\s+/)[0] ?? fullName;
}

export function buildWelcomeMessage(character: { name: string }): string {
  const shortName = getCharacterShortName(character.name);
  const template =
    WELCOME_TEMPLATES[shortName.length % WELCOME_TEMPLATES.length];
  return template(shortName);
}

export function pickAnimeExpression(): string {
  return ANIME_EXPRESSIONS[
    Math.floor(Math.random() * ANIME_EXPRESSIONS.length)
  ];
}

export function wrapWithAnimeExpression(text: string): string {
  return `${pickAnimeExpression()}\n\n${text}`;
}

export function cardHoverIcon(seed: string): "heart" | "star" {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash += seed.charCodeAt(i);
  }
  return hash % 2 === 0 ? "heart" : "star";
}
