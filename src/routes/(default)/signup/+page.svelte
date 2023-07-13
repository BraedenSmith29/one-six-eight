<script>
  // Helper Functions
  import { goto } from "$app/navigation";
  // Stores
  import { page } from "$app/stores";

  let email;
  let password;

  let error = false;
  let errorText;

  let processing = false;
  let complete = false;

  const handleSignUp = async () => {
    if (processing || complete) return;
    processing = true;
    const result = await $page.data.supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    if (!result.error) {
      error = false; // May as well be thorough
      complete = true;
    } else {
      error = true;
      errorText = result.error;
    }
    processing = false;
  };
</script>

<div class="contents">
  <h1>Sign Up</h1>
  {#if complete}
    <p>Sign up complete. Check your email for a link to sign in.</p>
    <button on:click={() => goto("/")}>Go to Homepage</button>
  {:else}
    <form on:submit|preventDefault={handleSignUp}>
      <input type="text" name="email" placeholder="Email" required bind:value={email}>
      <input type="password" name="password" placeholder="Password" required bind:value={password}>
      <button type="submit">{processing ? "Loading..." : "Create Account"}</button>
    </form>
    {#if error}
      <p class="error-text">{errorText}</p>
    {/if}
    <a href="/login">Already have an account? Sign in!</a>
  {/if}
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