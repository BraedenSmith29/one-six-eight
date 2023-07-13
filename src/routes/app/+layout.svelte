<script>
  // Assets
  import profilePicture from "$lib/assets/profile-temp.png";
  // Helper Functions
  import { goto } from "$app/navigation";
  // Stores
  import { page } from "$app/stores";

  const handleSignOut = async () => {
    const result = await $page.data.supabase.auth.signOut();
    if (!result.error) {
      goto("/");
    }
  };
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
    <button on:click={handleSignOut}>Sign out</button>
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