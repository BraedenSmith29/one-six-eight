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
      if (newSession !== $page.data.session) {
        invalidate('supabase:auth');
      }
    });
    return () => subscription.unsubscribe();
  });
</script>

<slot />