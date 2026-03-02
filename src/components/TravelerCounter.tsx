"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function TravelerCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Supabase Realtime presence channel
    const channel = supabase.channel("void-lobby", {
      config: { presence: { key: "traveler" } },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setCount(Object.keys(state).length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs text-cold-blue/50 tracking-widest uppercase">
      <span
        className="inline-block w-1.5 h-1.5 rounded-full bg-violet animate-pulse"
        aria-hidden="true"
      />
      <AnimatePresence mode="wait">
        {count !== null ? (
          <motion.span
            key={count}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.3 }}
          >
            {count} {count === 1 ? "traveler" : "travelers"} in the void
          </motion.span>
        ) : (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="opacity-30"
          >
            scanning…
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}