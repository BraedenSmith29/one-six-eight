<script>
  // Assets
  import profilePicture from "$lib/assets/profile-temp.png";
  // Helper Functions
  import { goto } from "$app/navigation";
  // Lifecycle Functions
  import { onDestroy } from "svelte";
  // Stores
  import { page } from "$app/stores";

  const handleSignOut = async () => {
    const result = await $page.data.supabase.auth.signOut();
    if (!result.error) {
      goto("/");
    }
  };

  // Unsubscribe from database channels when leaving the page
  onDestroy(() => $page.data.supabase.removeAllChannels());
</script>

<header>
  <div class="header-group">
    <span class="site-title">One Six Eight</span>
    <a href="/app/calendar">Calendar</a>
    <a href="/app/tasks">Tasks</a>
    <a href="/app/habits">Habits</a>
  </div>
  <div class="header-group">
    <a href="/app/insights">Insights</a>
    <button style="margin-left: 15px; margin-right: 30px;" on:click={handleSignOut}>Sign out</button>
    <img class="profile-picture" alt="Profile" src={profilePicture} />
  </div>
</header>
<slot />

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 72px;
    box-sizing: border-box;
    overflow: hidden;
    padding: 10px;
    background-color: #272727;
  }
  .header-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  header a {
    font-size: 1.25em;
    color: #bbbbbb;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 20px;
  }
  header a:hover {
    color: #eeeeee;
    background-color: #373737;
  }
  .site-title {
    font-size: 2em;
    color: #bbbbbb;
    font-weight: bold;
    padding: 0px 10px;
  }
  .profile-picture {
    height: 50px;
  }
</style>