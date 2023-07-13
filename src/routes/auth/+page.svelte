<script>
  // Helper Functions
  import { goto } from "$app/navigation";
  // Stores
  import { page } from "$app/stores";
  
  let email;
  let password;

  const handleSignUp = async () => {
    const result = await $page.data.supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (result.error == null) goto('/');
  };
</script>

<form>
  <input name="email" bind:value="{email}" />
  <input type="password" name="password" bind:value="{password}" />
</form>

<button on:click={handleSignUp}>Sign up</button>