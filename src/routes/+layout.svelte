<script>
  import profilePicture from "$lib/assets/profile-temp.png";
</script>

<div class="page-wrapper">
  <header>
    <div class="header-group">
      <span class="site-title">One Six Eight</span>
      <a href="/calendar">Calendar</a>
      <a href="/tasks">Tasks</a>
      <a href="/habits">Habits</a>
    </div>
    <div class="header-group">
      <a href="/insights">Insights</a>
      <img class="profile-picture" alt="Profile" src={profilePicture} />
    </div>
  </header>
  <main>
    <slot />
  </main>
</div>

<style>
  .page-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
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
  main {
    flex: 1;
  }
</style>