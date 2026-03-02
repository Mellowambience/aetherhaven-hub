-- Aetherhaven Hub: Transmission Wall
-- Run this in your Supabase SQL editor

create table if not exists transmissions (
  id bigserial primary key,
  content text not null check (char_length(content) <= 120),
  sigil_hash text not null,
  created_at timestamptz default now()
);

-- Index for feed ordering
create index if not exists transmissions_created_at_idx on transmissions (created_at desc);

-- Enable Row Level Security
alter table transmissions enable row level security;

-- Anyone can read transmissions
create policy "read_transmissions" on transmissions
  for select using (true);

-- Anyone can insert transmissions (rate-limit via app layer)
create policy "insert_transmissions" on transmissions
  for insert with check (char_length(content) <= 120 and char_length(content) > 0);

-- Enable Realtime
alter publication supabase_realtime add table transmissions;