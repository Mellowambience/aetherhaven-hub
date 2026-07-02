# Aether Haven — Hermes Agent × Codex Goal

> Build the smallest playable version of the Aether Haven social pet world: VMK warmth, holographic familiar sanctuary, AI companion memory, cozy rooms, and remixable creator systems.

## Core premise

Aether Haven is a cozy social MMO / virtual pet world where every player awakens a living sigil familiar inside a magical holographic realm. The player can visit public plazas, decorate a Pocket Realm, chat with friends, collect Void Shards, complete gentle rituals, and grow a persistent AI companion over time.

This is not another generic chat app, idle pet game, or Roblox clone. It is a spiritual successor to VMK / Habbo / Club Penguin with modern AI companion memory, magical cyber-fantasy UI, and creator-owned rooms.

## Existing ecosystem to reuse

Use the existing `Mellowambience` repos as source material, not as hard dependencies unless practical:

- `aetherhaven-hub` — the mothership web app. Start here.
- `clawd` — MIST companion / agent memory / gateway patterns.
- `pck` — AetherMon creature systems, sprite generation, procedural encounters.
- `planet-builder` — room / realm editor, remix, hybridize, community hub concepts.
- `webspace` — profile pages, creator marketplace, Stripe/Supabase patterns.
- `aethertab` — BYOK AI assistant, cartridge security, local arcade inspiration.
- `the-goldmaze` — first in-world arcade cartridge / seasonal dungeon inspiration.
- `boopbeatboard` — rhythm magic / music room inspiration.

Do not blindly merge these repos. Extract the best patterns and build a clean MVP inside `aetherhaven-hub` first.

## MVP name

**Aether Haven: Familiar Plaza**

## MVP promise

By the end of the first build pass, a user should be able to:

1. Open the app locally.
2. Enter the Void Lobby.
3. See a magical VMK-like social plaza.
4. Hatch a sigil familiar.
5. Talk to the familiar through a simple mocked AI interface.
6. Persist the familiar's name, mood, bond, and memory snippets locally or in Supabase.
7. Open a Pocket Realm editor.
8. Place or move a few decorative objects.
9. See a simple chat/presence panel, mocked if Supabase is not configured.
10. Earn or display Void Shards through one daily ritual.

## Non-negotiable product feel

The game must feel:

- magical, cozy, and social;
- like a place, not a dashboard;
- playable in five minutes;
- visually expressive even before multiplayer is complete;
- built from original IP only;
- safe for a broad audience;
- free of pay-to-win mechanics.

The UI should feel like a crystal terminal / fantasy hologram. Use dark void backgrounds, violet glow, rose-gold accents, cyan crystal highlights, soft glass panels, animated ambient particles, and warm readable typography.

## First sprint scope

### 1. App shell

Keep the current Next.js app structure. Add a clear route structure:

```txt
app/
  page.tsx                    # landing / enter portal
  lobby/page.tsx              # Void Lobby
  realm/page.tsx              # Pocket Realm editor
  companion/page.tsx          # familiar profile + chat
  arcade/page.tsx             # placeholder mini-game portal
components/
  game/
  companion/
  realm/
  lobby/
  ui/
lib/
  game-state/
  companion/
  storage/
  supabase/
docs/
```

If the repo structure differs, adapt without breaking the existing app.

### 2. Void Lobby

Build a beautiful single-screen social plaza prototype:

- floating crystal plaza;
- room title: `Void Lobby`;
- ambient animated background;
- placeholder avatar bubbles;
- chat panel;
- quest / ritual panel;
- navigation to Pocket Realm, Companion, Arcade, Codex Hall.

Use static/mock data first. Supabase Realtime can be added behind a clean adapter.

### 3. Familiar hatching

Create a simple hatching flow:

- user chooses or accepts a generated familiar name;
- familiar gets species, color, mood, bond, traits;
- save familiar state;
- render a cute magical familiar card;
- display three evolving stats: Bond, Curiosity, Mischief.

Example default familiar:

```json
{
  "name": "Lilith-7",
  "species": "Sigil Fox",
  "mood": "Playful",
  "bond": 12,
  "curiosity": 8,
  "mischief": 6,
  "memories": ["Awakened in the Void Lobby."]
}
```

