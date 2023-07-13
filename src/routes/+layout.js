import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';

export const load = async ({ fetch, data, depends }) => {
  // Reruns load if supabase:auth is invalidated
  depends('supabase:auth');

  // Create a supabase client and auth session to pass to layout
  const supabase = createSupabaseLoadClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data.session // Required for SSR authentication
  });
  const session = (await supabase.auth.getSession()).data.session;
  
  return { supabase, session };
}
