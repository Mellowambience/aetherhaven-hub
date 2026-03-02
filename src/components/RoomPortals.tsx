"use client";

import { motion } from "framer-motion";

const ROOMS = [
  {
    id: "rose-garden",
    name: "Rose Garden",
    description: "A butterfly garden. Things find you here.",
    icon: "🌹",
    color: "#C9956A",
    status: "soon",
  },
  {
    id: "the-forge",
    name: "The Forge",
    description: "Build. Contribute. Earn your rank.",
    icon: "⚒️",
    color: "#7C6AF7",
    status: "soon",
  },
  {
    id: "codex-hall",
    name: "Codex Hall",
    description: "Archive of the Aetherhaven empire.",
    icon: "📖",
    color: "#B8C8FF",
    status: "soon",
  },
  {
    id: "echo-sector",
    name: "Echo Sector",
    description: "Wanderer's quarters. No obligations. Just drift.",
    icon: "🌌",
    color: "#F2A65A",
    status: "soon",
  },
  {
    id: "dark-jester",
    name: "Dark Jester\'s Stage",
    description: "Riddles, paradoxes, 48-hour lore puzzles.",
    icon: "🃏",
    color: "#E8E0FF",
    status: "soon",
  },
];

export default function RoomPortals() {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-px h-5 bg-rose-gold opacity-60" />
        <h2 className="font-display text-xs tracking-[0.3em] uppercase text-rose-gold opacity-70">
          Sectors
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {ROOMS.map((room, i) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            className="relative group cursor-not-allowed"
            title={room.description}
          >
            <div
              className="border border-white/5 group-hover:border-white/15 rounded-lg p-4 transition-all duration-300 bg-white/[0.02] group-hover:bg-white/[0.04]"
              style={{ "--room-color": room.color } as React.CSSProperties}
            >
              <span className="text-2xl block mb-2">{room.icon}</span>
              <p
                className="text-xs font-medium mb-1 transition-colors duration-200"
                style={{ color: room.color, opacity: 0.8 }}
              >
                {room.name}
              </p>
              <p className="text-xs text-cold-blue/30 leading-snug">
                {room.description}
              </p>
              <span className="absolute top-2 right-2 text-[9px] tracking-widest uppercase text-cold-blue/20 border border-white/5 rounded px-1.5 py-0.5">
                Soon
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}