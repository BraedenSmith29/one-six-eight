<script>
  // Stores
  import { page } from "$app/stores";
</script>

<svelte:head><title>One Six Eight</title></svelte:head>
<div class="content">
  <h1>Welcome to One Six Eight</h1>
  <p>This is a temporary landing page for the website. To enter the web app, please select an option below.</p>
  <div class="buttons">
    {#if $page.data.session}
      <a href="/app">Enter App</a>
    {:else}
      <a href="/login">Login</a>
      <a href="/signup">Create Account</a>
    {/if}
  </div>
</div>

<style>
  .content {
    max-width: 50%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .buttons {
    margin-top: 30px;
  }
  a {
    padding: 10px 20px;
    font-size: 18px;
    font-family: sans-serif;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    text-decoration: none;
  }
</style>