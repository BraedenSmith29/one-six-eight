<script>
  // Assets
  import todayIcon from "$lib/assets/today-icon.svg";
  import upcomingIcon from "$lib/assets/upcoming-icon.svg";
  import historyIcon from "$lib/assets/history-icon.svg";
  import inboxIcon from "$lib/assets/inbox-icon.svg";
  import selectedGroupIcon from "$lib/assets/selected-group-icon.svg";
  import unselectedGroupIcon from "$lib/assets/unselected-group-icon.svg";
  // Components
  import AddGroupButton from "$lib/components/shared/AddGroupButton.svelte";
  // Stores
  import groupStore from "$lib/stores/groupStore.js";
</script>

<div class="sidebar">
  <div class="time-section">
    <div class="task-view-option">
      <img src={todayIcon} />
      <span>Today</span>
    </div>
    <div class:selected={true} class="task-view-option">
      <img src={upcomingIcon} />
      <span>Upcoming</span>
    </div>
    <div class="task-view-option">
      <img src={historyIcon} />
      <span>History</span>
    </div>
  </div>
  <div class="groups-section">
    <div class="task-view-option">
      <img src={inboxIcon} />
      <span>Inbox</span>
    </div> 
    {#if $groupStore.length > 0}
      <span class="groups-heading">Groups</span>
      {#each $groupStore as group}
        <div class="task-view-option">
          <img src={selectedGroupIcon} />
          <span>{group.title}</span>
        </div>
      {/each}
    {/if}
  </div>
  <AddGroupButton />
</div>

<style>
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #212121;
    color: #eeeeee;
    padding: 10px;
    width: 216px;
    user-select: none;
  }
  .time-section {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .groups-section {
    flex-grow: 1;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
  }
  .groups-heading {
    font-weight: bold;
    font-size: 1.1em;
    margin-top: 5px;
    color: #dddddd;
  }
  .task-view-option {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.9em;
    padding: 6px;
    padding-right: 9px;
    margin-left: 4px;
    border-radius: 5px;
    cursor: pointer;
  }
  .task-view-option:hover {
    background-color: #353535;
  }
  .selected {
    background-color: #353535;
  }
</style>