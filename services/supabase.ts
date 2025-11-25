import { createClient } from '@supabase/supabase-js';

// Configuration provided in the requirements
const SUPABASE_URL = 'https://ozrmvtidqxrdqhzjoubz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_NwVwvwfEYhRz6N_k6bk-fg_uXL2iSSQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
