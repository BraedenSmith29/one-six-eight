import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
  // Create SupaBase client to use for server-side access
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event,
  });

  // Helper function for grabbing the current session
  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  };

  const session = await event.locals.getSession();

  // Handle redirection
  if (event.url.pathname.startsWith("/app")) {
    if (!session) {
      // the user is not signed in
      throw redirect(303, "/");
    }
  } else {
    if (session) {
      throw redirect(303, "/app");
    }
  }
  
  return resolve(event, {
    // Will be important down the line when I need to fetch from the database
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  });
}