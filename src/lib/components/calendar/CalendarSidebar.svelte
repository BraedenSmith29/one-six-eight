<script>
  // Stores
  import projectStore from "$lib/stores/projectStore.js";
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
  <h2>Projects</h2>
  {#each $projectStore as project}
    <div style="background-color: {project.color};">
      <input type="checkbox" bind:checked={project.showInCalendarView}>{project.name}
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