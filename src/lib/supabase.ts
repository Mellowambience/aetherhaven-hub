import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Graceful stub when env vars not configured (prevents build crash)
const isConfigured = supabaseUrl.startsWith("https://") && supabaseAnonKey.length > 0;

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      realtime: { params: { eventsPerSecond: 10 } },
    })
  : createClient("https://placeholder.supabase.co", "placeholder", {
      realtime: { params: { eventsPerSecond: 0 } },
    });

export const supabaseReady = isConfigured;

export type Transmission = {
  id: number;
  content: string;
  sigil_hash: string;
  created_at: string;
};
