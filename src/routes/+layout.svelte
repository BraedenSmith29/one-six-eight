<script>
  import profilePicture from "$lib/assets/profile-temp.png";
</script>

<div class="site-header">
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
</div>
<div class="contents">
  <slot />
</div>

<style>
  .site-header {
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
  .site-header a {
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
  .contents {
    margin: 10px;
  }
</style>