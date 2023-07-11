<header>
  <div class="header-group">
    <span class="site-title">One Six Eight</span>
    <a href="/app">Enter App</a>
  </div>
  <div class="header-group">
    <a href="/auth">Auth</a>
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
</style>