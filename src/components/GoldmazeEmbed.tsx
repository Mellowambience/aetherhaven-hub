"use client";

export default function GoldmazeEmbed() {
  return (
    <section className="w-full max-w-2xl mb-16">
      {/* Section label */}
      <p className="text-xs tracking-[0.2em] uppercase text-cold-blue/40 mb-3 text-center">
        The Goldmaze
      </p>

      {/* Void frame */}
      <div
        className="relative rounded-xl overflow-hidden border border-violet/20"
        style={{
          background: "rgba(10,8,20,0.85)",
          boxShadow: "0 0 40px rgba(124,106,247,0.08), inset 0 0 60px rgba(0,0,0,0.6)",
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-violet/10">
          <span className="font-display text-xs tracking-[0.2em] text-rose-gold/60 uppercase">
            ✦ cursed dungeon · fae roguelite
          </span>
          <span className="text-xs text-cold-blue/30 font-mono">
            luck · mischief · charm · gold
          </span>
        </div>

        {/* pico-8-edu embed */}
        <div className="relative" style={{ paddingBottom: "100%" }}>
          <iframe
            src="https://www.pico-8-edu.com/?c=https://raw.githubusercontent.com/Mellowambience/the-goldmaze/main/src/pico8/goldmaze-web.p8"
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allowFullScreen
            allow="autoplay"
            loading="lazy"
            title="the goldmaze"
          />
        </div>

        {/* Bottom hint */}
        <div className="px-4 py-2 border-t border-violet/10 flex items-center justify-between">
          <span className="text-xs text-cold-blue/25 font-mono">
            z/x to play · arrow keys to choose
          </span>
          <span className="text-xs text-cold-blue/20 font-mono">
            ✦ some endings require letting go
          </span>
        </div>
      </div>
    </section>
  );
}
