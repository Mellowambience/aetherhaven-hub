"use client";

import { useEffect, useState } from "react";
import { generateSigil, getSeedFromBrowser } from "@/lib/sigil";

export default function SigilBadge({ size = 32 }: { size?: number }) {
  const [svg, setSvg] = useState("");

  useEffect(() => {
    setSvg(generateSigil(getSeedFromBrowser()));
  }, []);

  if (!svg) return <div style={{ width: size, height: size }} />;

  return (
    <div
      className="animate-pulse-sigil"
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: svg }}
      aria-hidden="true"
    />
  );
}