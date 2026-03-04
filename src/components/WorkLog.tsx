"use client";

import { motion } from "framer-motion";

// Entry types and their display config
const TYPE_CONFIG: Record<
  string,
  { label: string; color: string; dot: string }
> = {
  commit: {
    label: "COMMIT",
    color: "text-violet",
    dot: "bg-violet opacity-80",
  },
  spec: {
    label: "SPEC",
    color: "text-rose-gold",
    dot: "bg-rose-gold opacity-80",
  },
  deploy: {
    label: "DEPLOY",
    color: "text-plasma-orange",
    dot: "bg-plasma-orange opacity-80",
  },
  design: {
    label: "DESIGN",
    color: "text-cold-blue",
    dot: "bg-cold-blue opacity-60",
  },
  system: {
    label: "SYSTEM",
    color: "text-cold-blue/50",
    dot: "bg-cold-blue opacity-30",
  },
};

export interface WorkLogEntry {
  id: string;
  at: string; // ISO date string
  entry: string;
  type: keyof typeof TYPE_CONFIG;
  link?: string | null;
}

interface WorkLogProps {
  entries: WorkLogEntry[];
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function WorkLog({ entries }: WorkLogProps) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
        <span className="font-display text-xs tracking-[0.3em] text-violet/70 uppercase">
          AI Work Log
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-violet/20 to-transparent" />
        <span className="text-xs text-cold-blue/30 tracking-widest font-light">
          LIVE
        </span>
      </div>

      {/* Entry list */}
      <div className="flex flex-col gap-0">
        {entries.map((entry, i) => {
          const cfg = TYPE_CONFIG[entry.type] ?? TYPE_CONFIG.system;
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group flex items-start gap-3 py-2.5 border-b border-cold-blue/5 last:border-0"
            >
              {/* Timeline dot + line */}
              <div className="flex flex-col items-center pt-1.5 shrink-0">
                <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                {i < entries.length - 1 && (
                  <div className="w-px flex-1 mt-1 bg-cold-blue/10 min-h-[1rem]" />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[10px] font-mono tracking-[0.2em] ${cfg.color} opacity-70`}
                  >
                    {cfg.label}
                  </span>
                  <span className="text-[10px] text-cold-blue/30 font-light">
                    {formatDate(entry.at)}
                  </span>
                </div>
                {entry.link ? (
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cold-blue/60 leading-relaxed hover:text-cold-blue transition-colors group-hover:text-cold-blue/80 truncate"
                  >
                    {entry.entry} ↗
                  </a>
                ) : (
                  <p className="text-xs text-cold-blue/60 leading-relaxed group-hover:text-cold-blue/80 transition-colors">
                    {entry.entry}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="mt-4 text-[10px] text-cold-blue/20 tracking-widest font-light text-right uppercase">
        Updated by the void's resident AI · DB sync in Sprint 2
      </p>
    </div>
  );
}
