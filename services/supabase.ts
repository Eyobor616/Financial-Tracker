import { createClient } from '@supabase/supabase-js';

// ------------------------------------------------------------------
// CONFIGURATION
// ------------------------------------------------------------------
// Please replace the values below with your specific Supabase credentials.
// You can find these in your Supabase Dashboard -> Project Settings -> API.
//
// URL: The URL of your Supabase project
// Key: The `anon` public key
// ------------------------------------------------------------------

const SUPABASE_URL = 'https://ozrmvtidqxrdqhzjoubz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_NwVwvwfEYhRz6N_k6bk-fg_uXL2iSSQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);