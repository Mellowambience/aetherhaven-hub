interface SigilOptions {
  size?: number;
  strokeWidth?: number;
}

export function getSeedFromBrowser(): string {
  if (typeof window === "undefined") return "void-seed";
  let seed = localStorage.getItem("aether-seed");
  if (!seed) {
    seed = Math.random().toString(36).slice(2);
    localStorage.setItem("aether-seed", seed);
  }
  return seed;
}

export function generateSigil(seed: string, opts: SigilOptions = {}): string {
  const size = opts.size ?? 32;
  const sw = opts.strokeWidth ?? 0.8;

  // Deterministic hash from seed
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = ((h << 5) - h + seed.charCodeAt(i)) | 0;
  }
  const r = (h & 0xff) / 255;
  const hue = Math.round(r * 360);
  const color = `hsl(${hue}, 70%, 65%)`;

  const center = size / 2;
  const radius = size / 2.8;

  // Generate 3 points for triangular sigil
  const angleSeed = Math.abs(h);
  const angles = [0, 1, 2].map((i) => {
    const base = (i * Math.PI * 2) / 3;
    const ji = ((angleSeed >> (i * 4)) & 0xf) / 16 - 0.5;
    return base + ji * 0.6;
  });
  const points = angles.map((a) => ({
    x: center + Math.cos(a) * radius,
    y: center + Math.sin(a) * radius,
  }));

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ") + " Z";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <path d="${path}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" />
  </svg>`;
}
