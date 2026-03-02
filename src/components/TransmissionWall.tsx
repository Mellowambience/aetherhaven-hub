"use client";

import { useEffect, useState } from "react";
import { supabase, type Transmission } from "@/lib/supabase";
import { generateSigil, getSeedFromBrowser } from "@/lib/sigil";
import { motion, AnimatePresence } from "framer-motion";

const MAX_CHARS = 120;

export default function TransmissionWall() {
  const [transmissions, setTransmissions] = useState<Transmission[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sigilSvg, setSigilSvg] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Generate visitor sigil on mount
  useEffect(() => {
    setSigilSvg(generateSigil(getSeedFromBrowser()));
  }, []);

  // Fetch initial transmissions + subscribe to new ones
  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("transmissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      if (data) setTransmissions(data as Transmission[]);
    }
    load();

    const channel = supabase
      .channel("transmissions-live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "transmissions" },
        (payload) => {
          setTransmissions((prev) => [
            payload.new as Transmission,
            ...prev.slice(0, 19),
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function handleSend() {
    if (!input.trim() || sending) return;
    setSending(true);
    setError(null);

    const seed = getSeedFromBrowser();
    // Short hash for sigil_hash
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
    }

    const { error: err } = await supabase.from("transmissions").insert({
      content: input.trim().slice(0, MAX_CHARS),
      sigil_hash: Math.abs(hash).toString(36),
    });

    if (err) {
      setError("Transmission lost in the void. Try again.");
    } else {
      setInput("");
    }
    setSending(false);
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-px h-5 bg-violet opacity-60" />
        <h2 className="font-display text-xs tracking-[0.3em] uppercase text-rose-gold opacity-70">
          Transmissions
        </h2>
      </div>

      {/* Input */}
      <div className="relative mb-8">
        <div className="flex gap-3 items-start">
          {/* Visitor sigil */}
          <div
            className="w-8 h-8 flex-shrink-0 mt-1 opacity-70"
            dangerouslySetInnerHTML={{ __html: sigilSvg }}
            aria-hidden="true"
          />
          <div className="flex-1">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Leave a transmission in the void…"
              rows={2}
              className="w-full bg-transparent border border-violet/20 focus:border-violet/50 rounded px-3 py-2 text-sm text-sigil-white placeholder:text-cold-blue/20 resize-none outline-none transition-colors duration-200"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-cold-blue/20">
                {MAX_CHARS - input.length} remaining
              </span>
              <button
                onClick={handleSend}
                disabled={!input.trim() || sending}
                className="text-xs px-4 py-1.5 rounded border border-violet/40 text-violet hover:bg-violet/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 tracking-widest uppercase"
              >
                {sending ? "Sending…" : "Transmit"}
              </button>
            </div>
          </div>
        </div>
        {error && (
          <p className="text-xs text-plasma-orange/60 mt-2 pl-11">{error}</p>
        )}
      </div>

      {/* Transmission list */}
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {transmissions.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.4 }}
              className="flex gap-3 items-start group"
            >
              <div
                className="w-6 h-6 flex-shrink-0 mt-0.5 opacity-50 group-hover:opacity-80 transition-opacity"
                dangerouslySetInnerHTML={{
                  __html: generateSigil(t.sigil_hash),
                }}
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-sigil-white/70 leading-relaxed break-words">
                  {t.content}
                </p>
                <span className="text-xs text-cold-blue/20 mt-0.5 block">
                  {new Date(t.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {transmissions.length === 0 && (
          <p className="text-xs text-cold-blue/20 text-center py-6 italic">
            No transmissions yet. Be the first voice in the void.
          </p>
        )}
      </div>
    </div>
  );
}