/**
 * Generates a deterministic SVG sigil glyph from a seed string.
 * Pure math — no external deps. Used for visitor identity + transmissions.
 */

export function generateSigil(seed: string): string {
  // Simple hash to get deterministic numbers from seed
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }

  const abs = Math.abs(hash);
  const hue = abs % 360;
  const variant = abs % 4;

  const paths = [
    `M50,10 L90,90 L10,90 Z M50,30 L75,75 L25,75 Z`,
    `M50,10 L85,40 L70,85 L30,85 L15,40 Z M50,25 L72,42 L63,72 L37,72 L28,42 Z`,
    `M50,5 L95,50 L50,95 L5,50 Z M50,20 L80,50 L50,80 L20,50 Z`,
    `M50,10 C80,10 90,40 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,40 20,10 50,10 Z M50,25 C68,25 75,40 75,50 C75,65 63,75 50,75 C37,75 25,65 25,50 C25,40 32,25 50,25 Z`,
  ];

  return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow-${abs}">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#glow-${abs})" fill="none" stroke="hsl(${hue}, 80%, 70%)" stroke-width="1.5" opacity="0.9">
        <path d="${paths[variant]}"/>
      </g>
    </svg>
  `;
}

export function getSeedFromBrowser(): string {
  if (typeof window === "undefined") return "void-traveler";
  const nav = window.navigator;
  const raw = [
    nav.language,
    nav.platform || "",
    String(window.screen.width),
    String(window.screen.height),
    String(window.screen.colorDepth),
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  ].join("|");
  return raw;
}