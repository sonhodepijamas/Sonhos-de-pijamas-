// ======================================
// CONEXÃO COM O SUPABASE
// ======================================

const SUPABASE_URL = "https://enzcxrxvllzybdildypc.supabase.co";

const SUPABASE_KEY ="sb_publishable_BNCor3Ox8vbZstcZQ4Y-Fw_JVKfsSIa";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);