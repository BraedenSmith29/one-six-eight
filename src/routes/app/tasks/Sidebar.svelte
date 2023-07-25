<script>
  // Constants
  const TODAY = -3;
  const UPCOMING = -2;
  const HISTORY = -1;
  const INBOX = 0;
  // Components
  import Icon from "$lib/components/shared/Icon.svelte";
  import AddGroupButton from "$lib/components/shared/AddGroupButton.svelte";
  import GroupListItem from "$lib/components/shared/GroupListItem.svelte";
  // Stores
  import groupStore from "$lib/stores/groupStore.js";
  import taskPageStore from "$lib/stores/taskPageStore.js";

  function changeSelectedView(newViewId) {
    taskPageStore.update(store => {
      store.selectedView = newViewId;
      return store;
    });
  }
</script>

<div class="sidebar">
  <div class="time-section">
    <div class="task-view-option" class:selected={$taskPageStore.selectedView === TODAY} on:click={() => changeSelectedView(TODAY)}>
      <Icon name="today" color="#eeeeee" />
      <span>Today</span>
    </div>
    <div class="task-view-option" class:selected={$taskPageStore.selectedView === UPCOMING} on:click={() => changeSelectedView(UPCOMING)}>
      <Icon name="upcoming" color="#eeeeee" />
      <span>Upcoming</span>
    </div>
    <div class="task-view-option" class:selected={$taskPageStore.selectedView === HISTORY} on:click={() => changeSelectedView(HISTORY)}>
      <Icon name="history" color="#eeeeee" />
      <span>History</span>
    </div>
  </div>
  <hr style="width: 100%; border-bottom: #eeeeee;">
  <div class="groups-section">
    <GroupListItem group={null} selected={$taskPageStore.selectedView === INBOX} on:click={() => changeSelectedView(INBOX)} />
    {#if $groupStore.length > 0}
      <span class="groups-heading">Groups</span>
      {#each $groupStore as group}
        <GroupListItem group={group} selected={$taskPageStore.selectedView === group.id} on:click={() => changeSelectedView(group.id)} />
      {/each}
    {/if}
  </div>
  <AddGroupButton />
</div>

<style>
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 10px;
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
  .selected, .task-view-option:hover {
    background-color: #353535;
  }
</style>