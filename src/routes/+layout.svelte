<script>
  // Assets
  import profilePicture from "$lib/assets/profile-temp.png";
  // Lifecycle Functions
  import { invalidate } from '$app/navigation';
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

<header>
  <div class="header-group">
    <span class="site-title">One Six Eight</span>
    <a href="/calendar">Calendar</a>
    <a href="/tasks">Tasks</a>
    <a href="/habits">Habits</a>
  </div>
  <div class="header-group">
    <a href="/insights">Insights</a>
    <a href="/auth">Auth</a>
    <img class="profile-picture" alt="Profile" src={profilePicture} />
  </div>
</header>
<slot />

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f5f5f5;
    border-bottom: 2px solid grey;
  }
  .header-group {
    display: flex;
    align-items: center;
    gap: 25px;
  }
  header a {
    font-size: 1.25em;
  }
  .site-title {
    font-size: 2em;
    font-weight: bold;
    border-right: 2px solid grey;
    padding-left: 10px;
    padding-right: 25px;
  }
  .profile-picture {
    height: 50px;
  }
</style>