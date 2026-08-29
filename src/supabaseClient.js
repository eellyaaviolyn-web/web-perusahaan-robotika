import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ihxuwwktzuaohoircqyo.supabase.co'
const supabaseAnonKey = 'sb_publishable_gI9qwSmgnXGkwJg9U51d6Q_-H9EOPeU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
