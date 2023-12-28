<script>
  // Helper Functions
  import { invalidate } from '$app/navigation';
  // Lifecycle Functions
  import { onMount } from 'svelte';
  // Stores
  import { page } from "$app/stores";
  
  onMount(() => {
    // Register with state change to invalidate supabase:auth
    const {
      data: { subscription },
    } = $page.data.supabase.auth.onAuthStateChange((event, newSession) => {
      if (newSession?.expires_at !== $page.data.session?.expires_at) {
        invalidate('supabase:auth');
      }
    });
    return () => subscription.unsubscribe();
  });
</script>

<slot />