### 4. Companion chat

Implement a temporary local companion response engine before real AI:

- user sends a message;
- companion replies using mood + traits + recent memory;
- store last 10 memories;
- expose an interface that can later swap to Gemini/OpenAI/Ollama.

Create an adapter like:

```ts
interface CompanionBrain {
  reply(input: CompanionInput): Promise<CompanionReply>
}
```

Implement `MockCompanionBrain` first.

Do not hardcode API keys. Use BYOK / env-provider design later.

### 5. Pocket Realm editor

Build the smallest decorator loop:

- grid or freeform canvas-like area;
- place 5 objects: crystal, candle, tree, rug, portal;
- move/remove objects;
- save layout locally;
- show familiar wandering or sitting in the realm if possible.

This should feel like a tiny VMK room / holographic diorama.

### 6. Void Shards and rituals

Add one daily ritual:

- `Water your spirit tree` or `Polish the portal crystal`;
- click once;
- earn Void Shards;
- update familiar memory.

Persist the ritual completion date locally.

### 7. Architecture guardrails

Use TypeScript types for:

- PlayerProfile
- Familiar
- FamiliarMemory
- RealmObject
- RoomPresence
- Ritual
- CurrencyWallet

Keep game logic separate from React components.

Preferred structure:

```txt
lib/game-state/types.ts
lib/game-state/storage.ts
lib/companion/mock-brain.ts
lib/realm/default-objects.ts
```

### 8. Documentation deliverables

Add or update:

- `README.md` with run instructions and MVP status.
- `docs/GAME_DESIGN.md` with world, rooms, familiar loop, and future roadmap.
- `docs/ARCHITECTURE.md` with app structure and source repo migration notes.
- `docs/MVP_CHECKLIST.md` with done / remaining tasks.

## Out of scope for first pass

Do not build yet:

- real-money marketplace;
- crypto/token systems;
- NFTs;
- open world;
- full MMO server;
- procedural civilization;
- adult content;
- complex AI autonomy;
- public user-generated code execution;
- remote cartridge marketplace;
- full mobile app;
- native desktop launcher;
- payment flows.

## Safety and trust constraints

- Never expose API keys.
- Do not bundle a developer-owned AI key.
- Do not require broad browser permissions.
- Do not load remote executable game scripts.
- User-generated content must be stored as data, not executable code.
- Keep player safety and moderation in mind from the beginning.

## Visual direction

The target scene is a cozy neon-cyber-fantasy plaza:

- dark starfield / void background;
- floating islands and portals;
- glowing crystals;
- soft violet/cyan UI;
- magical pets and familiars;
- VMK-like chat and social presence;
- decorative room objects;
- warm, inviting, whimsical tone.

Avoid sterile SaaS dashboard energy.

## First implementation order

1. Run the project and fix startup issues.
2. Inspect existing pages/components/styles.
3. Add shared TypeScript models.
4. Build local persistent game state.
5. Build landing portal.
6. Build Void Lobby scene.
7. Build familiar hatching.
8. Build companion profile/chat.
9. Build Pocket Realm editor.
10. Add daily ritual + Void Shards.
11. Update docs.
12. Run lint/build and fix errors.
13. Summarize what works and what remains.

## Acceptance criteria

The build is acceptable when:

- `npm install` succeeds.
- `npm run dev` starts the app.
- main routes render without crashes.
- a user can hatch a familiar.
- familiar state persists across refresh.
- a user can place/move at least one realm object.
- a user can complete a ritual and earn Void Shards.
- README and docs explain the product clearly.
- no API keys or secrets are committed.

## Final agent report format

When finished, report:

```md
# Aether Haven MVP Build Report

## What I built

## Files changed

## How to run

## What works

## What is mocked

## What broke / risks

## Next best tasks

## Screenshots / preview notes
```

## North star

Make the first build feel like opening a tiny living portal: a place where a familiar remembers you, a room grows with you, and friends can eventually visit.

The goal is not maximum scope. The goal is the first playable spark.
