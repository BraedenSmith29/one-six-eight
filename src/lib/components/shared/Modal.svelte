<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  export let showModal = false;
</script>

{#if showModal}
  <div class="backdrop" on:click|self={() => dispatch("exit")}>
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
    z-index: 5;
  }
  .modal{
    padding: 10px;
    border-radius: 10px;
    max-width: fit-content;
    margin: 10% auto;
    text-align: center;
    background: white;
    z-index: 5;
  }
</style>