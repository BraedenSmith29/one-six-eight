<script>
  // Assets
  import todayIcon from "$lib/assets/today-icon.svg";
  import upcomingIcon from "$lib/assets/upcoming-icon.svg";
  import historyIcon from "$lib/assets/history-icon.svg";
  import inboxIcon from "$lib/assets/inbox-icon.svg";
  import selectedGroupIcon from "$lib/assets/selected-group-icon.svg";
  import unselectedGroupIcon from "$lib/assets/unselected-group-icon.svg";
  import addIcon from "$lib/assets/add-icon.svg";
  // Components
  import Modal from "$lib/components/shared/Modal.svelte";
  // Stores
  import { page } from "$app/stores";
  import groupStore from "$lib/stores/groupStore.js";

  // Add functionality and form contents variable for modal
  let addGroupFields;
  let showModal = false;
  const toggleAddGroupModal = () => {
    // Clear the fields and toggle the modal
    addGroupFields = {
      title: "",
      color: "#c6c6c6",
    };
    showModal = !showModal
  };

  let loading = false;
  let addGroupError = null;
  const addGroup = async () => {
    if (loading) return;
    loading = true;

    const { data, error } = await $page.data.supabase
      .from("groups")
      .insert({
        title: addGroupFields.title,
        color: addGroupFields.color.substring(1),
      })
      .select().single();

    addGroupError = error;
    if (!error) {
      groupStore.update(groups => {
        let newGroup = {
          id: data.id,
          title: addGroupFields.title,
          color: addGroupFields.color,
          show: true,
        }
        return [...groups, newGroup];
      });
      toggleAddGroupModal();
    }
    
    loading = false;
  };
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
  <button class="add-new-group-button" on:click={toggleAddGroupModal}>
    <img src={addIcon} />
    <span>Add New Group</span>
  </button>
</div>
<Modal showModal={showModal} on:exit={toggleAddGroupModal}>
  <form class="add-group-modal" on:submit|preventDefault={addGroup}>
    <label>
      <span>Group Name: </span>
      <input type="textbox" bind:value={addGroupFields.title}>
    </label>
    <label>
      <span>Habit Color: </span>
      <input type="color" bind:value={addGroupFields.color}>
    </label>
    {#if loading}
      <p>Loading...</p>
    {:else}
      <button type="submit">Add Group</button>
    {/if}
    {#if addGroupError}
      <p class="error-text">{addGroupError}</p>
    {/if}
  </form>
</Modal>

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
  .add-new-group-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    background-color: #353535;
    color: inherit;
    font-size: 1em;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .add-group-modal label {
    display: block;
    margin: 5px 0px;
  }
  .error-text {
    color: red;
  }
</style>