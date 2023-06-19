<script>
  // Stores
  import projectStore from "$lib/stores/projectStore.js";

  let calendars = ["Cal 1", "Cal 2"];
</script>

<div class="sidebar">
  <div class="sidebar-header">
    <span>June 2023</span>
    <button>&lt;</button>
    <button>&gt;</button>
  </div>
  <h2>Calendars</h2>
  {#each calendars as calendar}
    <div>
      <input type="checkbox">{calendar}
    </div>
  {/each}
  <h2>Projects</h2>
  {#each $projectStore as project}
    <div style="background-color: {project.color};">
      <input type="checkbox">{project.name}
    </div>
  {/each}
</div>

<style>
  .sidebar {
    padding: 10px;
    width: 216px;
    border-right: 2px solid grey;
    height: calc(100vh - 72px);
  }
  .sidebar-header {
    font-size: 1.5em;
    font-weight: bold;
    position: relative;
  }
</style>