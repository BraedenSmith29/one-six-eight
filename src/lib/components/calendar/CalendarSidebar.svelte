<script>
  // Stores
  import groupStore from "$lib/stores/groupStore.js";
  import calendarStore from "$lib/stores/calendarStore.js";
</script>

<div class="sidebar">
  <div class="sidebar-header">
    <span>June 2023</span>
    <button>&lt;</button>
    <button>&gt;</button>
  </div>
  <h2>Calendars</h2>
  {#each $calendarStore as calendar}
    <div style="background-color: {calendar.color};">
      <input type="checkbox" bind:checked={calendar.showInCalendarView}>{calendar.name}
    </div>
  {/each}
  <h2>Groups</h2>
  {#each $groupStore as group}
    <div style="background-color: {group.color};">
      <input type="checkbox" bind:checked={group.show}>{group.title}
    </div>
  {/each}
</div>

<style>
  .sidebar {
    padding: 10px;
    width: 216px;
    border-right: 2px solid grey;
  }
  .sidebar-header {
    font-size: 1.5em;
    font-weight: bold;
  }
</style>