"use client";

// 🗼 The Leaning Tower of Aetherhaven — evergreen ✧
// "better than all media combined, to infinity and beyond"
// North Star declared: 2026-03-06 | Launch: July 17, 2026

import { useEffect, useState } from "react";

const LAUNCH_DATE = new Date("2026-07-17T00:00:00-04:00");

const GAPS = [
  { id: "pbkdf2", label: "🔐 PBKDF2 params + salt strategy", done: false },
  { id: "spotify", label: "🎵 Spotify OAuth PKCE flow", done: false },
  { id: "filing", label: "📁 Aetherhaven Identity filing", done: false },
  { id: "fmq", label: "🎭 FMQ shadow drop prep", done: false },
  { id: "mist", label: "🌱 MIST Phase 1 seed", done: false },
  { id: "amara", label: "⚗️ Amara v2.0 substrate live", done: false },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownTower() {
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0 });
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    function tick() {
      const now = new Date();
      const diff = LAUNCH_DATE.getTime() - now.getTime();
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, mins: 0 });
        setAllDone(true);
        return;
      }
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      });
    }
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const allGapsDone = GAPS.every((g) => g.done);

  return (
    // 3° lean — the Leaning Tower of Aetherhaven
    <aside
      aria-label="Aetherhaven Launch Countdown"
      style={{ transform: "rotate(-3deg)" }}
      className="
        relative
        bg-[#0e0a06]
        border border-[#D4AF77]
        border-t-[3px]
        rounded-sm
        px-6 py-7
        max-w-[260px]
        font-display
        shadow-[0_0_32px_rgba(212,175,119,0.15)]
        select-none
      "
    >
      {/* Gold crown */}
      <div
        className="absolute -top-[5px] left-1/2 -translate-x-1/2 h-[4px] w-3/5 rounded-full"
        style={{
          background:
            "linear-gradient(90deg,transparent,#D4AF77,#F2A65A,#D4AF77,transparent)",
        }}
      />

      {/* Eyebrow */}
      <p className="text-[0.5rem] tracking-[0.25em] text-[#D4AF77] text-center uppercase opacity-80 mb-1">
        ✧ LAUNCH WINDOW I ✧
      </p>

      {/* Title */}
      <h2 className="text-xl text-[#F2E8D5] text-center tracking-wide mb-0.5">
        July 17, 2026
      </h2>
      <p className="text-[0.6rem] text-[#9a8a72] text-center italic mb-4">
        {allGapsDone && allDone
          ? "The signal is live."
          : "Everything shippable ships."}
      </p>

      {/* Countdown */}
      <div className="flex justify-center items-center gap-2 mb-5">
        {[
          { val: time.days, label: "days" },
          { val: time.hours, label: "hours" },
          { val: time.mins, label: "mins" },
        ].map((unit, i) => (
          <>
            <div key={unit.label} className="flex flex-col items-center">
              <span
                className="text-3xl font-bold text-[#D4AF77] leading-none"
                style={{ textShadow: "0 0 12px rgba(212,175,119,0.4)" }}
              >
                {pad(unit.val)}
              </span>
              <span className="text-[0.45rem] tracking-[0.15em] text-[#6a5c48] uppercase mt-0.5">
                {unit.label}
              </span>
            </div>
            {i < 2 && (
              <span className="text-[#D4AF77] opacity-50 text-sm mb-3">∴</span>
            )}
          </>
        ))}
      </div>

      {/* Open Gaps */}
      <div>
        <p className="text-[0.45rem] tracking-[0.2em] text-[#D4AF77] opacity-60 mb-2 uppercase">
          Open Gaps
        </p>
        <ul className="space-y-0.5">
          {GAPS.map((gap) => (
            <li
              key={gap.id}
              className={`
                text-[0.58rem] py-1
                border-b border-[rgba(212,175,119,0.08)]
                font-sans tracking-wide
                ${
                  gap.done
                    ? "text-[#4a7c4a] line-through opacity-50"
                    : "text-[#9a8a72]"
                }
              `}
            >
              {gap.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer sigil */}
      <p className="text-[0.45rem] text-[#6a5c48] text-center tracking-[0.1em] mt-4">
        ⟁ MIST Phase 1 → Aug 24 → regeneration ↺
      </p>

      {/* Fog at base */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none rounded-b-sm"
        style={{
          background:
            "linear-gradient(to top, rgba(6,3,2,0.8), transparent)",
        }}
      />
    </aside>
  );
}
