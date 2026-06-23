import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cqgcgzhtfqlyifvhpprt.supabase.co';
const supabaseKey = 'sb_publishable_qHMbAetEAsAeJVfGFH31Yg_HQOVJulb';

export const supabase = createClient(supabaseUrl, supabaseKey);