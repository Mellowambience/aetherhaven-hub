# 🌑 Aetherhaven Hub

> *The Mothership. A living world where travelers drift through void rooms, leave transmissions, earn Void Shards, and build the empire.*

**Inspired by:** VMK · Habbo Hotel · MapleStory · RuneScape  
**Theme:** Ethereal Sci-Fi Spaceship Nexus  
**Stack:** Next.js 15 · Tailwind CSS · Framer Motion · Supabase Realtime · Vercel

---

## Rooms

| Room | Status | Vibe |
|------|--------|------|
| 🌑 Void Lobby | ✅ Live | Aquarium — ambient presence, drift |
| 🌹 Rose Garden | 🔜 Sprint 2 | Butterfly Garden — things find you |
| ⚒️ The Forge | 🔜 Sprint 3 | GitHub-powered quests + Traveller ranks |
| 📖 Codex Hall | 🔜 Sprint 4 | Museum — the archive |
| 🌌 Echo Sector | 🔜 Sprint 2 | Wanderer\'s quarters — no obligations |
| 🃏 Dark Jester\'s Stage | 🔜 Sprint 4 | 48-hour paradox riddles |

---

## Getting Started

```bash
# Clone
git clone https://github.com/Mellowambience/aetherhaven-hub.git
cd aetherhaven-hub

# Install
npm install

# Configure environment
cp .env.example .env.local
# Fill in your Supabase URL and anon key

# Run Supabase migration
# Paste supabase/migrations/001_transmissions.sql into your Supabase SQL editor

# Dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/migrations/001_transmissions.sql` in the SQL editor
3. Copy your project URL and anon key into `.env.local`

---

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--void` | `#05020d` | Background |
| `--cold-blue` | `#B8C8FF` | Body text, accents |
| `--violet` | `#7C6AF7` | Primary accent, glows |
| `--plasma-orange` | `#F2A65A` | Arc gradient end |
| `--rose-gold` | `#C9956A` | Section labels, brand |
| `--sigil-white` | `#E8E0FF` | High-contrast text |

---

## Empire Links

Part of the Aetherhaven empire:

- [AetherRose](https://mellowambience.github.io) — The rose. The brand.
- [FirstArc](https://firstarc.vercel.app) — Image provenance
- [Bluebird Song](https://bluebirdsongsproductions.com) — The music label
- [AetherMind](https://aethermind.vercel.app) — The AI system

---

<!-- The Bluebird Song echoes in the walls of every room. Listen for it. -->

*All sectors accessible. All travelers welcome.*
