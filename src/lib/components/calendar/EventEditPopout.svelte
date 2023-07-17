<script>
  // Helper Functions
  import { createEventDispatcher } from "svelte";

  // Stores
  import eventStore from "$lib/stores/eventStore.js";

  // Properties
  export let event;
  export let pos;

  let dispatch = createEventDispatcher();
  
  let editEventFields;
  let editMode = false;
  function toggleEditMode() {
    if (editMode) {
      // Save first
      event.title = editEventFields.title;
      event.startTime = editEventFields.startTime;
      event.endTime = editEventFields.endTime;
      event.description = editEventFields.description;
      $eventStore = $eventStore;
    }
    // Clear the fields and toggle
    editEventFields = {
      title: event.title,
      startTime: event.startTime,
      endTime: event.endTime,
      description: event.description,
    };
    editMode = !editMode
  }

  function deleteEvent() {
    eventStore.update(events => {
      events = events.filter(e => e.id != event.id);
      return events;
    });
  }

  window.addEventListener("mousedown", exitPopout);

  function exitPopout() {
    window.removeEventListener("mousedown", exitPopout);
    dispatch("exit");
  }
</script>

<div class="event-edit-popout" class:popout-right={pos == 0} on:mousedown|stopPropagation>
  <div class="options-header">
    <button on:click={toggleEditMode}>{editMode ? "Save" : "Edit"}</button>
    <button on:click={deleteEvent}>Delete</button>
    <button on:click={() => dispatch("exit")}>Close</button>
  </div>
  {#if editMode}
    <div class="edit-fields">
      <label>
        <span>Event Name: </span>
        <input type="textbox" bind:value={editEventFields.title}>
      </label>
      <label>
        <span>Start Time: </span>
        <input type="textbox" bind:value={editEventFields.startTime}>
      </label>
      <label>
        <span>End Time: </span>
        <input type="textbox" bind:value={editEventFields.endTime}>
      </label>
      <label>
        <span>Description: </span>
        <input type="textbox" bind:value={editEventFields.description}>
      </label>
    </div>
  {:else}
    <h3>{event.title}</h3>
    <p>{event.startTime.substring(11)} - {event.endTime.substring(11)}</p>
    <p>{event.description}</p>
  {/if}
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
  .edit-fields label {
    display: block;
    margin: 5px 0px;
  }
</style>