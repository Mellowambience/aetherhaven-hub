"use client";

import dynamic from "next/dynamic";
import VoidCanvas from "@/components/VoidCanvas";
import TravelerCounter from "@/components/TravelerCounter";
import TransmissionWall from "@/components/TransmissionWall";
import RoomPortals from "@/components/RoomPortals";
import SigilBadge from "@/components/SigilBadge";
import WorkLog from "@/components/WorkLog";
import workLogData from "@/data/ai-work-log.json";
import { motion } from "framer-motion";
import type { WorkLogEntry } from "@/components/WorkLog";

// Prevent SSR for canvas
const VoidCanvasNoSSR = dynamic(() => import("@/components/VoidCanvas"), {
  ssr: false,
});

export default function VoidLobby() {
  return (
    <main className="relative min-h-screen bg-void overflow-hidden">
      {/* Particle field — fixed, behind everything */}
      <VoidCanvasNoSSR />

      {/* Ambient radial glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(124,106,247,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Content layer */}
      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 pb-24">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full max-w-4xl pt-12 pb-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <SigilBadge size={36} />
            <span className="font-display text-xs tracking-[0.25em] text-rose-gold opacity-70 uppercase">
              Aetherhaven
            </span>
          </div>
          <TravelerCounter />
        </motion.header>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="flex flex-col items-center text-center mt-16 mb-12 max-w-2xl"
        >
          {/* Arc loading bar — canonical AetherRose */}
          <div className="w-24 h-0.5 arc-bar rounded-full mb-8 opacity-80" />

          <h1 className="font-display text-3xl sm:text-5xl leading-tight text-glow-cold mb-6">
            The Void Lobby
          </h1>

          <p className="text-cold-blue/60 text-sm sm:text-base leading-relaxed font-light tracking-wide max-w-lg">
            You have arrived at the Mothership. Travelers drift through here from across the empire.
            Leave a transmission. Find your sector. The Forge awakens soon.
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-violet to-transparent mt-8 opacity-60"
          />
        </motion.section>

        {/* Transmission Wall */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full max-w-2xl mb-16"
        >
          <TransmissionWall />
        </motion.section>

        {/* AI Work Log */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="w-full max-w-2xl mb-16"
        >
          <WorkLog entries={workLogData as WorkLogEntry[]} />
        </motion.section>

        {/* Room Portals */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="w-full max-w-3xl"
        >
          <RoomPortals />
        </motion.section>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="fixed bottom-0 w-full z-20 flex justify-center pb-4"
      >
        <p className="text-xs text-cold-blue/20 tracking-[0.3em] uppercase font-light">
          Aetherhaven · Est. 2026 · All Sectors
        </p>
      </motion.footer>
    </main>
  );
}
