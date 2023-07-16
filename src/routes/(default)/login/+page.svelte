<script>
  // Helper Functions
  import { goto } from "$app/navigation";
  // Stores
  import { page } from "$app/stores";

  let email;
  let password;

  let error = false;
  let errorText;

  const handleSignIn = async () => {
    const result = await $page.data.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!result.error) {
      error = false; // May as well be thorough
      goto('/app');
    } else {
      error = true;
      errorText = result.error;
    }
  };
</script>

<div class="contents">
  <h1>Login</h1>
  <form on:submit|preventDefault={handleSignIn}>
    <input type="text" name="email" placeholder="Email" required bind:value={email}>
    <input type="password" name="password" placeholder="Password" required bind:value={password}>
    <button type="submit">Login</button>
  </form>
  {#if error}
    <p class="error-text">{errorText}</p>
  {/if}
  <a href="/signup">Don't have an account? Sign up!</a>
</div>

<style>
  .contents {
    font-family: sans-serif;
    max-width: 400px;
    margin: 5% auto;
    text-align: center;
  }
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  button {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #45a049;
  }
  .error-text {
    color: red;
  }
</style>