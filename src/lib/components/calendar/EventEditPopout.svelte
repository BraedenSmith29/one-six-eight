<script>
  // Helper Functions
  import { createEventDispatcher } from "svelte";

  // Properties
  export let event;
  export let pos;

  let dispatch = createEventDispatcher();
  
  let editMode = false;
  let popoutRight = false;

  window.addEventListener("mousedown", exitPopout);

  function exitPopout() {
    window.removeEventListener("mousedown", exitPopout);
    dispatch("exit");
  }
</script>

<div class="event-edit-popout" class:popout-right={pos == 0} on:mousedown|stopPropagation>
  <div class="options-header">
    <button>Edit</button>
    <button>Delete</button>
    <button on:click={() => dispatch("exit")}>Close</button>
  </div>
  <h3>{event.name}</h3>
  <p>{event.startTime.substring(11)} - {event.endTime.substring(11)}</p>
  <p>{event.description}</p>
</div>

<style>
  .event-edit-popout {
    position: absolute;
    top: 272px;
    left: -102%;
    width: 100%;
    background-color: white;
    border: 1px solid rgba(128, 128, 128, 0.5);
    box-sizing: border-box;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
    padding: 10px;
    z-index: 1;
  }
  .popout-right {
    left: 102%;
  }
  .options-header {
    width: fit-content;
    margin-left: auto;
  }
</style>