<script>
  export let showModal = false;
</script>

{#if showModal}
  <!-- TODO: Fix this -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="backdrop" on:click|self={() => showModal = false}>
    <div class="modal">
      <slot />
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0,0,0,0.8);
  }
  .modal{
    padding: 10px;
    border-radius: 10px;
    max-width: fit-content;
    margin: 10% auto;
    text-align: center;
    background: white;
  }
</style>